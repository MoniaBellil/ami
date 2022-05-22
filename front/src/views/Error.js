import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload} from '@fortawesome/free-solid-svg-icons'
const Home = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = async (data) => {
      //await api.post("/api/recls",data);
      console.log(data);
    };
  return (
    <div>

      <Card>
        <CardHeader>
          <CardTitle style={{fontSize:"300%"}}>Ajouter Réclamation</CardTitle>
        </CardHeader>
        <CardBody>
        <form style={{margin : "5%"}} onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom : "2%"}}  className="row"> 
            <div className="col">
                <input className="form-control" type="text" placeholder="Nom" {...register("Nom", {required: true})} />
            </div>
            <div className="col">
                <input className="form-control" type="text" placeholder="Prénom" {...register("Prénom", {required: true})} />
            </div>
        </div>
        <div  style={{marginBottom : "2%"}}className="row">
            <div className="col">
                <input className="form-control" type="tel" placeholder="Téléphone" {...register("Téléphone", {required: true, maxLength: 8})} />
            </div> 
            <div className="col">
                <input className="form-control" type="email" placeholder="E-mail" {...register("E-mail", {required: true})} />
            </div> 
        </div>
        <div style={{marginBottom : "2%"}} className="row">
            <div className="col">
                <input className="form-control" type="text" placeholder="Adresse" {...register("Adresse", {required: true})} />
            </div> 
            <div className="col">
                <input className="form-control" type="datetime" placeholder="Date" {...register("Date", {required: true})} />
            </div> 
        </div>
        <div  style={{marginBottom : "2%"}}className="row">
            <div className="col">
                <input className="form-control" type="text" placeholder="Matricule" {...register("Matricule", {required: true})} />
            </div> 
            <div className="col">
                <textarea className="form-control" placeholder='Commentaire' {...register("Commentaire", {})} />
            </div> 
        </div>
        <div  style={{marginBottom : "2%"}}className="mb-3">
            <b><h1>Fichier joints</h1></b>
        </div>
        <div  style={{marginBottom : "2%"}}className="row">
        <div className="col">
                <b><h3><FontAwesomeIcon icon={faDownload} /> Photo</h3></b>
            </div> 
            <div className="col">
                <input className="form-control" type="file" title='Photo' {...register("photo")} />
            </div>
            </div>
            <div style={{marginBottom : "2%"}}className="row">
            <div className="col">
                <b><h3><FontAwesomeIcon icon={faDownload} /> Constat</h3></b>
            </div>  
            <div className="col">
                <input className="form-control" type="file" {...register("constat")} />
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
