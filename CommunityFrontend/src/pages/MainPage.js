import React, { useState } from "react";
import {
  Box,
  Input,
  Avatar,
  Text,
  Image,
  Flex,
  IconButton,
  Icon,
  Center,
  Card,
  Button,
} from "@chakra-ui/react";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa"; // Import Facebook-like icons

import CreatePostModal from "../components/shared/CreatePostModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CreatePost, GetPosts } from "../api/postsAPI";

function MainPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data } = useQuery("store-post", () => GetPosts(), {
    refetchOnWindowFocus: false,
  });

 

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(data);
  return (
    <Center>
      <Box>
        <Box display="flex" justifyContent="center" padding="5%" size="lg">
       
          <Button
            type="text"
            name="postDescriptionInput"
            background="white"
            onClick={openModal}
            width="100%"
            minWidth="100px"
            maxWidth="300px"
          >SHARE YOUR STORY</Button>
        </Box>
        <CreatePostModal isOpen={isModalOpen} onClose={closeModal} />

        {data?.map((post,index) => (
          <Card 
          key={index}
          size="lg" boxShadow="md" bg="white" rounded="md" mb="4" p="4">
            <Flex alignItems="center">
              <Avatar
                name="User"
                src="user-profile-image.jpg"
                size="sm"
                mr="2"
              />
              <Box width="100%" display="flex" justifyContent="space-between">
                <Text fontWeight="bold">{post.user.nickname}</Text>
                <Text ml="2" color="gray.500">
                  {new Date(post.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                  })}
                </Text>
              </Box>
            </Flex>
            {post.images !== null? (
              <Box
            
              >
                <Image 
                margin="auto"
                maxH="500px" 
                maxW="600px"
                src={post.images} alt="Post Image" mt="3" rounded="md" />
              </Box>
            ) : null}
            <Text
              width="90%"
              margin="auto"
              noOfLines={1}
              textOverflow="ellipsis"
              alignItems="center"
              overflow="hidden"
              whiteSpace="nowrap"
              mt="3"
            >
              {post.postDescription}
            </Text>
            <Flex mt="3" width="100%" justifyContent="space-around">
              <IconButton
                variant="outline"
                colorScheme="blue"
                aria-label="Like Post"
                icon={<Icon as={FaThumbsUp} />}
                size="sm"
                width="33%"
              />
              <IconButton
                variant="outline"
                colorScheme="blue"
                aria-label="Comment on Post"
                icon={<Icon as={FaComment} />}
                size="sm"
                ml="2"
                width="33%"
              />
              <IconButton
                variant="outline"
                colorScheme="blue"
                aria-label="Share Post"
                icon={<Icon as={FaShare} />}
                size="sm"
                ml="2"
                width="33%"
              />
            </Flex>
          </Card>
        ))}
      </Box>
    </Center>
  );
}

export default MainPage;
