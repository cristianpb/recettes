const mlabUsername = process.env.MLAB_USERNAME;
const mlabPassword = process.env.MLAB_PASSWORD;
const port = process.env.PORT || 3003 ;

export const environment = {
  mongourl: `mongodb://${mlabUsername}:${mlabPassword}@ds127634.mlab.com:27634/recettes`,
  // mongourl: 'mongodb://localhost:27017/recettes',
  // news_url: 'https://ng-tweet.herokuapp.com'
  news_url: `http://0.0.0.0:${port}`
};
