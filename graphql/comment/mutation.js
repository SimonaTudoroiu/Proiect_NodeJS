const {
    addComment,
    getAllPostComments,
    deleteCommentById,
    updateCommentById
} = require("../../handlers/comment");
const { GraphQLObjectType } = require("graphql");
const { commentInputType, commentUpdateType, commentResultType } = require("./types");

const commentMutation = new GraphQLObjectType({
    name: "CommentMutation",
    fields: {
        addComment: {
            type: commentResultType,
            args: {
                input: { type: commentInputType }
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const { userId, postId, text } = input;
                const comment = await addComment(userId, postId, text);
                return comment;
            }
        },
        deleteCommentById: {
            type: commentResultType,
            args: {
                input: { type: commentUpdateType }
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const { id } = input;
                const comment = await deleteCommentById(id);
                return comment;
            }
        },
        updateCommentById: {
            type: commentResultType,
            args: {
                input: { type: commentUpdateType }
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const { id, text } = input;
                const comment = await updateCommentById(id, text);
                return comment;
            }
        }
    }
});

module.exports = commentMutation;
