import {
  Anchor,
  Button,
  Center,
  Container,
  Group,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
  Title
} from '@mantine/core'
import { useBooleanToggle, useForm } from '@mantine/hooks'
import { useNotifications } from '@mantine/notifications'
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useState } from 'react'
import { BiCheck, BiError } from 'react-icons/bi'
import useProfile from '../../services/hooks/useProfile'
import RegisterForm from './Register'

const LoginForm = () => {
  const [loading, setLoading] = useState(false)
  const notifications = useNotifications()
  const [type, toggle] = useBooleanToggle(true)
  const { Login } = useProfile()
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },
    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value),
      password: (value) =>
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(
          value
        )
    },
    errorMessages: {
      email: 'Vänligen ange ett giltigt mailadress',
      password:
        'Lösenordet måste innehålla minst en stor bokstav, en liten bokstav , en siffra och en speciell tecken'
    }
  })
  const handleSubmit = (data) => {
    setLoading(true)
    Login(data)
      .then((res) => {
        setLoading(false)
        notifications.showNotification({
          color: 'green',
          message: res.data.message,
          icon: <BiCheck />
        })
      })
      .catch((error) => {
        notifications.showNotification({
          message: error.response.data.error,
          color: 'red',
          icon: <BiError />
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Container my="lg" sx={{ width: '90%' }}>
      <LoadingOverlay visible={loading} />
      <Center p="lg" mb="md">
        <Title>{type ? 'Logga in' : 'Skapa Konto '}</Title>
      </Center>
      {type ? (
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            mt="md"
            required
            placeholder="Mailadress"
            label="Mailadress"
            type="email"
            icon={<FaEnvelope />}
            {...form.getInputProps('email')}
          />

          <PasswordInput
            mt="md"
            required
            placeholder="Lösenord"
            label="Lösenord"
            icon={<FaLock />}
            {...form.getInputProps('password')}
          />
          <Group position="apart" mt="xl">
            <Text>
              Inget Konto?{' '}
              <Anchor
                component="button"
                type="button"
                size="md"
                onClick={() => toggle()}
              >
                Registera dig
              </Anchor>
            </Text>
            <Button color="blue" type="submit" aria-label="Logga in">
              Logga in
            </Button>
          </Group>
        </form>
      ) : (
        <RegisterForm toggle={toggle} />
      )}
    </Container>
  )
}

export default LoginForm
