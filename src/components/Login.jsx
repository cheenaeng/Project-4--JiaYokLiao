import React from 'react';
import axios from 'axios';
import {
  Heading, Box, Input, FormControl, FormLabel, Button,
} from '@chakra-ui/react';

import { useFormik } from 'formik';

export default function Login({ setVerification }) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    onSubmit: (values) => {
      // on submit will send a post request to database to register the user
      const userDetails = {
        email: values.email,
        password: values.password,
      };
      axios.post('/verifyUser', userDetails)
        .then((response) => {
          console.log(response.data);
          if (!response.data.verifiedUser) {
            console.log('error- verification is wrong');
          }
          setVerification((verified) => verified = true);
        }).catch((error) => console.log(error));
    },
  });

  return (
    <>
      <Heading> Login</Heading>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input name="email" type="email" variant="filled" value={formik.values.email} onChange={formik.handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input name="password" type="password" variant="filled" value={formik.values.password} onChange={formik.handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal" isFullWidth>
            Login
          </Button>
        </form>
      </Box>
    </>

  );
}