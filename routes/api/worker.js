const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateLoginInput = require('../../validation/login');
const validateRegisterInput = require('../../validation/register');

const Worker = require('../../models/Worker');

/**
 * @swagger
 * /worker:
 *  post:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.get("/", (req, res) => {
    Worker.find()
        .then(items => res.json(items));
});

router.post('/login', (req, res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const username = req.body.username;
    const password = req.body.password;

    Worker.findOne({username})
        .then(user => {
            if(!user) {
                errors.username = "Username or password not matched"
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        const payload = {
                            id: user.id,
                            lastname: user.lastname,
                            firstname: user.firstname,
                            major: user.major,
                            department: department,
                            authentication: user.authentication
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if(err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        })
                    } else {
                        errors.username = "Username or password not matched"
                        return res.status(404).json(errors);
                    }
                })

        })
});

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    Worker.findOne({
        username: req.body.username
    }).then(user => {
        if(user) {
            return res.status(400).json({
                username: 'Username is exists'
            });
        }
        else {
            const newUser = new Worker({
                user_id: req.body.user_id,
                lastname : req.body.lastname,
                major : req.body.major,
                department: req.body.department,
                authentication: req.body.authentication,
                username : req.body.username,
                password : req.body.password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.json({
        id: req.user.id,
        name: req.user.name
    });
});

module.exports = router;