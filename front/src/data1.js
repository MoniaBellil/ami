import { MoreVertical, Edit, FileText, Archive, Trash } from 'react-feather'
import Axios from 'axios'
import { useHistory } from "react-router-dom";
import { saveAs } from 'file-saver'
import {
  Button,
} from 'reactstrap'
// ** Expandable table component
const ExpandableTable = ({ data }) => {
  return (
    <div className='expandable-content p-2'>
      <p>
        <span className='font-weight-bold'>City:</span> {data.url}
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
    name: 'url',
    selector: 'url',
    sortable: true,
    maxWidth: '30%'
  },
  {
    name: 'Date d insertion',
    selector: 'createdAt',
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
        <Button style={{marginRight:"20px"}} color='primary' onClick={async(event) => {
          event.preventDefault(event);
          saveAs(`http://localhost:8080/uploads/`+row.url, row.ur) 
        }}>Télécharger</Button>
         
        <Trash  color='red' size={32} onClick={async(event) => {
          event.preventDefault(event);
          Axios.get('http://localhost:8080/rapport/'+row._id)
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
