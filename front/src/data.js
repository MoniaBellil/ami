import {
  Button,
} from 'reactstrap'
import { saveAs } from 'file-saver'
import { Container } from './component/Container';
import axios from 'axios'
const triggerText = "Ajouter à l'expert";
import { useHistory } from "react-router-dom";

// ** Table Zero Config Column
export const basicColumns = [
  {
    name: 'Nom',
    selector: 'nom',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Prénom',
    selector: 'prenom',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'E-mail',
    selector: 'email',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Matricule',
    selector: 'matricule',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Adresse',
    selector: 'adresse',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Téléphone',
    selector: 'telephone',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Commentaire',
    selector: 'Commentaire',
    sortable: true,
    maxWidth: '10%'
  }
]

// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>City:</span> {data.Nom}
      </p>
      <p>
        <span className='font-weight-bold'>Experience:</span> {data.Adresse}
      </p>
      <p className='m-0'>
        <span className='font-weight-bold'>Post:</span> {data.Matricule}
      </p>
    </div>
  )
}

// ** Table Common Column
export const columns = [
  {
    name: 'Nom',
    selector: 'nom',
    sortable: true,
    maxWidth: '5%'
  },
  {
    name: 'Prénom',
    selector: 'prenom',
    sortable: true,
    maxWidth: '5%'
  },
  {
    name: 'E-mail',
    selector: 'email',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Matricule',
    selector: 'matricule',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Date',
    selector: 'date',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Adresse',
    selector: 'adresse',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Téléphone',
    selector: 'telephone',
    sortable: true,
    maxWidth: '8%'
  },
  {
    name: 'Commentaire',
    selector: 'Commentaire',
    sortable: true,
    maxWidth: '10%'
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell:  row => {
      const history = useHistory();
      const user= JSON.parse(localStorage.getItem('userData'));
      if(user.roles[0]=="ROLE_CLIENT")
      return (
        <div>
        <Button color='primary' style={{marginRight:"20px"}} onClick={async(event) => {
          event.preventDefault(event);
          let path = `/listeFile`; 
          localStorage.setItem('idDecl',row._id)
          history.push(path);
        }}>Fichier</Button>
        <Button color='primary' style={{marginRight:"20px"}} onClick={async(event) => {
          event.preventDefault(event);
          
          if(row.devis.length>0){
            axios.get('http://localhost:8080/api/getDevis/'+row.devis[0]).then((res)=>{ 
              saveAs('http://localhost:8080/uploads/'+res.data.url, res.data.url)
            })
           .catch(err=>console.log(err));
          }
          else
          {
            let path = `/addevis`;
            localStorage.setItem('idDecl',row._id)
            history.push(path); 
          }
        }}>Devis</Button>
        {row.rapport.length>0 ? (
        <Button color='primary' onClick={
          async(event) => 
          { 
            axios.get('http://localhost:8080/api/download/'+row._id).then((res)=>{ 
              saveAs('http://localhost:8080/uploads/'+row.rapport[0].url, row.rapport[0].url)
              window.location.reload() 
            })
           .catch(err=>console.log(err));
            
          }
        }>Rapport</Button>
      ) : (
        <div></div>
      )}
        </div>
      )
      else if(user.roles[0]=="ROLE_RESPONSABLE")
      return (
        <Container triggerText={triggerText} onSubmit={async(event) => {
          event.preventDefault(event);
          const data={
            "id":row._id,
            "expert":event.target.expert.value
          }
          axios.post("http://localhost:8080/api/decl/update",data).then((res)=>{
            window.location.reload(false);
        })
           .catch(err=>console.log(err));
        }} />
      )
      else
      return (
        <Button color='primary' onClick={async(event) => {
          event.preventDefault(event);
          let path = `/addRapport`; 
          localStorage.setItem('idDecl',row._id)
          history.push(path);
        }} >Ajouter un rapport</Button>
      )
    }
  }
]

// ** Table Server Side Column
export const serverSideColumns = [
  {
    name: 'Full Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '225px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Position',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Office',
    selector: 'city',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Start Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '150px'
  }
]

// ** Table Adv Search Column
export const advSearchColumns = [
  {
    name: 'Name',
    selector: 'full_name',
    sortable: true,
    minWidth: '200px'
  },
  {
    name: 'Email',
    selector: 'email',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'Post',
    selector: 'post',
    sortable: true,
    minWidth: '250px'
  },
  {
    name: 'City',
    selector: 'city',
    sortable: true,
    minWidth: '150px'
  },
  {
    name: 'Date',
    selector: 'start_date',
    sortable: true,
    minWidth: '150px'
  },

  {
    name: 'Salary',
    selector: 'salary',
    sortable: true,
    minWidth: '100px'
  }
]

export default ExpandableTable
