import React, { useState } from 'react'
import Container from '../core/Container'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Login } from '../../utils/validationschema'
import styles from '../../styles/Login.module.scss'
import { MdOutlineEmail, MdPassword } from 'react-icons/md'
import { BiHide, BiShow } from 'react-icons/bi'
import classnames from 'classnames'
import Link from 'next/link'
const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(Login) })
  const onSubmit = (data) => {
    console.log(data)
  }

  const [toggle, setToggle] = useState(true)
  const togglePassword = () => setToggle(!toggle)
  const conStyle = {
    padding: '2rem'
  }
  return (
    <>
      <div className='card'>
        <div className='card-content'>
          <Container customStyle={conStyle}>
            <h1 className='mb-6'>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
              <div className='field'>
                <div className='control has-icons-left has-icons-right'>
                  <input className='input' type='email' placeholder='Email' {...register('email')} />
                  {errors.email?.message && <p className='help is-danger'>{errors.email.message}</p>}
                  <span className='icon is-small is-left'>
                    <MdOutlineEmail />
                  </span>
                </div>
              </div>
              <div className='field'>
                <div className='control has-icons-left has-icons-right '>
                  <input className='input' type={toggle ? 'password' : 'text'} placeholder='Password' {...register('password')} />

                  {errors.password?.message && <p className='help is-danger'>{errors.password.message}</p>}
                  <span className='icon is-small is-left'>
                    <MdPassword />
                  </span>
                  <span className={classnames({ icon: true, 'is-small': true, ' is-right': true, [styles.clicky]: true })} onClick={() => { togglePassword() }}>
                    {!toggle ? <BiHide /> : <BiShow />}
                  </span>
                </div>

              </div>
              <button type='submit' className='button is-success is-align-self-flex-end mb-3 mt-2'>Login</button>
            </form>
            <p className='my-4'>Dont have an account? </p>
            <a className='button is-warning'><Link href='/register'>Register</Link></a>

          </Container>
        </div>
      </div>
    </>
  )
}

export default LoginForm
