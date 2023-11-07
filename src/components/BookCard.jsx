import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/firebase';

const BookCard = (props) => {
  const firebase = useFirebase();
  const [url,setUrl]= useState(null)
  useEffect(()=>{
    firebase.getImageUrl(props.imageURL).then((url)=>setUrl(url));
  },[])
  return (
    <Card style={{ width: '18rem',margin:'25px'}}>
      <Card.Img variant="top" src={url} style={{ width: '16rem',height:'18rem'}} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          {
            props.price
          }
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  )
}

export default BookCard