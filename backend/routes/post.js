const express = require('express')
const { getPosts, getPost, addPost, editPost, deletePost } = require('../controllers/post')
const { addComment, deleteComment } = require('../controllers/comment')
const authenticated = require('../middlewares/authenticated')
const hasRole = require('../middlewares/hasRole')
const mapPost = require('../helpers/mapPost')
const mapComment = require('../helpers/mapComment')
const ROLES = require('../constants/roles')

const router = express.Router({ mergeParams: true })


router.get('/', async (req, res, next) => {
    try {
        const { posts, lastPage } = await getPosts(
            req.query.search,
            req.query.limit,
            req.query.page
        )

        res.send({ data: { lastPage, posts: posts.map(mapPost) } })
    } catch (e) {
        next(e);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const post = await getPost(req.params.id)

        if (!post) {
            return res.status(404).send({ error: 'Post not found' });
        }

        res.send({ data: mapPost(post) })
    } catch (e) {
        next(e);
    }
})

router.post('/:id/comments', authenticated, async (req, res, next) => {
    try {
        const newComment = await addComment(req.params.id, {
            content: req.body.content,
            author: req.user.id,
            post: req.params.id
        })

        res.send({ data: mapComment(newComment) })
    } catch (e) {
        next(e);
    }
})

router.delete('/:postId/comments/:commentId', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res, next) => {
    try {
        await deleteComment(
            req.params.postId,
            req.params.commentId,
        )

        res.send({ error: null })
    } catch (e) {
        next(e);
    }
})

router.post('/', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res, next) => {
    try {
        const newPost = await addPost({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
        });

        res.send({ data: mapPost(newPost) })
    } catch (e) {
        next(e);
    }
})

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res, next) => {
    try {
        const updatedPost = await editPost(
            req.params.id,
            {
                title: req.body.title,
                content: req.body.content,
                image: req.body.image,
            }
        );

        if (!updatedPost) {
            return res.status(404).send({ error: 'Post not found' });
        }

        res.send({ data: mapPost(updatedPost) })
    } catch (e) {
        next(e);
    }
})

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res, next) => {
    try {
        const result = await deletePost(req.params.id);

        if (result.deletedCount === 0) {
            return res.status(404).send({ error: 'Post not found' });
        }

        res.send({ error: null })
    } catch (e) {
        next(e);
    }
})

module.exports = router
