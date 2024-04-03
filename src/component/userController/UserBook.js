import React,{ useState,useEffect} from "react";
import axios from "../utils/axios";
import { useCookies } from "react-cookie";
import "./User.css";
import laplanh from "../asset/laplanh.jpg";
import { Button } from "@mui/material";
const BOOKS_URL = "/books";



const UserBook = () => {

  const [books, setBooks] = useState([]);
  const [cookies, setCookie] = useCookies();

  useEffect(() => {
   
     axios
      .get(BOOKS_URL, {
        headers: {
          Authorization: "Bearer " + cookies.accessToken,
        },
      })
      .then(function (response) {
        console.log(response.data)
        setBooks(response.data);
        
      })
      .catch(function (error) {
        console.log(error);
      });
  },[]);

  return (
    <div className="card-book">
      {books.map((book) => (
      <div className="container" key={book.bookID}>
        <div className="subcontent">
          <div className="card-image">
            <img src={book.image} className="image"></img>
          </div>
          <div className="description" style={{ textAlign:"center"}}>
            <div className="description-container">
              <h4 className="book-title" style={{marginTop:-8}}>{book.title}</h4>
              <hr></hr>
              <span className="book-author" style={{fontSize:13}}>{book.author}</span>
            </div>
          </div>
          <Button className="button" >Detail</Button>
          <p className="category">
                {book.category}
              </p>
        </div>
      </div>
       ))}
    </div>
  );
};

export default UserBook;
