import { Edit, Trash } from 'react-feather'
import Axios from 'axios'
import { useHistory } from "react-router-dom";
// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>City:</span> {data.nom}
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
    name: 'nom',
    selector: 'nom',
    sortable: true,
    maxWidth: '30%'
  },
  {
    name: 'prenom',
    selector: 'prenom',
    sortable: true,
    maxWidth: '30%'
  },
  {
    name: 'email',
    selector: 'email',
    sortable: true,
    maxWidth: '30%'
  },
  {
    name: 'telephone',
    selector: 'telephone',
    sortable: true,
    maxWidth: '30%'
  },
  {
    name: 'Actions',
    allowOverflow: true,
    cell: row => {
      const history = useHistory();
      return (
        <div className='d-flex'>
          <Edit size={20}
          onClick={async(event) => {
            event.preventDefault(event);
            let path = `/edit`; 
            localStorage.setItem('idExpert',row._id)
            history.push(path);
          }} />
          <Trash size={20} onClick={async(event) => {
          event.preventDefault(event);
          const postaData={id:row._id}
          Axios.post('http://localhost:8080/api/deleteExpert',postaData)
          .then(
            (res)=>{
              window.location.reload() 
            })
            .catch(err=>console.log(err));
          
        }}/>
        </div>
      )
    }
  }
]


export default ExpandableTable
