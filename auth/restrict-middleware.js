const bcrypt = require('bcryptjs');

const users = require('../users/users-model');

module.exports = (req, res , next) => {
    // This middleware uses session information to control/restrict access.
    console.log(req.session);
    if (req.session && req.session.loggedIn) {
        next();
    }
    else {
        res.status(401).json({
            error: 'You shall not pass!'
        })
    }
};