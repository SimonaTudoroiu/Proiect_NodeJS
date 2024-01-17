const { 
    GraphQLUnionType, 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLInt,
    GraphQLInputObjectType
} = require("graphql");
const { messageResultType } = require("../types");
const db = require("../../models");

const groupType = new GraphQLObjectType({
    name: "GroupType",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        nr_members: { type: GraphQLInt },
    }
});

const groupInputType = new GraphQLInputObjectType({
    name: "GroupInputType",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
    }

});

const groupUpdateType = new GraphQLInputObjectType({
    name: "GroupUpdateType",
    fields: {
        name: { type: GraphQLString },
        userId: { type: GraphQLID }
    }
});

const groupResultType = new GraphQLUnionType({
    name: "GroupResultType",
    types: [groupType, messageResultType],
    resolveType: (group) => {
        if (group instanceof db.Group) {
            return "GroupType";
        }
        else {
            return "MessageResultType";
        }
    }
});

module.exports = {
    groupType,
    groupInputType,
    groupUpdateType,
    groupResultType
};