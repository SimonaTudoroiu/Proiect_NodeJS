const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLID
  } = require("graphql");
const db = require("../../models");
const {MessageResultType} = require("../types");


const commentType = new GraphQLObjectType({
    name: 'CommentType',
    fields: {
        id: { type: GraphQLID },
        content: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        userId: { type: GraphQLID },
        user: {
            type: require("../user/types").userType,
            resolve: async (parent) => {
                const user = await db.User.findOne({
                    where: {
                        id: parent.userId
                    }
                });
                return user;
            }
        },
        postId: { type: GraphQLID },
        post: {
            type: require("../post/types").postType,
            resolve: async (parent) => {
                const post = await db.Post.findOne({
                    where: {
                        id: parent.postId
                    }
                });
                return post;
            }
        }
    }
});

const commentInputType = new GraphQLInputObjectType({
    name: 'CommentInputType',
    fields: {
        content: { type: GraphQLString },
        userId: { type: GraphQLID },
        postId: { type: GraphQLID }
    }
});

const commentResultType = new GraphQLObjectType({
    name: 'CommentResultType',
    type: [commentType, MessageResultType],
    resolveType: (value) => {
        if(value.instanceOf(db.Comment)) {
            return commentType;
        }

        return MessageResultType;
    }
});

const commentUpdateType = new GraphQLInputObjectType({
    name: 'CommentUpdateType',
    fields: {
        content: { type: GraphQLString }
    }
});

module.exports = {
    commentType,
    commentInputType,
    commentResultType,
    commentUpdateType
};