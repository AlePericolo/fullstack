const boom = require('boom')
const User = require('../models/User')

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
        await User.remove({ _id: req.params._id })
        reply.status(200).send({ message: 'user deleted' })
    } catch (err) {
        throw boom.boomify(err)
    }
}
