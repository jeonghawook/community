import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useAuthStore from "../api/store";
import jwt_decode from "jwt-decode";
import axios from "axios";

function SocialLogin() {
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const kakaoCallbackFn= async(code)=>{
    const response = await axios.post("https://myblog3.shop/users/kakao/callback",{
      kakaoCode: code

    })
    console.log(response)
    const accessToken = response.data.accessToken
    const refreshToken = response.data.refreshToken
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken);

      const decodedToken = jwt_decode(accessToken);
      const { nickname, email, userId } = decodedToken;
  
      login(email, userId, nickname);
  
      navigate("/member");
  
  }



  useEffect(() => {
    const kakaoCallback = new URL(window.location.href);
    const code = kakaoCallback.searchParams.get("code") || "";
    kakaoCallbackFn(code)
  }, [login, navigate]);

  return (
    <div>
      <p>Retrieving the access token...</p>
    </div>
  );
}

export default SocialLogin;
