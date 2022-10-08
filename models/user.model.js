'use strict';

function createUserModel(sequelize, Datatypes) {
    return (
        sequelize.define('user', {
            username: { type: Datatypes.STRING, allowNull: false, unique: true },
            email: { type: Datatypes.STRING, allowNull: false, unique: true },
            password: { type: Datatypes.STRING, allowNull: false },
            token: { type: Datatypes.VIRTUAL },
            role: { type: Datatypes.ENUM('user', 'admin'), allowNull: false, defaultValue: 'user' },
            actions: {
                type: Datatypes.VIRTUAL,
                get() {
                    const capabilities = {
                        admin: ['read', 'create', 'update', 'delete'],
                        user: ['read', 'create', 'update', 'delete'],
                    };
                    return capabilities[this.role];
                }
            }
        })
    )
}
module.exports = { createUserModel };