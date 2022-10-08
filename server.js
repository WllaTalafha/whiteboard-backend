'use strict';

const express = require('express');
const cors = require('cors');
const { notFound } = require('./error-handlers/404');
const { errorHandler } = require('./error-handlers/500');
const postRoutes = require('./routes/post.route');
const commentRoutes = require('./routes/comment.route');
const userRoutes = require('./routes/user.route');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(postRoutes);
app.use(commentRoutes);
app.use(userRoutes);

app.get('/', (req, res) => res.status(200).json(`Main page`));

function serverStart(port) {
  app.listen(port, () => console.log(`Up and running @ ${port}`));
}

app.use('*', notFound);
app.use(errorHandler);


module.exports = { serverStart };