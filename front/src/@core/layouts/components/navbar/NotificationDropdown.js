// ** React Imports
import { Fragment, useState,useEffect, forwardRef } from 'react'
import axios from 'axios'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { Bell, X, Check, AlertTriangle } from 'react-feather'
import {
  Button,
  Badge,
  Media,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown
} from 'reactstrap'
import { useHistory } from "react-router-dom";
const NotificationDropdown = () => {
  const history = useHistory();
  const[title,setTitle]=useState('"Nouvelle declaration"')
  useEffect(async () => {
    const user= JSON.parse(localStorage.getItem('userData'));
    var reponse;
    if(user)
    {if(user.roles[0]=="ROLE_CLIENT")
      {
        setTitle('"Nouvelle rapport"')
        reponse=await axios.get('http://localhost:8080/api/declClient/'+user.id);
        console.log(title)
      }
    else if(user.roles[0]=="ROLE_RESPONSABLE")
      reponse=await axios.get('http://localhost:8080/api/decl');
    else 
      reponse=await axios.get('http://localhost:8080/api/declExpert/'+user.id);
    if(index==1)
    {
      setData(reponse.data)
      index++
    }}
    else
      setData([])
  },[data,title]);
  const [data, setData] = useState([])
    let index=1;
  // ** Function to render Notifications
  /*eslint-disable */
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component='li'
        className='media-list scrollable-container'
        options={{
          wheelPropagation: false
        }}
      >
        {data.map((item, index) => {
          return (
            <a key={index} className='d-flex'  onClick={e => {
              e.preventDefault()
                let path = `/Déclaration`; 
                history.push(path);
              }}>
              <Media
                className={classnames('d-flex', {
                  'align-items-start': !item.nom,
                  'align-items-center': item.nom
                })}
              >
                {!item.switch ? (
                  <Fragment>
                    <Media left>
                    {title}
                    </Media>
                    <Media body>
                    {item.nom} {item.prenom}
                    </Media>
                  </Fragment>
                ) : (
                  <Fragment>
                    
                  </Fragment>
                )}
              </Media>
            </a>
          )
        })}
      </PerfectScrollbar>
    )
  }
  /*eslint-enable */
  return (
    <UncontrolledDropdown tag='li' className='dropdown-notification nav-item mr-25'>
      <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
        <Bell size={21} />
        <Badge pill color='danger' className='badge-up'>
        {data.length}
        </Badge>
      </DropdownToggle>
      <DropdownMenu tag='ul' right className='dropdown-menu-media mt-0'>
        <li className='dropdown-menu-header'>
          <DropdownItem className='d-flex' tag='div' header>
            <h4 className='notification-title mb-0 mr-auto'>Notifications</h4>
            <Badge tag='div' color='light-primary' pill>
              {data.length} Nouvelle
            </Badge>
          </DropdownItem>
        </li>
        {renderNotificationItems()}
        <li className='dropdown-menu-footer'>
          <Button.Ripple color='primary' onClick={async(event) => {
            event.preventDefault(event);
            let path = `/Déclaration`; 
            history.push(path);
          }} block>
          lire toute les déclarations
          </Button.Ripple>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default NotificationDropdown
