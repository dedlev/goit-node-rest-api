import  HttpError from "../helpers/HttpError.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import "dotenv/config.js";

const { JWT_SECRET } = process.env;

const authenticate = async (reg, res, next) => {
    const { authorization } = reg.headers;
    if (!authorization) {
        return next(HttpError(401, "Not authorized"));
    }

    const [bearer, token] = authorization.split(" ");

    if (bearer !== "Bearer") {
        return next(HttpError(401, "Not authorized"));
    }

    try {
        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            return next(HttpError(401, "Not authorized"));
        }
        reg.user = user;
        next();
    } catch (error) {
        return next(HttpError(401, error.message));
    }
};

export default authenticate;