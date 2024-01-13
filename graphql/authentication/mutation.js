const {GraphQLObjectType} = require('graphql');
const{
    loginInputType,
    loginResultType,
    registerInputType,
    registerResultType
} = require('./types');

const login = require('../../handlers/authentication').login;
const {addUser} = require('../../handlers/userProfile');

const authenticationMutation = new GraphQLObjectType({
    name: 'AuthenticationMutation',
    fields: {
        login: {
            type: loginResultType,
            args: {
                input: {type: loginInputType},
            },
            resolve: async(_, {input}) => {
                const token = await login(input.username, input.password);

                return {
                    token,
                    error: token ? null : "Invalid credentials",
                };
            },
        },
        register: {
            type: registerResultType,
            args: {
                input: {type: registerInputType},
            },
            resolve: async(_, {input}) => {
                const user = await addUser(input);

                return user;
            },
        },
    },
});

module.exports = authenticationMutation;

