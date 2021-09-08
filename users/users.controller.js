const express = require('express');
const router = express.Router();
const userService = require('./user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/current', getCurrent);
router.put('/current', putCurrent);

router.get('/:id', getById);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function authenticate(req, res, next) 
{
    userService.authenticate(req.body)
        .then(user => user ? res.json({"success":1,"data":user}) : res.status(400).json({ message: 'email or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) 
{
    userService.create(req.body)
        .then(() => res.json({"success":1,"message":"User successfully created"}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    console.log("getCurrent")
    userService.getById(req.user.sub)
        .then(user => user ? res.json({"success":1,"data":user}) : res.sendStatus(404))
        .catch(err => next(err));
}

function putCurrent(req, res, next) {
    console.log("putCurrent")
    userService.update(req.user.sub,req.body)
        .then(user => res.json({"success":1,"message":"User successfully updated"}))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({"success":1,"message":"User successfully updated"}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({"success":1,"message":"User successfully delete"}))
        .catch(err => next(err));
}