'use strict';

const { serverStart } = require('./server');
const { sequelize } = require('./models');
require('dotenv').config();

sequelize.sync()
  .then(()=>{serverStart(process.env.PORT)})
  .catch(()=>{console.log(`cannot sync models with Database `)});