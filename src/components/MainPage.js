import React, { useState, useEffect } from "react";
import * as BooksAPI from "../BooksAPI";
import "../App.css";
import Header from "./Header";
import Shelves from "./Shelves";
import { Link } from "react-router-dom";

const BooksApp = () => {
  const [books, setBooks] = useState([]);
  const [mapBooks, setMapBooks] = useState(new Map());
  const [findBooks, setFindBooks] = useState([]);
  const [mBook, setMbooks] = useState([]);

  const [q, setQ] = useState("");

  useEffect(() => {
    BooksAPI.getAll().then((data) => {
      setBooks(data);
      setMapBooks(createMapOfBooks(data));
    });
  }, []);

  useEffect(
    () => {
      let isActive = true;
      if (q) {
        BooksAPI.search(q).then((data) => {
          if (data.error) {
            setFindBooks([]);
          } else {
            if (isActive) {
              setFindBooks(data);
            }
          }
        });
      }
      return () => {
        isActive = false;
      };
    },
    [q]
  );
  useEffect(
    () => {
      const combined = findBooks.map((book) => {
        if (mapBooks.has(book.id)) {
          return mapBooks.get(book.id);
        } else {
          return book;
        }
      });
      setMbooks(combined);
    },
    [findBooks]
  );

  const createMapOfBooks = (books) => {
    const map = new Map();
    books.map((book) => map.set(book.id, book));
    return map;
  };
  const updateShelf = (book, whereTo) => {
    // console.log(book);
    // console.log(whereTo);
    const updatedBooks = books.map((b) => {
      if (b.id === book.id) {
        b.shelf = whereTo;
        return book;
      }
      return b;
    });
    setBooks(updatedBooks);
    BooksAPI.update(book, whereTo);
  };

  return (
    <div className="app">
      {/*main page*/}

      <div className="list-books">
        <Header />
        <div className="list-books-content">
          <Shelves books={books} updateShelf={updateShelf} />
        </div>

        <div className="open-search">
          <Link to="/search">
            <button>Add a book</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksApp;
