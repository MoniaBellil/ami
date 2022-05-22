import React, { useState} from "react";
import Axios from "axios";
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
const Home = () =>  {
    const [file, setFile] = useState(null);
    const[name,setName]=useState('')
    const history = useHistory();
    const upload= e =>{
        e.preventDefault()
        const data =new FormData();
        const name=localStorage.getItem('idDecl')
        data.append("id",name)
        for(const element of file) {
            data.append('uploaded_Image', element)
        }
        for(var x = 0; x<file.length; x++) {
            data.append('uploaded_Image', file[x])
        }
        Axios.post('http://localhost:8080/rapport',data)
        .then((res)=>{
            let path = `/Déclaration`; 
            history.push(path);
            window.location.reload()
        }).catch(err=>console.log(err));
    }
    return (
        <Card>
        <CardHeader>
          <CardTitle style={{fontSize:"300%"}}>Ajouter Rapport</CardTitle>
        </CardHeader>
        <CardBody>
            <br/><br/><br/>
            <form onSubmit={upload} encType="multipart/form-data" >
            <div className="row">
                <div className="col">
                    <b><h3><FontAwesomeIcon icon={faDownload} /> Rapport</h3></b>
                </div> 
                <div className="col">
                    <input className="form-control" type="file" title='Photo' onChange={e => {setFile(e.target.files);}} filename="uploaded_Image" />
                </div>
            </div>
            <br/><br/><br/>
                <button type="submit" className="btn btn-primary">Déposer</button>     
            </form>
        </CardBody>
      </Card>
    );
}

export default Home
