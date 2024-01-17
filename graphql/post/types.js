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
const {messageResultType} = require("../types");
const {userType} = require("../user/types");
const {groupType} = require("../group/types");


const postType = new GraphQLObjectType({
    name: 'PostType',
    fields: {
        id: { type: GraphQLID },
        text: { type: GraphQLString },
        nr_likes : { type: GraphQLInt },
        date: { type: GraphQLString },
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
        text: { type: GraphQLString },
        userId: { type: GraphQLID },
        groupId: { type: GraphQLID },
    }
});

const postResultType = new GraphQLUnionType({
    name: 'PostResultType',
    types: [postType, messageResultType],
    resolveType: (value) => {
        if(value.instanceOf(db.Post)) {
            return "postType";
        }

        return "MessageResultType";
    },
});

const postUpdateType = new GraphQLInputObjectType({
    name: 'PostUpdateType',
    fields: {
        id: { type: GraphQLID },
        newPost: { type: postInputType }
    }
});




module.exports = {postType, postInputType, postResultType, postUpdateType};