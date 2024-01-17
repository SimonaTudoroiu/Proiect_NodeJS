const {GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID} = require("graphql");
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
                post: { type: new GraphQLNonNull(postInputType) }
            },
            resolve: async (source, { post }, context) => {
                if (!context.user) throw new Error("You are not authenticated!");
                const { userId, groupId, text } = post; 
                const newPost = await addPost(userId, groupId, text); 
                return newPost;
            }
        },


        deletePostById: {
            type: postResultType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)}
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
                post: { type: GraphQLNonNull(postUpdateType) }
            },
            resolve: async (source, {post}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const {id, newPost} = post;
                console.log(`id: ${id}`);
                console.log(`newPost: ${newPost}`);
                const {text} = newPost;
                console.log(`text: ${text}`);
                const postUpdated = await updatePostById(id, text);
                console.log(`postUpdated: ${postUpdated}`)
                return postUpdated;
            }
        },

        likePostById: {
            type: postResultType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
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
