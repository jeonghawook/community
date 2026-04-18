import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../api/interceptor";
import useAuthStore from "../api/store";
import LoginModal from '../components/loginModal'
import {
  Box, Button, Flex, Heading, Text, VStack, Select, Center
} from "@chakra-ui/react";
import { useQuery, useQueryClient, useMutation } from 'react-query';
import { Login } from '../api/loginAPI'
import ReviewPage from "./reviewPage";
import { NewWaiting } from "../api/adminAPI";
import { FaStar } from 'react-icons/fa';

function StorePage() {
  const { storeId } = useParams();
  const { isLogIn, login } = useAuthStore();
  const [storeData, setStoreData] = useState(null);
  const [number, setNumber] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);


  useEffect(() => {

    fetchStoreData()
  }, [storeId]);

  const queryClient = useQueryClient();

  const fetchStoreData = async () => {
    try {
      const response = await instance.get(`/stores/${storeId}`);
      const storeData = response.data;
      setStoreData(storeData);
      console.log(storeData);
    } catch (error) {
      console.error("Failed to fetch store data:", error);
    }
  };


  //예약 숫자 팀
  const handleChange = (e) => {
    const value = e.target.value;
    if (value >= 1 && value <= 4) {
      setNumber(value);

    } else {
      setNumber("");

    }
  };



  //예약 버튼 
  const handleClick = async (e) => {
    e.preventDefault();
    if (isLogIn) {

      handleNewWaiting()
    } else {
      setShowLoginModal(true);
    }
  };

  const handleNewWaiting = () => {
    const newWaitingDto = { storeId, number }
    newWaitings.mutate(newWaitingDto)

  }

  const newWaitings = useMutation(NewWaiting, {
    onSuccess: () => {
      queryClient.invalidateQueries('admin-status')
    },
    onError: (error) => {

    }
  })




  //비로그인 시 예약 로그인 모달 팝업 
  const userLogin = useMutation(Login, {
    onSuccess: ({ email, isAdmin, userId, StoreId }) => {
      login(email, isAdmin, userId, StoreId)
      setShowLoginModal(false)
    }
  })

  const handleLogin = (loginDto) => {
    userLogin.mutate(loginDto)
  }

  if (!storeData) {
    return <div>Loading...</div>;
  }

  return (
    <VStack>
      <Box p={4}>
        <Heading
          size="lg"
          mb={1}
          backgroundColor="white"
          borderRadius="10px"
          textAlign="center"
          width="700px"
        >
          {storeData.storeName}
        </Heading>
        <Box display='flex' justifyContent='center' >
          <FaStar color="orange" size={20} />
          <Text>({storeData.rating}) {storeData.category}</Text>
        </Box>


        <Text textAlign='center' fontSize="md" mb={4}>
          주소: {storeData.newAddress}
        </Text>

        <form onSubmit={handleClick}>
          <Box background="white" padding="4px" borderRadius="10px">
            <Flex align="center" justifyContent="right">

              <Flex align="center">


                <Select
                  type="number"
                  value={number}
                  id="number"
                  onChange={handleChange}
                  placeholder="인원"
                  width="50%"
                  marginRight="1rem"
                  backgroundColor='white'
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </Select>
                <Button type="submit" colorScheme="blue" ml={2}>
                  예약하기
                </Button>
              </Flex>
            </Flex>
            <Text paddingRight='30px' textAlign='right'>(인원을 선택해 주세요!!) </Text>
          </Box>
        </form>
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          handleLogin={handleLogin}
        />
        <ReviewPage storeId={storeId} />
      </Box >
    </VStack >
  );
}

export default StorePage;
