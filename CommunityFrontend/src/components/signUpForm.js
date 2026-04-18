import React from 'react';
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
  Text,
} from '@chakra-ui/react';

const FormField = ({ label, name, type, register, errors, required }) => (
  <FormControl isInvalid={errors[name]} flex="1" mb={2} padding="10px">
    <Flex alignItems="center">
      <FormLabel flex="1" mb={0}>
        {label} :
      </FormLabel>
      <Input
        flex="2"
        type={type}
        {...register(name, { required })}
        bg="white"
        borderColor={errors[name] ? 'red.300' : 'gray.200'}
        h="38px"
      />
      <Text color="red.300" ml={400} fontSize="sm" alignSelf="center" position="fixed">
        {errors[name] && `${label} is required.`}
      </Text>
    </Flex>
  </FormControl>
);

export default FormField;
