const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
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
const {postType, postInputType, postResultType, postUpdateType} = require("./types");

const postQuery = new GraphQLObjectType({
    name: 'PostQuery',
    fields: {
        allPosts: {
            type: GraphQLList(postType),
            resolve: async (source, { }, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const posts = await getAllPosts();
                return posts;
            }
        },

        postsByGroupId: {
            type: GraphQLList(postType),
            args: {
                groupId: { type: GraphQLID }
            },
            resolve: async (source, args, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const posts = await getPostsByGroupId(args.groupId);
                return posts;
            }
        },

        postById: {
            type: postType,
            args: {
                id: { type: GraphQLID }
            },
            resolve: async (source, args, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const post = await getPostById(args.id);
                return post;
            }
        },

        postsByUserId: {
            type: GraphQLList(postType),
            args: {
                userId: { type: GraphQLID }
            },
            resolve: async (source, args, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const posts = await getPostsByUserId(args.userId);
                return posts;
            }
        }
    }

});

module.exports = postQuery;