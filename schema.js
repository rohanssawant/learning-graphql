// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

export default `#graphql

# This "Game" type defines the queryable fields for every game in our data source.
type Game {
    id: ID!
    title: String!
    platform: [String!]!
    reviews: [Review!]
}

type Review {
    id: ID!
    rating: Int!
    content: String!
    game_id: Int!
    game: Game!
    author: Author!
}

type Author {
    id: ID!
    name: String!
    verified: Boolean!
    reviews: [Review!]
}

# The "Query" type is special: it lists all of the available queries that
# clients can execute, along with the return type for each. 
# In this case, the "reviews" query returns an array of zero or more Reviews (defined above).
type Query {
    reviews: [Review]
    review(id: ID!): Review
    games: [Game]
    game(id: ID!): Game
    authors: [Author]
}

type Mutation {
    deleteGame(id: ID!): [Game]
}
`;