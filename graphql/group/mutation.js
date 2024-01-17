const { GraphQLObjectType, GraphQLNonNull, GraphQLID } = require("graphql");
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
            resolve: async (_, { input }) => {
                const { name, description, userId } = input;
                const group = await addGroup(name, description, userId);
                return group;
            }
        },
        enterGroup: {
            type: groupResultType, 
            args: {
              userId: { type: GraphQLNonNull(GraphQLID) }, 
              groupId: { type: GraphQLNonNull(GraphQLID) }, 
            },
            resolve: async (_, { userId, groupId }) => {
              const group = await enterGroup(userId, groupId);
              return group;
            }
          },
          
        leaveGroup: {
            type: groupResultType,
            args: {
                input: { type: groupUpdateType }
            },
            resolve: async (_, { input }) => {
                const { name, userId } = input;
                const group = await leaveGroup(name, userId);
                return group;
            }
        }
    }
});

module.exports = groupMutation;