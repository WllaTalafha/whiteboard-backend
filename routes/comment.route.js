'use strict';

const express = require('express');
const { commentModel, userModel } = require('../models');
const { acl } = require('../middlewares/acl');
const { bearerAuth } = require('../middlewares/bearerAuth');
const router = express.Router();



router.post('/comment/:postID/:userID', bearerAuth, acl('create'), addComment);

router.get('/comment/:postID', bearerAuth, acl('read'), getCommentsForPost);



//===== handlers =====//



async function getCommentsForPost(req, res, next) {
    try {
        let commentsForId = await commentModel.findAll({ where: { postId: req.params.postID }, include: userModel });
        res.status(201).send(commentsForId);
    } catch (err) {
        next(`Error inside getCommentsForPost function : ${err}`);
    }
}


async function addComment(req, res, next) {
    try {
        const commentData = {
            content: req.body.content,
            postId: req.params.postID,
            userId: req.params.userID,
        }
        let createdComment = await commentModel.create(commentData);
        let commentsForId = await commentModel.findAll({ where: { postId: req.params.postID } });
        res.status(201).send(commentsForId);
    } catch (err) {
        next(`Error inside addComment function : ${err}`);
    }
}

//===== Export =====//


module.exports = router;