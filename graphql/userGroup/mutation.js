const { GraphQLObjectType,GraphQLNonNull,GraphQLID,GraphQLFloat,GraphQLString} = require("graphql");
const { addUserGroup } = require("../../handlers");
const { userGroupType } = require("./types");

const userGroupMutation = new GraphQLObjectType({
    name: "UserGroupMutation",
    fields: {
        addUserGroup: {
            type: userGroupType,
            input: { type: userGroupType },
            resolve: async (_, { input }) => {
                const { userId, groupId } = input;
                const userGroup = await addUserGroup(userId, groupId);
                return userGroup;
            }
        }
    }
});

module.exports = userGroupMutation;