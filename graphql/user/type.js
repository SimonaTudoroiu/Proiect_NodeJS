const {GraphQLObjectType,GraphQLID,GraphQLString,GraphQLNonNull,GraphQLInputObjectType,GraphQLUnionType} = require("graphql");
const {messageType} = require("../types");
const db = require("../../models");

const userType = new GraphQLObjectType({
    name: "UserType",
    fields: {
        userProfileId: {type: GraphQLID},
    }
});

const userResutType = new GraphQLUnionType({
    name: "UserResultType",
    types: [userType,messageType],
    resolveType: (user) => {
        if(user instanceof db.User){
            return "UserType";
        }
        else{
            return "MessageResultType";
        }
    }
});

module.exports = {
    userType,
    userResutType
};