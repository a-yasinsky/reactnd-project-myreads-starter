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
    console.log(book.title, newShelf);
    this.setState((currState) => ({
      books: currState.books.filter(currBook => {
        if (currBook.id === book.id) {
          currBook.shelf = newShelf;
        }
        return currBook.shelf !== EMPTY_SHELF_ID;
      })
    }))
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
          <SearchBooks />
        )} />
      </div>

    )
  }
}

export default BooksApp
