const {loginInputType, loginResultType, registerInputType, registerResultType} = require('./types');
const login = require('../../handlers/auth');
const {createUserProfile, deleteUserProfile} = require('../../handlers/userProfile');
const { GraphQLNonNull, GraphQLString, GraphQLObjectType } = require('graphql');

const authMutation = new GraphQLObjectType({
    name: 'AuthMutation',
    login: {
        type: loginResultType,
        args: {
            loginInput: { type: loginInputType },
        },
        resolve: async (parent, args) => {
            const {username, password} = args.loginInput;
            const result = await login(username, password);
            return result;
        }
    },
    register: {
        type: registerResultType,
        args: {
            registerInput: { type: registerInputType },
        },
        resolve: async (parent, args) => {
            const {username, password, mail, description, hobbies} = args.registerInput;
            const result = await createUserProfile(username, password, mail, description, hobbies);
            return result;
        }
    },

    deleteUser: {
        type: GraphQLString,
        args: {
            id: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: async (parent, args) => {
            const {id} = args;
            const result = await deleteUserProfile(id);
            return result;
        }
    }

});

module.exports = {authMutation};