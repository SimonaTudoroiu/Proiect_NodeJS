const { GraphQLObjectType,GraphQLNonNull,GraphQLID,GraphQLFloat,GraphQLString} = require("graphql");
const { addUser } = require("../../handlers/user");
const { userType } = require("./types");

const userMutation = new GraphQLObjectType({
    name: "UserMutation",
    fields: {
        addUser: {
            type: userType,
            input: { type: userType },
            resolve: async (_, { input }) => {
                const { userProfilId } = input;
                const user = await addUser(userProfilId);
                return user;
            }
        }
    }
});

module.exports = userMutation;