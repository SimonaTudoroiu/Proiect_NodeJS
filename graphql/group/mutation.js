const { GraphQLObjectType } = require("graphql");
const { groupInputType, groupUpdateType, groupResultType } = require("./types");
const { addGroup, enterGroup, leaveGroup } = require("../../handlers/group");

const groupMutation = new GraphQLObjectType({
    name: "GroupMutation",
    fields: {
        addGroup: {
            type: groupResultType,
            args: {
                input: { type: groupInputType }
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const { name, description, userId } = input;
                const group = await addGroup(name, description, userId);
                return group;
            }
        },
        enterGroup: {
            type: groupResultType,
            args: {
                input: { type: groupUpdateType }
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const { name, userId } = input;
                const group = await enterGroup(name, userId);
                return group;
            }
        },
        leaveGroup: {
            type: groupResultType,
            args: {
                input: { type: groupUpdateType }
            },
            resolve: async (source, {input}, context) => {
                if(!context.user) throw new Error("You are not authenticated!");
                const { name, userId } = input;
                const group = await leaveGroup(name, userId);
                return group;
            }
        }
    }
});

module.exports = groupMutation;