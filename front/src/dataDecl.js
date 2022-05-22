import { saveAs } from 'file-saver'
import {
  Button,
} from 'reactstrap'

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
      return (
        <div className='d-flex'>
        <Button style={{marginRight:"20px"}} color='primary' onClick={async(event) => {
          event.preventDefault(event);
          saveAs(`http://localhost:8080/uploads/`+row.url, row.ur) 
        }}>Télécharger</Button>
        </div>
      )
    }
  }
]
