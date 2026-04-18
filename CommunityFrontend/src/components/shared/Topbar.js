import React, { useState } from "react";
import useAuthStore from "../../api/store";
import {  useNavigate } from "react-router-dom";
import {
  Button,
  Icon,
  VStack,
  Box,
  Text,
  Flex,
  Image,
  Link
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";
import { Login, Logout, kakaoLogin } from "../../api/loginAPI";
import { useMutation } from "react-query";
import LoginModal from "../loginModal";
import KAKAOCOMMUNITY from "../../assets/KAKAOCOMMUNITY.png";

const Topbar = () => {
  const { isLogIn, nickname, logout, login, setSocketConnected } = useAuthStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
console.log("topbar")
  const navigate = useNavigate();

  const userLogin = useMutation(Login, {
    onSuccess: ({ email, userId, nickname }) => {
      login(email, userId, nickname);
      setSocketConnected(true);
      setShowLoginModal(false);
    
      navigate("/member")
    },
  });


  const handleLogin = (loginDto) => {
    userLogin.mutate(loginDto);
  };

  const userLogout = useMutation(Logout, {
    onSuccess: () => {
      logout();
      handleHome();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleLogout = () => {
    userLogout.mutate();
  };

  const handleHome = () => {
    (isLogIn) ? navigate("/member") : navigate("/");
  };

  return (
    <Box height={"60px"} margin={"auto"} width={"95%"}>
      <header>
        <nav>
          <Flex
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            height={"60px"}
          >
            <Box>
              <Link onClick={handleHome}>
                <Image src={KAKAOCOMMUNITY} alt="Kakao Image" />
              </Link>
            </Box>

            {isLogIn ? (
              <Box display="flex" alignItems="center">
                <Text paddingRight="10px">{nickname}</Text>
                <Button
                  size="sm"
                  icon={<Icon as={FaUser} boxSize={4} />}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Box display="flex" alignItems="center">
                <Button
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                  className="person-button"
                  bg="#F7E600"
                  borderWidth="3px"
                  borderColor="white"
                >
                  로그인/회원가입
                </Button>
                {showLoginModal && (
                  <LoginModal
                    isOpen={showLoginModal}
                    onClose={() => setShowLoginModal(false)}
                    handleLogin={handleLogin}
                       />
                )}
              </Box>
            )}
          </Flex>
        </nav>
      </header>
    </Box>
  );
};

export default Topbar;
