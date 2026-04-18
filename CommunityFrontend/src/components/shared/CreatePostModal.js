import React, { useState } from "react";
import {
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  Image
} from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreatePost } from "../../api/postsAPI";

function CreatePostModal({ isOpen, onClose }) {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [formData, setFormData] = useState({
      postDescriptionInput: "",
      group: "",
      tags: "",
    });
  
    const queryClient = useQueryClient();
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };
  
    const handleFileChange = (e) => {
      const files = e.target.files;
      setSelectedFiles(files);
  
      // Generate image previews
      const previews = Array.from(files).map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
    };
  
    const createPost = useMutation('store-post', CreatePost, {
      onSuccess: () => {
        queryClient.invalidateQueries('store-post');
        setFormData({
          postDescriptionInput: "",
          group: "",
          tags: "",
        });
        setImagePreviews([]); // Clear image previews after successful upload
        setImagePreviews([])  
      onClose();
      },
    });
  
    const handleCreatePost = (completeFormData) => {
      createPost.mutate(completeFormData);
    };
  
    const handlePostSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const completeFormData = new FormData();
        if (selectedFiles.length > 0) {
          for (let i = 0; i < selectedFiles.length; i++) {
            completeFormData.append("file", selectedFiles[i]);
          }
        }
  
        completeFormData.append("postDescription", formData.postDescriptionInput);
        completeFormData.append("group", formData.group);
        completeFormData.append("tags", formData.tags);
  
        handleCreatePost(completeFormData);
      } catch (error) {
        console.error("Error uploading post:", error);
        if (error.response) {
          console.error("Server response data:", error.response.data);
        }
      }
    };

    const onCloseModal= () =>{
      setFormData({
        group:'',
        postDescriptionInput:'',
        tags:''
      })
      setSelectedFiles([])
      setImagePreviews([])
    }


  return (
    <Modal isOpen={isOpen} onClose={() => { onClose(); onCloseModal(); }}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>글 올리기</ModalHeader>
        <ModalBody>
          <form onSubmit={handlePostSubmit}>
            <Flex direction="column" align="center" mt={4}>
              <Flex align="center" justify="center" marginBottom="1rem" overflow='hidden'>
                {imagePreviews.map((preview, index) => (
                  <Image
                    key={index}
                    src={preview}
                    alt={`Preview ${index}`}
                    maxH="500px" 
                    maxW="400px"
                  />
                ))}
              </Flex>
              <Input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                placeholder="이미지 업로드"
                width="100%"
                background="white"
              />
              <Textarea
                name="postDescriptionInput"
                value={formData.postDescriptionInput}
                onChange={handleInputChange}
                placeholder="글쓰기"
                width="100%"
                resize="none"
                maxH="200px"  // Set a maximum height for scrolling
                overflowY="auto" // Enable vertical scrolling
                background="white"
              />
      
              <Input
                type="text"
                name="group"
                value={formData.group}
                onChange={handleInputChange}
                placeholder="Community"
                width="100%"
                background="white"
              />
              <Input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="태그"
                width="100%"
                background="white"
              />
            </Flex>
            <Button type="submit" colorScheme="blue">
              등록
            </Button>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>닫기</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
                }


export default CreatePostModal;
