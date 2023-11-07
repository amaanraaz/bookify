import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/firebase'
import BookCard from './BookCard';
import CardGroup from 'react-bootstrap/CardGroup';

const Homepage = () => {
    const firebase = useFirebase();
    const[books,setBooks] = useState([]);
    useEffect(()=>{
        firebase.listAllBooks().then(books=>setBooks(books.docs))
    },[])
    // console.log(books[0].data());
  return (
    <CardGroup>
        {
            books.map((book,index)=>{
                return <BookCard {...book.data()} key={index} />
            })
        }
    </CardGroup>
  )
}

export default Homepage