import { User } from 'react-feather'
import Avatar from '@components/avatar'
import { Card, CardBody, CardText } from 'reactstrap'
import decorationLeft from '@src/assets/images/elements/decore-left.png'
import decorationRight from '@src/assets/images/elements/decore-right.png'
import { Fragment, useState,useEffect, forwardRef } from 'react'
const CardCongratulations = () => {
  useEffect(async () => {
    const user= JSON.parse(localStorage.getItem('userData'));
    if(index==1)
    {
      setData(user)
      index++
    }
  },[data]);
  const [data, setData] = useState([])
    let index=1;
  return (
    <Card className='card-congratulations'>
      <CardBody className='text-center'>
        <img className='congratulations-img-left' src={decorationLeft} alt='decor-left' />
        <img className='congratulations-img-right' src={decorationRight} alt='decor-right' />
        <Avatar icon={<User size={28} />} className='shadow' color='primary' size='xl' />
        <div className='text-center'>
          <h1 className='mb-1 text-white'>Bienvenue {data.nom},</h1>
        </div>
      </CardBody>
    </Card>
  )
}

export default CardCongratulations
