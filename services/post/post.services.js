const Content = require("../../model/post/content.model")
const Post = require("../../model/post/post.model")

const createPost = {
    create: async (data) => {
        const contentData = new Content(data)
        const contentSave = await contentData.save()
        data.contentId = contentData._id
        data.userId = data.postId
        const postData = new Post(data);
        try {
            await postData.save()
            return { statusCode: 200, statusMsg: postData }

        } catch (error) {
            return error
        }
    },

    postlist: async (data) => {
         const list = await Post.find({"userId":data}).populate("contentId","-postId")
         if(list){
            return {statusCode:200,statusMsg:list}
         }

        
    }

}


module.exports = createPost;