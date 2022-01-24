import React from 'react'
import LoginForm from '../components/forms/Login'
import Layout from '../components/Layout'
import Container from '../components/core/Container'

const loginStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 'auto'
}

const Login = () => {
  return (
    <Container customStyle={loginStyle}>
      <LoginForm />
    </Container>
  )
}

export default Login

Login.getLayout = (page) => <Layout title='Login'>{page}</Layout>