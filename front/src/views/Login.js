import { useSkin } from '@hooks/useSkin'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import { handleLogin } from "../redux/actions/auth/index";
import '@styles/base/pages/page-auth.scss'
import themeConfig from '@configs/themeConfig'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [skin, setSkin] = useSkin()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history=useHistory();
  const submitHandler = async(e) => {
    e.preventDefault();
    await dispatch(handleLogin(email, password));
    history.push("/");
  };
  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
          
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              <Link  to='/'>
                <img src={themeConfig.app.appLogoImage} alt='logo' width="50%" />
              </Link>
            <br/>
              Bienvenue chez AMI Assurances ! 👋
            </CardTitle>
            <Form className='auth-login-form mt-2' onSubmit={submitHandler}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input type='email' id='login-email' placeholder='john@example.com' autoFocus value={email}
                onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                      Mot de passe
                  </Label>
                  <Link to='/'>
                    <small>Mot de passe oublié?</small>
                  </Link>
                </div>
                <InputPasswordToggle className='input-group-merge' id='login-password'value={password}
                onChange={(e) => setPassword(e.target.value)}/>
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button color='primary' >
                Sign in
              </Button>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Nouveau sur notre plateforme?</span>
              <Link to='/register'>
                <span>Créer un compte</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
