import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import ListShelfs from './ListShelfs'
import  SearchBooks from './SearchBooks'

const EMPTY_SHELF_ID = 'none';

class BooksApp extends React.Component {
  state = {
    books: [],
    shelfs: []
  }

  changeBookShelf = (book, newShelf) => {
    let books = [...this.state.books];
    let index = books.findIndex( el => el.id === book.id);
    if (index >= 0) {
      books[index] = {...books[index], shelf: newShelf};
    } else {
      book.shelf = newShelf;
      books.push(book);
    }
    this.setState(() => ({
      books: books.filter(currBook => {
        return currBook.shelf !== EMPTY_SHELF_ID;
      })
    }));

    BooksAPI.update(book, newShelf);
  }

  componentDidMount() {
    BooksAPI.getShelfs()
      .then((shelfs) => {
        this.setState(() => ({
          shelfs: shelfs
        }))
      });
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }))
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListShelfs
            books={this.state.books}
            shelfs={this.state.shelfs}
            changeBookShelf={this.changeBookShelf}
          />
        )} />
        <Route path='/search' render={() => (
          <SearchBooks
          shelfs={this.state.shelfs}
          books={this.state.books}
          changeBookShelf={this.changeBookShelf}
          />
        )} />
      </div>

    )
  }
}

export default BooksApp
