import Contact from "../models/contact";
import { contactSchema } from "../schemas/contact";

export const list = async (req, res) => {
    try {
        const contact = await Contact.getAllContact();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const listContactUser = async (req, res) => {
    try {
        const contact = await Contact.getContactUser();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const listStatusContact = async (req, res) => {
    try {
        const contact = await Contact.getAllUsersRole();
        res.json(contact);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const show = async (req, res) => {
    try {
        const contactsItem = await Contact.getContactById(req.params.id);
        if (!contactsItem) {
            res.status(404).json({ error: "ContactsItem not found" });
        } else {
            res.json(contactsItem);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const create = async (req, res) => {
    try {
        const { phone, title, subject, user_id, status_id } = req.body;
        const { error } = contactSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        const contactsId = await Contact.createContact(phone, title, subject, user_id, status_id);
        res.json({ id: contactsId, message: "Tạo liên hệ thành công !" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const { phone, title, subject, user_id } = req.body;
        const { error } = contactSchema.validate(req.body);
        if (error) {
            const errors = error.details.map((errorItem) => errorItem.message);
            return res.status(400).json({
                message: errors,
            });
        }
        await Contact.updateContact(req.params.id, phone, title, subject, user_id);
        res.json({ message: "Contact update thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { id, status_id } = req.body;
        await Contact.updateStatusContact(id, status_id);
        res.json({ message: "Contact update thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const destroy = async (req, res) => {
    try {
        await Contact.deleteContact(req.params.id);
        res.json({ message: "Contact xóa thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
