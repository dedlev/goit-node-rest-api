import express from 'express';
import { isValidId, authenticate, upload } from '../middlewares/index.js';
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from '../controllers/contacts-controllers.js';

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', isValidId, getOneContact);

contactsRouter.delete('/:id', isValidId, deleteContact);

// upload.filds([{name: "avatar", maxCount: 1}]);
// upload.array("avatar", 8)
// contactsRouter.post("/", createContact);
contactsRouter.post('/', upload.single('avatar'), createContact);

contactsRouter.put('/:id', isValidId, updateContact);

contactsRouter.patch('/:id/favorite', isValidId, updateStatusContact);

export default contactsRouter;
