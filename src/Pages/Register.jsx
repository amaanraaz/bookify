import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/firebase';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const firebase = useFirebase();
    console.log(firebase);
    const navigate = useNavigate();

    const[email,setEmail] = useState('');
    const[password,setPassword] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log("creating a new user");
        await firebase.signupUserWithEmailAndPassword(email,password);
        console.log("Success");
    }
    useEffect(()=>{
        if(firebase.isLoggedIn){
            navigate('/')
        }
    },[firebase,navigate])

  return (
    <div className='container m-5'>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={e=>setEmail(e.target.value)} value={email} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} value={password} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Account
      </Button>
    </Form>
    </div>
  )
  };
export default Register