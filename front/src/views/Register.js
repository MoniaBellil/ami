import { Fragment,useState } from 'react'
import { Link } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, CustomInput, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import themeConfig from '@configs/themeConfig'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { useHistory } from "react-router-dom";
import axios from 'axios'
const RegisterV2 = () => {
  const [skin, setSkin] = useSkin()
  const history = useHistory();
  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default
    const[Nom,setNom]=useState('')
    const [email, setEmail] = useState('');
    const[Prenom,setPrenom]=useState('')
    const [Telephone, setTelephone] = useState('');
    const[Password,setPassword]=useState('')
    const save= e =>{
      e.preventDefault()
    const dataPost ={
      "nom":Nom,
      "email":email,
      "prenom":Prenom,
      "telephone":Telephone,
      "password":Password
    };
     axios.post('http://localhost:8080/api/auth/signup',dataPost)
     .then((res)=>{
      let path = `/login`; 
      history.push(path);
  })
     .catch(err=>console.log(err));
    }
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
            <Form className='auth-register-form mt-2' >
              <FormGroup>
                <Label className='form-label' for='register-nom'>
                  Nom
                </Label>
                <Input type='text' onChange={e=>{setNom(e.target.value)}} id='register-nom' placeholder='nom' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-prenom'>
                  Prénom
                </Label>
                <Input type='text' onChange={e=>{setPrenom(e.target.value)}} id='register-prenom' placeholder='prénom' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-username'>
                  Téléphone
                </Label>
                <PhoneInput className="form-control" placeholder="Téléphone" value={Telephone} onChange={setTelephone} />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-email'>
                  Email
                </Label>
                <Input type='email' onChange={e=>{setEmail(e.target.value)}} id='register-email' placeholder='john@example.com' />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='register-password'>
                  Password
                </Label>
                <InputPasswordToggle onChange={e=>{setPassword(e.target.value)}} className='input-group-merge' id='register-password' />
              </FormGroup>
              <br/>
              <Button.Ripple color='primary' block onClick={save}>
                S'inscrire
              </Button.Ripple>
            </Form>
            <p className='text-center mt-2'>
              <span className='mr-25'>Vous avez déjà un compte?</span>
              <Link to='/login'>
                <span>S'identifier</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default RegisterV2
