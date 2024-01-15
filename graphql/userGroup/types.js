const { GraphQLObjectType, GraphQLString, GraphQLFloat, GraphQLUnionType} = require("graphql");
const { messageResultType } = require("../types");
const { groupType } = require("../group/types");
const { userType } = require("../user/types");
const db = require("../../models");

const userGroupType = new GraphQLObjectType({
    name: "UserGroup",
    fields: {
        userId: { type: GraphQLString },
        groupId: { type: GraphQLString }
    }
});

const userGroupResultType = new GraphQLUnionType({
    name: "UserGroupResult",
    types: [userGroupType, messageResultType],
    resolveType: (userGroup) => {
        if (userGroup instanceof db.UserGroup) {
            return "UserGroupType";
        }
        else {
            return "MessageResultType";
        }
    }
});

module.exports = {
    userGroupType,
    userGroupResultType
};
