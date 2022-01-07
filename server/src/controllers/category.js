const boom = require('boom')
const Category = require('../models/category')

exports.getCategories = async (req, reply) => {
    try {
        const categories = await Category.find()
        reply.status(200).send(categories)
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.deleteCategory = async (req, reply) => {
    try {
        await Category.remove({ _id: req.params._id })
        reply.status(200).send({ message: 'category deleted' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.createCategory = async (req, reply) => {
    try {
        await Category.create(req.body)
        reply.status(201).send({ message: 'category created' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.updateCategory = async (req, reply) => {
    try {
        let { ...updateData } = req.body
        await Category.findByIdAndUpdate(req.params._id, updateData, {new: true})
        reply.status(200).send({ message: 'category updated' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

//functions

exports.getCategoriesLabelByIds = async (categories) => {
    const labels = []
    for (const category of categories) {
        const categoryLabel = await Category.findById(category, 'label')
        labels.push(categoryLabel.label)
    }
    return labels
}