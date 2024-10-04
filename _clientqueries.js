query GetReviewById($reviewId: ID!) {
  review(id: $reviewId) {
    rating
  }
}


query GetGameById($gameId2: ID!) {
 game(id: $gameId2) {
  platform
  reviews {
    content
    author {
     name 
    }
  }
 }
}

mutation DeleteGame($deleteGameId: ID!){
    deleteGame(id: $deleteGameId) {
        id
    }
}