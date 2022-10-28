const commentServices = require("../../services/comment/comment.services");



const comment = {
    index: async(req,res) => {
    
        const _commentServices = await commentServices.create(req.body);
        if(_commentServices){
            res.json(_commentServices)
        }
    },
    commentList: async(req,res)=> {
     
        const _commentServices = await commentServices.commentList(req.query.postId);
        if(_commentServices){
            res.json(_commentServices)
        }
    }
}

module.exports = comment;