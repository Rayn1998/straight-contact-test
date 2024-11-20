const User = require("../models/m_user");

const signUp = async (req, res) => {
    const { userName } = req.body;
    try {
        if (userName) {
            const exist = await User.findOne({ firstName: userName });
            if (exist) {
                res.status(400).send("You already have an account");
            } else {
                const user = await User.create({
                    firstName: userName,
                    lastName: `lastname${Math.random() * 25}`,
                    gender: Math.random() > 0.5 ? "male" : "female",
                    address: `address-${Math.random() * 25}`,
                    city: "Moscow",
                    phone: `+7-978-${Math.random() * 25}`,
                    email: `test@mail${Math.random() * 25}.com`,
                    status: Math.random() > 0.5 ? true : false,
                });
                if (user) {
                    res.status(201).json(
                        `You have been successfully signed up, here is you: ${user}`,
                    );
                } else {
                    res.status(500).send(
                        "Something went wrong, while creating user",
                    );
                }
            }
        } else {
            res.status(400).send("You should specify username");
        }
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = signUp;
