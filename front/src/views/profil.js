import { Card, CardHeader, CardBody, CardTitle } from 'reactstrap'
import { useForm } from 'react-hook-form';
import { Fragment, useState,useEffect, forwardRef,useMemo } from 'react'
import axios from 'axios'

const Home = () => {
    const { register, reset, handleSubmit } = useForm({
      defaultValues: useMemo(() => {
        const reponse= JSON.parse(localStorage.getItem('userData'));
        return reponse;
      },)
    });
  
  const onSubmit = async (data) => {await axios.post("http://localhost:8080/api/updateProfile",data);};
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle style={{fontSize:"300%"}}>Mes informations personnelles</CardTitle>
        </CardHeader>
        <CardBody>
        <form style={{margin : "5%"}} onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
            <input className="form-control" type="text" placeholder="Nom *" {...register("nom", {required: true})} />
        </div>
        <div className="mb-3">
            <input className="form-control" type="text" placeholder="Prénom *" {...register("prenom", {required: true})} />
        </div>
        <div className="mb-3">
            <input className="form-control" type="text" placeholder="Téléphone *" {...register("telephone", {required: true})} />
        </div>
        <div className="mb-3">
            <input className="form-control" type="text" placeholder="E-mail *" {...register("email")} readOnly />
        </div>
        <center>
        <div className="row">
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
