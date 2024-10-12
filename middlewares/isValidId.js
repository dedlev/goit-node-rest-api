import { isValidObjectId } from "mongoose";

import  HttpError from "../helpers/HttpError.js";

const isValidId = (reg, _, next) => {
    const { id } = reg.params;
    if (!isValidObjectId(id)) {
        return next(HttpError(404, `${id} is not valid id`));
    } 
    next();
};

export default isValidId;