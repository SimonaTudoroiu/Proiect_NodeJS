const { loginInputType, loginResultType, registerInputType, registerResultType } = require("./types");
const { login } = require("../../handlers/auth");
const { createUserProfile } = require("../../handlers/userProfiles");
const { GraphQLObjectType } = require("graphql");

const authMutation = new GraphQLObjectType({
    name: "AuthMutation",
    fields: {
        login: {
            type: loginResultType,
            args: {
                input: { type: loginInputType }
            },
            resolve: async (_, { input }) => {
                const { username, password } = input;
                const token = await login(username, password);
                return { token };
            }
        },
        register: {
            type: registerResultType,
            args: {
                input: { type: registerInputType }
            },
            resolve: async (_, { input }) => {
                const { username, password, mail, description, hobbies } = input;
                const userProfile = await createUserProfile(username, password, mail, description, hobbies);
                return userProfile;
            }
        }
    }
});

module.exports = authMutation;