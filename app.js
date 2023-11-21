const express = require('express');

const { getTopics } = require('./controllers/topics.controller');
const { getEndpoints } = require('./controllers/endpoints.controller');

const app = express();
const {
  handleCustomErrors,
  handleserverErrors,
  handle404Errors,
  handlePsqlErrors,
} = require('./errors');
const {
  getArticleById,
  getArticles,
} = require('./controllers/articles.controller');
const {
  getCommentsByArticleId,
} = require('./controllers/comments.controllers');

app.use(express.json());

// --- Endpoints --- //

// Topics endpoint
app.get('/api/topics', getTopics);

// Endpoints endpoint//
app.get('/api', getEndpoints);

// Articles endpoints
app.get('/api/articles', getArticles);
app.get('/api/articles/:article_id', getArticleById);

// Comments endpoints
app.get('/api/articles/:article_id/comments', getCommentsByArticleId);

// --- Handle Errors --- //

// 404 for not a path
app.all('*', handle404Errors);
// Other error handling
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleserverErrors);

module.exports = app;
