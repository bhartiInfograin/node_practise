const Comment = require("../../model/post/comment.model")




const createComment = {
    create: async(data) => {
          const params ={
            postId:data.postId,
            userId:data.userId,
            comment:data.comment
          }
        try{
             const comment = new Comment(params)
             const commentSave = await comment.save();
             if(commentSave){
                return {statusCode:200,statusMsg:commentSave}
             }
        }catch(error){
            return error
        }
    },

    commentList:async(data) => {
         try{
            const commentList = await Comment.find({"postId":data})
            return commentList
            
         }catch(error){
            return error
         }
       
    }

}





module.exports = createComment;