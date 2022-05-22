import { Row, Col } from 'reactstrap'
import StatsCard from '@src/views/ui-elements/cards/statistics/StatsCard'
import CardCongratulations from '@src/views/ui-elements/cards/advance/CardCongratulations'
import '@styles/react/libs/charts/apex-charts.scss'
import '@styles/base/pages/dashboard-ecommerce.scss'
import MyChart from "./mychart";
import { Doughnut } from 'react-chartjs-2';
import { Card } from 'reactstrap'

const EcommerceDashboard = () => {
    const data = {
      labels: ['Incendie', 'Risques divers', 'Risques spéciaux', 'Transport', 'Groupe','Vie'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "#00b9f7",
            "#4790ff",
            "#7E73F1",
            "#7e73c8",
            "#7b00ff",
            '#5DD0E8',
          ],
          borderColor: [
            "#00b9f7",
            "#4790ff",
            "#7E73F1",
            "#7e73c8",
            "#7b00ff",
            '#5DD0E8',
          ],
          borderWidth: 1,
        },
      ],
    };
    
  return (
    <div id='dashboard-ecommerce'>
      <Row className='match-height'>
        <Col xs='12'>
          <CardCongratulations />
        </Col>
      </Row>
      <Row className='match-height'>
        <Col xs='12'>
          <StatsCard cols={{ xl: '3', sm: '6' }} />
        </Col>
      </Row>
      <Row>
        <Col lg='4' md='20'>
          <Card><Doughnut data={data} /></Card>
        
        </Col>
        <Col lg='8' md='12'>
          <Card>
            <MyChart />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default EcommerceDashboard
