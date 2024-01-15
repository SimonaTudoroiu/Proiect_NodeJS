const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");

const addPost = async (userId, groupId, text) => {
    const newPost = await db.Post.create({
        userId,
        groupId,
        text,
        date: new Date(),
        nr_likes: 0
    });
    return newPost;
}

const getAllPosts = async () => {
    const posts = await db.Post.findAll();

    return posts;
}

const getPostsByGroupId = async (groupId) => {
    const posts = await db.Post.findAll({
        where: {
            groupId
        }
    });

    return posts;
}

const getPostsByUserId = async (userId) => {
    const posts = await db.Post.findAll({
        where: {
            userId
        }
    });

    return posts;
}

const getPostById = async (id) => {
    const post = await db.Post.findOne({
        where: {
            id
        }
    });

    return post;
}

const deletePostById = async (id) => {
    const post = await db.Post.destroy({
        where: {
            id
        }
    });

    return post;
}

const updatePostById = async (id, text) => {
    const post = await db.Post.update({
        text
    }, {
        where: {
            id
        }
    });

    return post;
}

const likePostById = async (id) => {
    const post = await db.Post.findOne({
        where: {
            id
        }
    });

    post.nr_likes += 1;
    await post.save();

    return post;
}

module.exports = {
    addPost,
    getAllPosts,
    getPostsByGroupId,
    getPostsByUserId,
    getPostById,
    deletePostById,
    updatePostById,
    likePostById
}
