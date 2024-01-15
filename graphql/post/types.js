const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLFloat,
    GraphQLInputObjectType,
    GraphQLBoolean,
    GraphQLUnionType,
  } = require("graphql");

const db = require("../../models");
const {MessageResultType} = require("../types");


const postType = new GraphQLObjectType({
    name: 'PostType',
    fields: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
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
        groupId: { type: GraphQLID },
        group: {
            type: require("../group/types").groupType,
            resolve: async (parent) => {
                const group = await db.Group.findOne({
                    where: {
                        id: parent.groupId
                    }
                });
                return group;
            }
        }
    }
});

const postInputType = new GraphQLInputObjectType({
    name: 'PostInputType',
    fields: {
        title: { type: GraphQLString },
        content: { type: GraphQLString },
        userId: { type: GraphQLID },
        groupId: { type: GraphQLID }
    }
});

const postResultType = new GraphQLObjectType({
    name: 'PostResultType',
    type: [postType, MessageResultType],
    resolveType: (value) => {
        if(value.instanceOf(db.Post)) {
            return postType;
        }

        return MessageResultType;
    },
});

const postUpdateType = new GraphQLObjectType({
    name: 'PostUpdateType',
    type: [postType, MessageResultType],
    resolveType: (value) => {
        if(value.instanceOf(db.Post)) {
            return postType;
        }

        return MessageResultType;
    },
});




module.exports = {postType, postInputType, postResultType, postUpdateType};