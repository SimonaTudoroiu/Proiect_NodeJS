const {GraphQLObjectType, GraphQLNonNull, GraphQLString} = require("graphql");
const {postType, postInputType, postResultType, postUpdateType} = require("./types");
const{
    addPost,
    getAllPosts,
    getPostsByGroupId,
    getPostsByUserId,
    getPostById,
    deletePostById,
    updatePostById,
    likePostById
} = require("../../handlers/post");

const postMutation = new GraphQLObjectType({
    name: 'PostMutation',
    fields: {

        addPost: {
            type: postResultType,
            args: {
                post: { type: GraphQLNonNull(postInputType) }
            },
            resolve: async (source, args, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const post = await addPost(args.post);
                return post;
            }
        },

        deletePostById: {
            type: postResultType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (source, args, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const post = await deletePostById(args.id);
                return post;
            }
        },

        editPostById: {
            type: postResultType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                post: { type: GraphQLNonNull(postUpdateType) }
            },
            resolve: async (source, args, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const post = await updatePostById(args.id, args.post);
                return post;
            }
        },

        likePostById: {
            type: postResultType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve: async (source, args, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const post = await likePostById(args.id);
                return post;
            }
        }
    }
});

module.exports = postMutation;
