'use strict';
process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').DialogflowApp;

// the action name from the make_name Dialogflow intent
const ACTIONS = Object.freeze({
  FETCH_MOVIES: 'fetchMovies',
  FETCH_TIMES: 'fetchTimes',
  BOOK_MOVIE: 'bookMovie'
});
// the parameters that are parsed from the make_name intent
const PARAMS = Object.freeze({
  MOVIE_THEATER_CIRCUIT: 'movieTheaterCircuit',
  MOVIE_THEATER_CIRCUIT_LOCATION: 'movieCircuitLocations',
  MOVIE: 'movie',
  MOVIE_TIME: 'time'
});

const fetchMovieListing = (circuit, location) => {
  console.log('MOVIE_THEATER_CIRCUIT: ' + circuit);
  console.log('MOVIE_THEATER_CIRCUIT_LOCATION: ' + location);

  const moviesList = [{
    FilmId: 124684,
    Title: 'The Commuter',
    Cert: 'PG13',
    Img: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002992',
    ReleaseDate: '2018-01-12T00:00:00',
    RunTime: '105',
    Synopsis: 'In this action-packed thriller, Liam Neeson plays an insurance salesman, Michael, on his daily commute home, which quickly becomes anything but routine. After being contacted by a mysterious stranger, Michael is forced to uncover the identity of a hidden passenger on his train before the last stop. As he works against the clock to solve the puzzle, he realizes a deadly plan is unfolding and is unwittingly caught up in a criminal conspiracy. One that carries life and death stakes for himself and his fellow passengers.',
    Cast: 'TBC',
    Director: 'TBC',
    FriendlyName: 'commuter-the',
    Attributes: [],
    MediaItems: {
      OneSheet: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002992',
    },
    Order: 20,
    GroupedFilms: [],
  }, {
    FilmId: 124674,
    Title: 'Darkest Hour',
    Cert: 'PG13',
    Img: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002974',
    ReleaseDate: '2017-12-22T00:00:00',
    RunTime: '125',
    Synopsis: 'Within days of becoming Prime Minister of Great Britain, Winston Churchill must face one of his most turbulent and defining trials: exploring a negotiated peace treaty with Nazi Germany, or standing firm to fight for the ideals, liberty and freedom of a nation. As the unstoppable Nazi forces roll across Western Europe and the threat of invasion is imminent, and with an unprepared public, a skeptical King, and his own party plotting against him, Churchill must withstand his darkest hour, rally a nation, and attempt to change the course of world history.',
    Cast: 'TBC',
    Director: 'TBC',
    FriendlyName: 'darkest-hour',
    Attributes: [],
    MediaItems: {
      OneSheet: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002974',
    },
    Order: 20,
    GroupedFilms: [],
  }, {
    FilmId: 124698,
    Title: 'Den Of Thieves',
    Cert: 'R',
    Img: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00003001',
    ReleaseDate: '2018-01-19T00:00:00',
    RunTime: '140',
    Synopsis: 'Every day, $120mm in cash is taken out of circulation and destroyed by the Los Angeles Branch of the Federal Reserve -- unless a notorious, elite crew of bank robbers can pull off the ultimate heist and get to the money first... right under the noses of LA"s most feared division in law enforcement.',
    Cast: 'TBC',
    Director: 'TBC',
    FriendlyName: 'den-of-thieves',
    Attributes: [],
    MediaItems: {
      OneSheet: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00003001',
    },
    Order: 20,
    GroupedFilms: [],
  }, {
    FilmId: 124616,
    Title: 'Ferdinand',
    Cert: 'PG',
    Img: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002917',
    ReleaseDate: '2017-12-15T00:00:00',
    RunTime: '107',
    Synopsis: 'FERDINAND tells the story of a giant bull with a big heart. After being mistaken for a dangerous beast, he is captured and torn from his home. Determined to return to his family, he rallies a misfit team on the ultimate adventure. Set in Spain, Ferdinand proves you canat judge a bull by its cover.',
    Cast: 'TBC',
    Director: 'TBC',
    FriendlyName: 'ferdinand',
    Attributes: [],
    MediaItems: {
      OneSheet: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002917',
    },
    Order: 20,
    GroupedFilms: [],
  }, {
    FilmId: 124694,
    Title: 'Paddington 2',
    Cert: 'PG',
    Img: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002987',
    ReleaseDate: '2018-01-12T00:00:00',
    RunTime: '103',
    Synopsis: 'From producer David Heyman (HARRY POTTER, GRAVITY, FANTASTIC BEASTS AND WHERE TO FIND THEM).  PADDINGTON 2  finds Paddington happily settled with the Brown family in Windsor Gardens, where he has become a popular member of the community, spreading joy and marmalade wherever he goes. While searching for the perfect present for his beloved Aunt Lucy"s 100th birthday, Paddington spots a unique pop-up book in Mr. Gruber"s antique shop, and embarks upon a series of odd jobs to buy it. But when the book is stolen, it"s up to Paddington and the Browns to unmask the thief.',
    Cast: 'TBC',
    Director: 'TBC',
    FriendlyName: 'paddington-2',
    Attributes: [],
    MediaItems: {
      OneSheet: 'http://64.119.160.23/CDN/Image/Entity/FilmPosterGraphic/HO00002987',
    },
    Order: 20,
    GroupedFilms: [],
  }];

  let output = moviesList.map((movie) => {
    return movie.Title.toLowerCase();
  });

  return output.join(',');
};

const fetchMovieTimes = (movie) => {
  return ['1pm', '3pm', '5pm', '7pm'];
};

const fetchMovies = (app) => {
  const circuit = app.getArgument(PARAMS.MOVIE_THEATER_CIRCUIT);
  const location = app.getArgument(PARAMS.MOVIE_THEATER_CIRCUIT_LOCATION);
  const movies = fetchMovieListing(circuit, location);
  app.ask(`Alright, the movies playing are ${movies}. Which one would you like to see?`);
};

const fetchTimes = (app) => {
  const movie = app.getArgument(PARAMS.MOVIE);
  const times = fetchMovieTimes(movie);
  app.ask(`The movie is playing at ${times}. Which time should I book?`);
};

const bookMovie = (app) => {
  const time = app.getArgument(PARAMS.MOVIE_TIME);
  app.tell('The movie has been booked');
};

exports.testIntentHandler = (request, response) => {
  const app = new App({request, response});
  console.log('Request headers: ' + JSON.stringify(request.headers));
  console.log('Request body: ' + JSON.stringify(request.body));

  let actionMap = new Map();
  actionMap.set(ACTIONS.FETCH_MOVIES, fetchMovies);
  actionMap.set(ACTIONS.FETCH_TIMES, fetchTimes);
  actionMap.set(ACTIONS.BOOK_MOVIE, bookMovie);

  app.handleRequest(actionMap);
};

