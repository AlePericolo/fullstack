const boom = require('boom')

const User = require('../models/User')

exports.getUsers = async (req, reply) => {
    try {
        const users = await User.find()
        return users
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getUser = async (req, reply) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        return user
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.addUser = async (req, reply) => {
    try {
        const user = new User(req.body)
        return user.save()
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.updateUser = async (req, reply) => {
    try {
        const { id } = req.params
        const user = req.body
        const { ...updateData } = user
        const update = await User.findByIdAndUpdate(id, updateData, { new: true })
        return update
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.deleteUser = async (req, reply) => {
    try {
        const { id } = req.params
        const user = await User.findByIdAndRemove(id)
        return user
    } catch (err) {
        throw boom.boomify(err)
    }
}