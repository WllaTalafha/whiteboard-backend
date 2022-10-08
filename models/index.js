'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const { createCommentModel } = require('./comment.model');
const { createPostModel } = require('./post.model');
const { createUserModel } = require('./user.model');
require('dotenv').config();


const POSTGRES_URL = process.env.DATABASE_URL;

const sequelizeOption = {
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};

const sequelize = new Sequelize(POSTGRES_URL, sequelizeOption);

sequelize.authenticate()
    .then(() => { console.log(` Connected to DMBS`) })
    .catch((reject) => { console.log(`Rejected : ${reject}`) });


const postModel = createPostModel(sequelize, DataTypes);
const commentModel = createCommentModel(sequelize, DataTypes);
const userModel = createUserModel(sequelize, DataTypes);

postModel.hasMany(commentModel, { foreignKey: "postId", sourceKey: "id" });
commentModel.belongsTo(postModel, { foreignKey: "postId", targetKey: "id" });

userModel.hasMany(commentModel, { foreignKey: "userId", sourceKey: "id" });
commentModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });

userModel.hasMany(postModel, { foreignKey: "userId", sourceKey: "id" });
postModel.belongsTo(userModel, { foreignKey: "userId", targetKey: "id" });

module.exports = { sequelize, postModel, commentModel, userModel };