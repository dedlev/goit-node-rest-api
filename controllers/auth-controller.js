import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import "dotenv/config.js";
import User from "../models/User.js";
import { userSignupSchema, userSigninSchema, userSubscriptionSchema } from "../models/User.js"
import { HttpError, sendEmail } from "../helpers/index.js";

const { JWT_SECRET,SENDGRID_MAIL_FROM, BASE_URL } = process.env;

const signup = async(reg, res, next) => {
  const { email, password } = reg.body;
    const user = await User.findOne({ email });
    if (user) {
        return next(HttpError(409, "Email in use"));
    }

    const { error } = userSignupSchema.validate(reg.body);
     if (error) {
        return next(HttpError(400, error.message));
    };

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  try {
    const newUser = await User.create({ ...reg.body, password: hashPassword, verificationToken });
    
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href"${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`
    }

    await sendEmail(verifyEmail);
      
    res.status(201).json({
        username: newUser.username,
        email: newUser.email,
        subscription: newUser.subscription,
    })
  } catch (error) {
      next(error)
  }  
};

const signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });

        if (!user) {
            return next(HttpError(401, "Email or password is wrong"));
        }

        const { error } = userSigninSchema.validate(req.body);
        if (error) {
            return next(HttpError(400, error.message));
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return next(HttpError(401, "Email or password is wrong"));
        }

        const payload = { id: user._id };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
        await User.findByIdAndUpdate(user._id, { token });

        res.json({
            token,
            user: {
                email: user.email,
                subscription: user.subscription,
            }
        })
    } catch (error) {
        next(error);
    }
};

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription,
    })
};

const signout = async (req, res, next) => {
    const { _id } = req.user;

    await User.findByIdAndUpdate(_id, { token: null });
 
    res.status(204).json({
        message: "No Content"
    })
};

const userSubscription = async (req, res, next) => {
  try {
    const { error } = userSubscriptionSchema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    const { subscription } = req.body;
    const { _id } = req.user;

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true }
    );

    if (!updatedUser) {
      return next(HttpError(404, "User not found"));
    }

    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    });
  } catch (error) {
    next(error);
  }
};


export default {
    signup,
    signin,
    getCurrent,
    signout,
    userSubscription,
}