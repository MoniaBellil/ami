import React, { useState} from "react";
import Axios from "axios";
import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
import { useHistory } from "react-router-dom";
const Home = () =>  {
    const history = useHistory();
    const [file, setFile] = useState(null);
    const upload= e =>{
        e.preventDefault()
        const data =new FormData();
        const name=localStorage.getItem('idDecl')
        data.append("id",name)
        for(const element of file) {
            data.append('uploaded_Image', element)
        }
        Axios.post('http://localhost:8080/api/decl/devis',data)
        .then((res)=>{
            localStorage.removeItem('idDecl')
            let path = `/Déclaration`; 
            history.push(path);
            window.location.reload()
        })
           .catch(err=>console.log(err));
    }
    return (
        <Card>
        <CardHeader>
          <CardTitle style={{fontSize:"300%"}}>Ajouter Devis</CardTitle>
        </CardHeader>
        <CardBody>
            <br/><br/><br/>
            <form onSubmit={upload} encType="multipart/form-data" >
            <div className="row">
                <div className="col">
                    <b><h3><FontAwesomeIcon icon={faDownload} /> Devis</h3></b>
                </div> 
                <div className="col">
                    <input className="form-control" type="file" title='Photo' onChange={e => {setFile(e.target.files);}} filename="uploaded_Image" />
                </div>
            </div>
            <br/><br/><br/>
                <button type="submit" className="btn btn-primary">Ajouter</button>     
            </form>
        </CardBody>
      </Card>
    );
}

export default Home
