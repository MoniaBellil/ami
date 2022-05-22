import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import Axios from "axios";
import { useState } from 'react'
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
const Home = () => {
    const history = useHistory();
    const [photo, setPhoto] = useState(null);
    const[Nom,setNom]=useState('')
    const [email, setEmail] = useState('');
    const[Prenom,setPrenom]=useState('')
    const [Telephone, setTelephone] = useState('');
    const[Adresse,setAdresse]=useState('')
    const [Matricule, setMatricule] = useState('');
    const[DateAjout,setDateAjout]=useState(new Date());
    const [Commentaire, setCommentaire] = useState('');
    const upload= e =>{
        e.preventDefault()
      const data =new FormData();
       data.append("Nom",Nom)
       data.append("email",email)
       data.append("Prenom",Prenom)
       data.append("Telephone",Telephone)
       data.append("Matricule",Matricule)
       data.append("Date",DateAjout)
       data.append("Commentaire",Commentaire)
       data.append("Adresse",Adresse)
       const reponse= JSON.parse(localStorage.getItem('userData'));
       data.append("userId",reponse.id)
      for(const element of photo){
        data.append('uploaded_Image', element)
      }
      console.log(data)
        Axios.post('http://localhost:8080/api/decl',data)
       .then((res)=>{
        let path = `/Déclaration`; 
        history.push(path);
    })
       .catch(err=>console.log(err));
    
       
      }
  return (
    <div>

      <Card>
        <CardHeader>
          <CardTitle style={{fontSize:"300%"}}>Ajouter Réclamation</CardTitle>
        </CardHeader>
        <CardBody>
        <form style={{margin : "5%"}} onSubmit={upload} encType="multipart/form-data" >
        <div style={{marginBottom : "2%"}}  className="row"> 
            <div className="col">
                <input className="form-control" onChange={e=>{setNom(e.target.value)}} type="text" placeholder="Nom"  />
            </div>
            <div className="col">
                <input className="form-control" onChange={e=>{setPrenom(e.target.value)}} type="text" placeholder="Prénom"  />
            </div>
        </div>
        <div  style={{marginBottom : "2%"}}className="row">
            <div className="col">
                <PhoneInput className="form-control" placeholder="Téléphone" value={Telephone} onChange={setTelephone}/>
            </div> 
            <div className="col">
                <input className="form-control" onChange={e=>{setEmail(e.target.value)}} type="email" placeholder="E-mail"  />
            </div> 
        </div>
        <div style={{marginBottom : "2%"}} className="row">
            <div className="col">
                <input className="form-control" onChange={e=>{setAdresse(e.target.value)}} type="text" placeholder="Adresse" />
            </div> 
            <div className="col">
                <DatePicker className="form-control" selected={DateAjout} onChange={(date:Date) => setDateAjout(date)}  />
            </div> 
        </div>
        <div  style={{marginBottom : "2%"}}className="row">
            <div className="col">
                <input className="form-control" onChange={e=>{setMatricule(e.target.value)}}  type="text" placeholder="Matricule"  />
            </div> 
            <div className="col">
                <textarea className="form-control" onChange={e=>{setCommentaire(e.target.value)}}  placeholder='Commentaire'  />
            </div> 
        </div>
        <div  style={{marginBottom : "2%"}}className="mb-3">
            <b><h1>Fichier joints</h1></b>
        </div>
        <div  style={{marginBottom : "2%"}}className="row">
        <div className="col">
                <b><h3><FontAwesomeIcon icon={faDownload} /> Fichier joints</h3></b>
            </div> 
            <div className="col">
                <input className="form-control" type="file" title='Photo' filename="uploaded_Image" multiple  onChange={e => {setPhoto(e.target.files)}}/>
            </div>
            </div>
        <center>
        <div  className="row">
            <div className="col">
                <input className="btn btn-primary" type="submit" value="Enregistrer" />
                <input className="btn btn-primary" style={{marginLeft:"2%"}} type="reset" value="Annuler" />
            </div> 
        </div>
        </center>
    </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Home
