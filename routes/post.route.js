'use strict';

const express = require('express');
const { postModel, commentModel, userModel } = require('../models');
const { bearerAuth } = require('../middlewares/bearerAuth');
const { acl } = require('../middlewares/acl');

const router = express.Router();


router.post('/post', bearerAuth, acl('create'), Addpost);
router.get('/post', bearerAuth, acl('read'), getPosts);
router.get('/post/:id', bearerAuth, acl('read'), getOnePost);
router.put('/post/:id', bearerAuth, acl('update'), updatePost);
router.delete('/post/:id', bearerAuth, acl('delete'), deletePost);


//===== handlers =====//


async function Addpost(req, res, next) {
    try {
        //req.body : {"title":"any text", "content":"any text"}
        const postData = {
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id,
        }
        let createdPost = await postModel.create(postData);
        res.status(201).json(createdPost);
    } catch (err) {
        next(`Error inside Addpost function : ${err}`);
    }
}

async function getPosts(req, res, next) {
    try {
        let posts = await postModel.findAll({ include: [commentModel, userModel] });
        res.status(200).send(posts);
    } catch (err) {
        next(`Error inside getPosts function : ${err}`);
    }
}

async function getOnePost(req, res, next) {
    try {
        let id = req.params.id;
        let post = await postModel.findOne({ where: { id } });
        if (post === null) {
            res.status(204).send(`no post with match id`);
        } else {
            res.status(200).send(post);
        }
    } catch (err) {
        next(`Error inside getOnePost function : ${err}`);
    }
}

async function updatePost(req, res, next) {
    try {
        let postId = req.params.id;
        let newPostData = req.body;  //req.body : {"title":"any new data", "content":"any new data","userId":"id"}
        console.log(newPostData);
        await postModel.update(newPostData, { where: { id: postId } });
        let updatedPost = await postModel.findOne({ where: { id: postId } });
        res.status(200).send(updatedPost);
    } catch (err) {
        next(`Error inside updatePost function : ${err}`);
    }
}

async function deletePost(req, res, next) {
    try {
        let id = req.params.id;
        await postModel.destroy({ where: { id } });
        res.status(202).end();
    } catch (err) {
        next(`Error inside deletePost function : ${err}`);
    }
}

//===== Export =====//


module.exports = router;