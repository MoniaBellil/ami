import classnames from 'classnames'
import Avatar from '@components/avatar'
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col, Media } from 'reactstrap'
import { Home,User,Settings,Download ,FolderPlus,File} from 'react-feather'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory,faBullhorn } from '@fortawesome/free-solid-svg-icons'
const StatsCard = ({ cols }) => {
  const data = [
    {
      title: '1000',
      subtitle: 'Réclamation',
      color: 'light-primary',
      icon: <FontAwesomeIcon icon={faBullhorn} />,
    },
    {
      title: '2000',
      subtitle: 'Rapport',
      color: 'light-info',
      icon: <FolderPlus size={20} />,
    },
    {
      title: '5',
      subtitle: 'Expert',
      color: 'light-danger',
      icon: <User size={100} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const margin = Object.keys(cols)
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin[0]}-0`]: index !== data.length - 1
          })}
        >
          <Media>
            <Avatar color={item.color} icon={item.icon} className='mr-2' />
            <Media className='my-auto' body>
              <h1>{item.title}</h1>
              <h5>{item.subtitle}</h5>
            </Media>
          </Media>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistiques</CardTitle>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
