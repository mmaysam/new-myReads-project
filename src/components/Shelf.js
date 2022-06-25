import React from "react";
import Book from "./Book";
const Shelf = ({ books, name, updateBookShelf }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((theBook) => (
            <li key={theBook.id}>
              <Book book={theBook} bookShelf={updateBookShelf} />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
