import React from 'react';
import axios from 'axios';
import {
  Heading, Box, Input, FormControl, FormLabel, Button,
} from '@chakra-ui/react';

import { useFormik } from 'formik';

export default function Registration() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordAgain: '',
      username: '',
    },
    onSubmit: (values) => {
      // on submit will send a post request to database to register the user
      const userDetails = {
        email: values.email,
        password: values.password,
        username: values.username,
      };
      axios.post('/registerUser', userDetails)
        .then((response) => {
          console.log(response.data);
        });
    },
  });

  return (
    <>
      <Heading> Registration</Heading>
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <FormControl>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input name="email" type="email" variant="filled" value={formik.values.email} onChange={formik.handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="username">Username:</FormLabel>
            <Input name="username" type="text" variant="filled" value={formik.values.username} onChange={formik.handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password:</FormLabel>
            <Input name="password" type="password" variant="filled" value={formik.values.password} onChange={formik.handleChange} />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="passwordAgain">Retype password:</FormLabel>
            <Input name="passwordAgain" type="password" variant="filled" value={formik.values.passwordAgain} onChange={formik.handleChange} />
          </FormControl>
          <Button type="submit" colorScheme="teal" isFullWidth>
            Register
          </Button>
        </form>
      </Box>
    </>

  );
}
