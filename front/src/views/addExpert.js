import { Fragment,useState } from 'react'
import { Link } from 'react-router-dom'
import { useSkin } from '@hooks/useSkin'
import InputPasswordToggle from '@components/input-password-toggle'
import { CardTitle, Card, CardHeader, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
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
     axios.post('http://localhost:8080/api/auth/signupExprt',dataPost)
     .then((res)=>{
      let path = `/compte`; 
      history.push(path);
  })
     .catch(err=>console.log(err));
    }
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle style={{fontSize:"300%"}}>Ajouter Expert</CardTitle>
        </CardHeader>
        <CardBody>
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
              Ajouter Expert
              </Button.Ripple>
            </Form>
            </CardBody>
      </Card>
    </div>
  )
}

export default RegisterV2
