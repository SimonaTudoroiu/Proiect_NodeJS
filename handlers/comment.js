const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");


const addComment = async (userId, postId, text) => {
    const newComment = await db.Comment.create({
        userId,
        postId,
        text,
        date: new Date()
    });
    return newComment;
}

const getAllPostComments = async (postId) => {
    const comments = await db.Comment.findAll({
        where: {
            postId
        }
    });

    return comments;
}

const deleteCommentById = async (id) => {
    const comment = await db.Comment.destroy({
        where: {
            id
        }
    });

    return comment;
}

const updateCommentById = async (id, text) => {
    const comment = await db.Comment.update({
        text
    }, {
        where: {
            id
        }
    });

    return comment;
}

module.exports = {
    addComment,
    getAllPostComments,
    deleteCommentById,
    updateCommentById
}