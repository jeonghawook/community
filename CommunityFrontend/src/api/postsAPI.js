import axios from 'axios';
import instance from './interceptor';

export const GetPosts = async () => {
    try {
        const response = await instance.get(`posts/main`)
        return response.data;

    } catch (error) {
        console.error("게시글 조회 실패:", error);
    }
}

    export const CreatePost = async (completeFormData) => {
        try {
    
         await instance.post(`/posts/createPosts`, completeFormData,{
               },
       
            )
            return 
        } catch (error) {
console.log(error)
            throw error
        }
    }

export const DeletePost = async (deleteDto) => {
    try {
        await instance.delete(`posts/deletePost/${deleteDto.postId}`)
    } catch (error) {
        console.error("삭제 실패??")
    }
}

export const UpdatePost= async (postDto) => {
    try {
        await instance.patch(`posts/updatePost/${postDto.postId}`, {
          
        })
    } catch (error) {
        console.error("수정 실패??")
    }
}