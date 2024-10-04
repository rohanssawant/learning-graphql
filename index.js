import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './schema.js';
import db from './_db.js';


const resolvers = {
  Query: {
    games: () => db.games,
    authors: () => db.authors,
    reviews: () => db.reviews,
    review: (_, args, ctx) => db.reviews.find(review => review.id === args.id),
    game: (_, args, ctx) => {
      console.log(`in Q resolver---`);
      return db.games.find(g => g.id === args.id);
    },
  },
  Game: {
    reviews: (parent, args, ctx) => {
      console.log(`in G resolver---`);
      console.log(parent);
      return db.reviews.filter(r => r.game_id === parent.id);
    }
  },
  Review: {
    author: (parent, args, ctx) => {
      console.log(`in R resolver---`);
      console.log(parent);
      return db.authors.find(a => a.id === parent.author_id);
    }
  },
  Mutation: {
    deleteGame: (_, args, ctx) => {
      return db.games.filter(g => g.id != args.id);
    }
  }
};

// The ApolloServer constructor requires two parameters: the schema
// definition and the set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);