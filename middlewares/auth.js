const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send("You should be authorized");
        return;
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    let payload;
    try {
        payload = jwt.verify(token, "secret");
        req.user = payload;
        next();
    } catch {
        res.status(401).send("You are unauthorized");
        return;
    }
};

module.exports = auth;
