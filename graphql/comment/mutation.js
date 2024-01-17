const {
    addComment,
    getAllPostComments,
    deleteCommentById,
    updateCommentById
} = require("../../handlers/comment");
const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require("graphql");
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
                id: {type: GraphQLNonNull(GraphQLID)}
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const comment = await deleteCommentById(id);
                return comment;
            }
        },
        updateCommentById: {
            type: commentResultType,
            args: {
                comments: { type: GraphQLNonNull(commentUpdateType) }
            },
            resolve: async (source, {comment}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const {id, newComment} = comment;
                const {text} = newComment;
                const updatedComment = await updateCommentById(id, text);
                return updatedComment;
            }
        }
    }
});

module.exports = commentMutation;
