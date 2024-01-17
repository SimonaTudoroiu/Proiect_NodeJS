const {
    addComment,
    getAllPostComments,
    deleteCommentById,
    updateCommentById
} = require("../../handlers/comment");
const { GraphQLObjectType } = require("graphql");
const { commentInputType, commentUpdateType, commentResultType } = require("./types");

const commentQuery = new GraphQLObjectType({
    name: "CommentQuery",
    fields: {
        getAllPostComments: {
            type: commentResultType,
            args: {
                input: { type: commentInputType }
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const { postId } = input;
                const comments = await getAllPostComments(postId);
                return comments;
            }
        }
    }
});

module.exports = commentQuery;