const { verify } = require("../helpers/token");
const User = require("../models/User");

module.exports = async function (req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).send({ error: 'Authentication required' });
        }

        const tokenData = verify(token);

        if (!tokenData || !tokenData.id) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        const user = await User.findOne({ _id: tokenData.id });

        if (!user) {
            return res.status(401).send({ error: 'Authenticated user not found' });
        }

        req.user = user;
        next();
    } catch (e) {
        next(e);
    }
}
