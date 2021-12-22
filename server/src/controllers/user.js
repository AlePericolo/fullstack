const boom = require('boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.createUser = async (req, reply) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        await User.create({
            email: req.body.email,
            password: hash
        })
        reply.status(201).send({message: 'user created'})
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.loginUser = async (req, reply) => {
    try {
        const users = await User.find({
            email: req.body.email
        })
        if(users.length < 1)
            reply.status(401).send({message: 'auth failed'})

        const isPasswordCorrect = await bcrypt.compare(req.body.password, users[0].password)
        
        if(!isPasswordCorrect)
            reply.status(401).send({message: 'auth failed'})

        const token = jwt.sign({
            email: users[0].email,
            userId: users[0]._id,
        }, process.env.JWT_KEY, { expiresIn: "1h"})
        
        reply.status(200).send({token: token})
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getUsers = async (req, reply) => {
    try {
        const users = await User.find()
        reply.status(200).send(users)
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getUser = async (req, reply) => {
    try {
        const user = await User.findById(req.params._id)
        reply.status(200).send(user)
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.deleteUser = async (req, reply) => {
    try {
        await User.remove({_id: req.params._id})
        reply.status(200).send({message: 'user deleted'})
    } catch (err) {
        throw boom.boomify(err)
    }
}
