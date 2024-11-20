const Users = require("../models/m_user");

function createUsers(amount) {
    return Array.from({ length: amount }, (_, i) => ({
        firstName: `name${i + 1}`,
        lastName: `lastname${i + 1}`,
        gender: Math.random() > 0.5 ? "male" : "female",
        address: `address-${i + 1}`,
        city: "Moscow",
        phone: `+7-978-${i + 1}`,
        email: `test@mail${i + 1}.com`,
        status: Math.random() > 0.5 ? true : false,
    }));
}

async function insertUsers(req, res) {
    const amount = 1000;
    const users = createUsers(amount);
    const insert = await Users.insertMany(users);
    if (insert) {
        res.status(200).send("users inserted");
    } else {
        res.status(400).send("Something went wrong while inserting");
    }
}

module.exports = insertUsers;
