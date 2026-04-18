import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  Flex,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import instance from '../api/interceptor';
import { useNavigate } from 'react-router-dom';
import FormField from '../components/signUpForm';

const SignupPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [signupError, setSignupError] = useState('');

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const userData = {
        ...data,
      };
      console.log(userData);
      const response = await instance.post('/users/signup', userData);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      setSignupError('다시 확인해주세요');
    }
  };

  return (
    <Flex align="flex-start" padding="50px">
      <form width="100%" onSubmit={handleSubmit(onSubmit)} style={{ position: 'relative' }}>
        <FormField
          label="Email"
          name="userEmail"
          type="email"
          register={register}
          errors={errors}
          required
        />

        <FormField
          label="Nickname"
          name="nickname"
          type="text"
          register={register}
          errors={errors}
          required
        />

        <FormField
          label="Password"
          name="password"
          type="password"
          register={register}
          errors={errors}
          required
        />

        {/* <FormField
          label="Confirm Password"
          name="confirm"
          type="password"
          register={register}
          errors={errors}
          required
        /> */}

        <FormField
          label="Phone Number"
          name="phoneNumber"
          type="tel"
          register={register}
          errors={errors}
          required
        />

        <Button type="submit" width="100%" position="bottom" bottom={0}     bg="#FFF34E" // Set your preferred pale yellow color
    color="black"
    _hover={{
      bg: '#F7E600', // Change the background color on hover
    }}>
          Sign Up
        </Button>

        {signupError && (
          <Box color="red" mt={4}>
            {signupError}
          </Box>
        )}
      </form>
    </Flex>
  );
};

export default SignupPage;
