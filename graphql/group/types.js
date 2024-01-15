const { 
    GraphQLUnionType, 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLInt
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

const groupInputType = new GraphQLObjectType({
    name: "GroupInputType",
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        userId: { type: GraphQLID }
    }

});

const groupUpdateType = new GraphQLObjectType({
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