const boom = require('boom')
const Article = require('../models/article')
const Category = require('../models/category')

const { getCategoriesLabelByIds } = require('../controllers/category')
const { getUserById } = require('../controllers/user')

const { tokenDecode } = require("../utils/decode")


exports.getArticles = async (req, reply) => {
    try {
        const { page } = req.body;

        const itemsForPage = 6;
        const totalItems = await Article.count()

        let where = {}
        let sort = [['created_at', -1]]

        const items = await Article
                            .find(where)
                            .sort(sort)
                            .limit(itemsForPage)
                            .skip(page === 1 ? 0 : (page * itemsForPage) - itemsForPage)
                            .populate({
                                path: "categories"
                            })
                            .populate({
                                path: 'user',
                                email: {$ne: 'lorem@ipsum.com'}
                            })


        reply.status(200).send({
            'itemsForPage': itemsForPage,
            'totalItems': totalItems,
            'items': items
        })

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
        const { userId } = tokenDecode(req.headers.authorization)
        await Article.create({
            ...req.body,
            user: userId
        })
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