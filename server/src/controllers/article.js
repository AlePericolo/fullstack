const boom = require('boom')
const Article = require('../models/article')

const { getCategoriesLabelByIds } = require('../controllers/category')
const { getUserById } = require('../controllers/user')

exports.getArticles = async (req, reply) => {
    try {
        const articlesData = await Article.find({})
        const articles = []
        for (const data of articlesData) {
            articles.push({
                ...data.toObject(),
                categories: await getCategoriesLabelByIds(data.categories),
                user: await getUserById(data.user)
            })
        }
        reply.status(200).send(articles)
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.getArticle = async (req, reply) => {
    try {
        const article = await Article.findById(req.params._id)
        reply.status(200).send(article)
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.deleteArticle = async (req, reply) => {
    try {
        await Article.remove({ _id: req.params._id })
        reply.status(200).send({ message: 'article deleted' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.createArticle = async (req, reply) => {
    try {
        await Article.create(req.body)
        reply.status(201).send({ message: 'article created' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.updateArticle = async (req, reply) => {
    try {
        let { ...updateData } = req.body
        await Article.findByIdAndUpdate(req.params._id, updateData, { new: true })
        reply.status(200).send({ message: 'article updated' })
    } catch (err) {
        throw boom.boomify(err)
    }
}

exports.searchArticle = async (req, reply) => {
    try {
        const articles = await Article.find({ 'title': new RegExp(req.params.query, 'i') })
        if (articles.length === 0)
            reply.status(404).send({ message: 'Articles not found' })
        else
            reply.status(200).send({
                total_items: articles.length,
                items: articles
            })
    } catch (err) {
        throw boom.boomify(err)
    }
}