import React, { useState } from "react";
import axios from 'axios';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Button,
  Image,
  
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import KAKAOLOGIN from "../assets/KAKAOLOGIN.png";

const LoginModal = ({ isOpen, onClose, handleLogin, handleKakaoLogin }) => {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginDto = { userEmail, password };
    handleLogin(loginDto);
  };

  const handleSignUpClick = () => {
    onClose();
  };


  const kakaoLogin= async()=>{
  const  url = await axios.get('https://myblog3.shop/users/login/kakao')
  console.log(url.data)
  document.location.href = url.data;
} 

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>로그인</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div>
              <label>이메일:</label>
              <Input
                type="text"
                value={userEmail}
                onChange={handleEmailChange}
              />
            </div>
            <div>
              <label>비밀번호:</label>
              <Input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            <Button type="submit" colorScheme="blue" mt={4}>
              로그인
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              ml={2}
              mt={4}
              onClick={handleSignUpClick}
            >
              <Link to={"/signup"}> 회원가입</Link>
            </Button>
          </form>
        </ModalBody>
        <ModalFooter justifyContent="left">
       
<Button onClick={kakaoLogin}>          {/* <a href=" http://localhost:3000/users/login/kakao" style={{ padding: 0, width: "auto" }}>
            {/* http://localhost:3000/users/login/kakao */}
            <Image src={KAKAOLOGIN} style={{ width: "100%", height: "auto" }} />
            </Button>
  
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
