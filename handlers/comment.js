const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const db = require("../models");


const addComment = async (userId, postId, text) => {
    const newComment = await db.Comment.create({
        userId,
        postId,
        text,
        date: new Date().toISOString()
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
    try {
        const updatedComment = await db.Comment.findByPk(id);
        if (!updatedComment) {
          throw new Error("Comment not found");
        }
        console.log(`updatedComment: ${updatedComment}`)
        updatedComment.text = text;
        await updatedComment.save();
    
        return updatedComment;
      } catch (error) {
        throw new Error(`Failed to update comment: ${error.message}`);
      }
}

module.exports = {
    addComment,
    getAllPostComments,
    deleteCommentById,
    updateCommentById
}