const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { getAllGroups, getGroupByUserId, getGroupByHobby, getGroupByName } = require("../../handlers/group");
const { groupType } = require("./types");

const groupQuery = new GraphQLObjectType({
    name: "GroupQueryType",
    fields: {
        groups: {
            type: new GraphQLList(groupType),
            resolve: async () => {
                const groups = await getAllGroups();
                return groups;
            }
        },
        groupByUserId: {
            type: new GraphQLList(groupType),
            args: {
                userId: { type: GraphQLID }
            },
            resolve: async (_, { userId }) => {
                const groups = await getGroupByUserId(userId);
                return groups;
            }
        },
        groupByHobby: {
            type: new GraphQLList(groupType),
            args: {
                hobby: { type: GraphQLID }
            },
            resolve: async (_, { hobby }) => {
                const groups = await getGroupByHobby(hobby);
                return groups;
            }
        },
        groupByName: {
            type: new GraphQLList(groupType),
            args: {
                name: { type: GraphQLID }
            },
            resolve: async (_, { name }) => {
                const groups = await getGroupByName(name);
                return groups;
            }
        }
    }
});

module.exports = groupQuery;