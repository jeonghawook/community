import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Input,
    Select,
    Text,
    Card,
} from "@chakra-ui/react";
import useAuthStore from "../api/store";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from "react-router-dom";
import { DeleteReview, PostReview, StoreReviews } from "../api/reviewAPI";
import AlertModal from "../components/alertModal";

function ReviewPage() {
    const { storeId } = useParams();
    const { userId, isLogIn } = useAuthStore();
    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);
    const [reviewInput, setReviewInput] = useState("");
    const [ratingNumber, setRatingNumber] = useState("");
    const [accept, setAccept] = useState('')

    // useEffect(() => {
    //     const fetchStoreData = async () => {
    //         try {
    //             const response = await instance.get(`stores / ${ storeId } /reviews`);
    //             const storeData = response.data;
    //             setStoreData(storeData);
    //             console.log("웨");
    //         } catch (error) {
    //             console.error("Failed to fetch store data:", error);
    //         }
    //     };
    //     fetchStoreData()
    // }, [])

    const { data } = useQuery('store-review', () => StoreReviews(storeId), { refetchOnWindowFocus: false });

    const postReview = useMutation('store-review', PostReview, {
        onSuccess: () => {
            queryClient.invalidateQueries('store-review');
            setReviewInput("");
            setRatingNumber("");
        },
        onError: (error) => {
            if (!isLogIn)
                return alert("로그인해주세요")

            if (error.response.data.message.length === 1) {
                alert("리뷰를 입력해주세요")
            } else if (error.response.data.message.length === 4) {
                alert("별점을 선택해 주세요")
            } else {
                alert("별점 과 리뷰를 채워주세요")
            }




        }
    });

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        const reviewDto = {
            review: reviewInput,
            rating: ratingNumber,
            storeId: storeId
        };
        handlePostReview(reviewDto);
    };

    const handlePostReview = (reviewDto) => {

        postReview.mutate(reviewDto);
    };


    const deleteReview = useMutation('store-review', DeleteReview, {
        onSuccess: () => {
            queryClient.invalidateQueries('store-review')
        },
        onError: (error) => {
            console.error("삭제 실패:", error);
        }
    })


    const handleDeleteReview = () => {
        const deleteDto = { storeId, reviewId: accept }
        deleteReview.mutate(deleteDto)
        handleCloseModal()
    }




    const handleReviewText = (e) => {
        setReviewInput(e.target.value);
    };

    const handleRating = (e) => {
        setRatingNumber(e.target.value);
    };

    const handleDeleteModal = (reviewId) => {
        setAccept(reviewId);
        handleOpenModal()
    }
    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setAccept('')
        setIsOpen(false);
    };

    const handleAccept = () => {
        handleDeleteReview()
    };

    const handleCancel = () => {
        handleCloseModal()
    };



    return (
        <>
            <form onSubmit={handleReviewSubmit}>
                <Flex  align="center" justify="space-between" mt={4}>
                    <Select
                        value={ratingNumber}
                        onChange={handleRating}
                        placeholder="별점"
                        width="25%"
                        marginRight="1rem"
                        backgroundColor='white'
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Select>
                    <Input
                        type="text"
                        value={reviewInput}
                        onChange={handleReviewText}
                        placeholder="리뷰쓰기"
                        width="70%"
                        marginRight="1rem"
                        background="white"
                    />
                    <Button type="submit" colorScheme="blue">
                        등록
                    </Button>
                </Flex>
            </form>
            <Box >
                <Box
                    height="380px"
                    overflowY="auto"
                    overflowX="hidden"
                    width="700px"
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "8px",
                            borderRadius: "8px",
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                        },
                    }}
                >
                    <div>
                        {data?.map((review, index) => (
                            <Card
                                key={index}
                                variant="filled"
                                backgroundColor="skyblue"
                                mt={2}
                            >



                                <Box height="100px">
                                    <Flex justifyContent="space-between" alignItems="center">
                                        <Text>유저 아이디: {review.UserId}</Text>
                                        <Text>{review.rating} 점</Text>
                                    </Flex>
                                    <Box alignItems='center' display='flex' justifyContent='space-between' paddingTop="10px">내용: {review.review}
                                        {userId === review.UserId
                                            &&
                                            <Button onClick={() => handleDeleteModal(review.reviewId)} >삭제</Button>}

                                        <AlertModal
                                            isOpen={isOpen}
                                            onClose={handleCloseModal}
                                            onAccept={handleAccept}
                                            onCancel={handleCancel}
                                            title="댓글"
                                            message="정말로 삭제하쉴?"
                                        />
                                    </Box>


                                </Box>
                            </Card>
                        ))}
                    </div>
                </Box>
            </Box>
        </>
    );
}

export default ReviewPage;
