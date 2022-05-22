import { Home,User,Settings,Download ,FolderPlus,File} from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory,faBullhorn } from '@fortawesome/free-solid-svg-icons'
let liste=[];
const reponse= JSON.parse(localStorage.getItem('userData'));
if(reponse)
{console.log(reponse.roles[0]=="ROLE_RESPONSABLE")
if(reponse.roles[0]=="ROLE_RESPONSABLE"){
  liste= [
    {
      id: 'Tableau',
      title: 'Tableau de bord',
      icon: <Home size={20} />,
      navLink: '/Tableau'
    },
    {
      id: 'profil',
      title: 'Mon profil',
      icon: <User size={20} />,
      navLink: '/profil'
    },
    {
      id: 'Déclaration',
      title: 'Déclaration',
      icon: <FontAwesomeIcon icon={faBullhorn} />,
      navLink: '/Déclaration'
    },
    {
      id: 'Compte',
      title: 'Mes experts',
      icon: <User size={20} />,
      navLink: '/compte'
    },
  ]
}else{
  liste= [
  {
    id: 'Tableau',
    title: 'Tableau de bord',
    icon: <Home size={20} />,
    navLink: '/Tableau'
  },
  {
    id: 'profil',
    title: 'Mon profil',
    icon: <User size={20} />,
    navLink: '/profil'
  },
  {
    id: 'Déclaration',
    title: 'Déclaration',
    icon: <FontAwesomeIcon icon={faBullhorn} />,
    navLink: '/Déclaration'
  },
];
}}
export default liste;
