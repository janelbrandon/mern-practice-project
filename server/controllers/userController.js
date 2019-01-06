const passport = require('passport')

const userController = function (User) {

    const postRegister = function (req, res) {
        User.register(new User({
            email: req.body.email,
            role: 'user'
        }), req.body.password, (err) => {
            if (err) {
                return res.status(500).send(err.message)
            }
            // Log the new user in (Passport will create a session) using the local strategy
            passport.authenticate('local')(req, res, () => {
                // req.user exists at this point.
                // Normally we wouldn't send back the entire user object - this is for learning purposes.
                // Instead, we might send back only the username or email, or even just a status code.
                req.session.role = req.user.role || 'guest' // default to guest if no user or role
                res.status(200).json(req.user)
                // res.sendStatus(200)
            })
        })

    }

    const postLogin = function (req, res) {
        passport.authenticate('local'), (req, res) => {
            // At this point, authentication was successful and req.user exists.

            // Normally we wouldn't send back the entire user object - this is for learning purposes.
            // Instead, we might send back only the username or email, or even just a status code.
            req.session.role = req.user.role || 'guest' // default to guest if no user or role
            res.status(200).json(req.user)
        }
    }

    const getLogout = function (req, res) {
        req.logout()
        res.sendStatus(200)
    }

    const get = function (req, res) {
        User.find(function (err, users) {
            if (err) {
                res.status(500).send(err)
            } else {
                res.json(users)
            }
        })
    }

    return {
        postRegister: postRegister,
        postLogin: postLogin,
        getLogout: getLogout,
        get: get
    }

}

module.exports = userController