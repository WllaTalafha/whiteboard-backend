'use strict';

function createPostModel(sequelize, DataTypes) {
    return (sequelize.define('post', {
        title: { type: DataTypes.STRING, allowNull: false },
        content: { type: DataTypes.STRING, allowNull: false },
        userId: { type: DataTypes.INTEGER, allowNull: false },
    }));
}
module.exports = { createPostModel };