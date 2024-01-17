const { GraphQLObjectType, GraphQLID, GraphQLList } = require("graphql");
const { getAllGroups, getGroupByUserId, getGroupByHobby, getGroupByName } = require("../../handlers/group");
const { groupType } = require("./types");

const groupQuery = new GraphQLObjectType({
    name: "GroupQueryType",
    fields: {
        groups: {
            type: new GraphQLList(groupType),
            resolve: async (source, {}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const groups = await getAllGroups();
                return groups;
            }
        },
        groupByUserId: {
            type: new GraphQLList(groupType),
            args: {
                userId: { type: GraphQLID }
            },
            resolve: async (source, {userId}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const groups = await getGroupByUserId(userId);
                return groups;
            }
        },
        groupByHobby: {
            type: new GraphQLList(groupType),
            args: {
                hobby: { type: GraphQLID }
            },
            resolve: async (source, {hobby}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const groups = await getGroupByHobby(hobby);
                return groups;
            }
        },
        groupByName: {
            type: groupType,
            args: {
                name: { type: GraphQLID }
            },
            resolve: async (source, {name}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                //return only one group
                const group = await getGroupByName(name);
                return group;
            }
        }
    }
});

module.exports = groupQuery;