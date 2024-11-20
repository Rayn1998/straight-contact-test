const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const insertUsers = require("../middlewares/isertUsers");
const signUp = require("../middlewares/signUp");
const signIn = require("../middlewares/signIn");

const User = require("../models/m_user");

router.use(express.json());

router.post("/insert-users", insertUsers);

router.post("/auth/registration", signUp);

router.post("/auth/login", signIn);

router.get("/clients", auth, async (req, res) => {
    try {
        const users = await User.find({}).limit(1000);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(401).send("There are no users in database, yet...");
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

router.post("/clients", auth, async (req, res) => {
    try {
        const ids = await User.find({}, { _id: 1 });
        if (ids) {
            res.status(200).json({ userIds: ids.map((el) => el._id) });
        } else {
            res.status(401).send("There are no users in database, yet...");
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
