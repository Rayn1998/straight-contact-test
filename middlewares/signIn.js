const jwt = require("jsonwebtoken");
const User = require("../models/m_user");

const signIn = async (req, res) => {
    const { userName } = req.body;
    try {
        const user = await User.findOne({ firstName: userName });
        if (user) {
            const token = jwt.sign({ userName }, "secret", {
                expiresIn: "15m",
            });
            res.status(201).json(`Here's your token: ${token}`);
        } else {
            res.status(400).send("You should sign up first");
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports = signIn;
