import fs from "fs/promises";
import { nanoid } from "nanoid";
import path from "path";

const contactsPath = path.resolve("db", "contacts.json");
const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
    const result = await fs.readFile(contactsPath, "UTF-8");
  return JSON.parse(result);
}

export async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;
}

export async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if(index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;;
}

export async function addContact({name, email, phone}) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

export async function updateContact(id, updateFields) {
  const contacts = await listContacts();
  const index = contacts.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { 
    ...contacts[index], 
    ...updateFields 
  };
  await updateContacts(contacts);
  return contacts[index];
}