const postServices = require("../../services/post/post.services");



const post = {
    index: async (req, res) => {
        var content = req.files;
        var contentpath = [];
        content.forEach(element => {
            const _contentpath = "/upload/" + element.filename;
            contentpath.push(_contentpath)
        });
        const data = {
            description: req.body.postDesctiption,
            postId: req.body.userId,
            contents: contentpath
        }
        const _postServices = await postServices.create(data)
        if (_postServices) {
            res.json(_postServices)
        }
    },

    postList: async (req, res) => {
        const data = req.query.userId
        const _postServices = await postServices.postlist(data)
        if (_postServices) {
            res.json(_postServices)
        }
    }
}

module.exports = post 