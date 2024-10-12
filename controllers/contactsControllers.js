import Contact, { createContactSchema, updateContactSchema, contactStatusSchema } from "../models/Contact.js"
import  HttpError  from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, "-createdAt -updatedAt");
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

export const getOneContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findById(id);
        if (!contact) {
            return next(HttpError(404, `Contact with id: ${id} not found`));
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const deleteContact = async (req, res, next) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return next(HttpError(404, `Contact with id: ${id} not found`));
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const createContact = async (req, res, next) => {
    const { error } = createContactSchema.validate(req.body);

    if (error) {
        return next(HttpError(400, error.message));
    }
    
    try {
        const contact = await Contact.create(req.body);
        res.status(201).json(contact);
    } catch (error) {
        next(error);
    }
};

export const updateContact = async (req, res, next) => {
    const { id } = req.params;
    
    if (Object.keys(req.body).length === 0) {
        return next(HttpError(400, "Body must have at least one field"));
    }

    const { error } = updateContactSchema.validate(req.body);
    if (error) {
        return next(HttpError(400, error.message));
    }

    try {
        const contact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!contact) {
            return next(HttpError(404, `Contact with id: ${id} not found`));
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};

export const updateStatusContact = async (req, res, next) => {
    const { id } = req.params;

    const { error } = contactStatusSchema.validate(req.body);
    if (error) {
        return next(HttpError(400, error.message));
    }

    const { favorite } = req.body;
    try {
        const contact = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
        if (!contact) {
            return next(HttpError(404, `Contact with id: ${id} not found`));
        }
        res.status(200).json(contact);
    } catch (error) {
        next(error);
    }
};
