import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';

const List = () => {
    const firebase = useFirebase();
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [isbn,setIsbn] = useState('');
    const [coverPic,setCoverPic] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        await firebase.handleCreateNewListing(name,price,isbn,coverPic)
    }
    
  return (
    <div>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Book Name</Form.Label>
        <Form.Control type="text" placeholder="Book name" onChange={e=>setName(e.target.value)} value={name} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Price</Form.Label>
        <Form.Control type="text" placeholder="Price" onChange={e=>setPrice(e.target.value)} value={price} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>IsBn</Form.Label>
        <Form.Control type="text" placeholder="ISBN " onChange={e=>setIsbn(e.target.value)} value={isbn} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Cover Pic</Form.Label>
        <Form.Control type="file"  onChange={e=>setCoverPic(e.target.files[0])} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>
    </div>
  )
}

export default List