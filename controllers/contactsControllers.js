// import * as contactsService from "../services/contactsServices.js";
import Contact from "../models/Contact.js"
import  HttpError  from "../helpers/HttpError.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
    try {
        // const contacts = await contactsService.listContacts();
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

// export const getOneContact = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const contact = await contactsService.getContactById(id);
//         if (!contact) {
//             return next(HttpError(404, `Contact with id: ${id} not found`));
//         }
//         res.status(200).json(contact);
//     } catch (error) {
//         next(error);
//     }
// };

// export const deleteContact = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const contact = await contactsService.removeContact(id);
//         if (!contact) {
//             return next(HttpError(404, `Contact with id: ${id} not found`));
//         }
//         res.status(200).json(contact);
//     } catch (error) {
//         next(error);
//     }
// };

// export const createContact = async (req, res, next) => {
//     try {
//         const { error } = createContactSchema.validate(req.body);
//         if (error) {
//             return next(HttpError(400, error.message));
//         }
//         const contact = await contactsService.addContact(req.body);
//         res.status(201).json(contact);
//     } catch (error) {
//         next(error);
//     }
// };

// export const updateContact = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         if (Object.keys(req.body).length === 0) {
//             return next(HttpError(400, "Body must have at least one field"));
//         }
//         const { error } = updateContactSchema.validate(req.body);
//         if (error) {
//             return next(HttpError(400, error.message));
//         }
//         const contact = await contactsService.updateContact(id, req.body);
//         if (!contact) {
//             return next(HttpError(404, `Contact with id: ${id} not found`));
//         }
//         res.status(200).json(contact);
//     } catch (error) {
//         next(error);
//     }
// };