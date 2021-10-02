import React from 'react'
import debounce from 'lodash.debounce'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
  }

  state = {
    searchBooks: []
  }

  queryChangeDebounced = debounce((q) => {
        this.queryChange(q)
    }, 250)

  componentWillUnmount() {
    this.queryChangeDebounced.cancel();
  }

  queryChange(query) {
    if (query) {
      BooksAPI.search(query)
        .then((books) => {
          if (!('error' in books)) {
            for(let book of books){
              let index = this.props.books.findIndex( el => el.id === book.id);
              if (index >= 0) {
                book.shelf = this.props.books[index].shelf;
              }
            }
            this.setState(()=>({
              searchBooks: [...books]
            }))
          }
        })
    } else {
      this.clearResults();
    }
  }

  clearResults() {
    this.setState(() => ({
      searchBooks: []
    }))
  }

  render() {
    const { searchBooks } = this.state;
    const { shelfs, changeBookShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className='close-search'
            to='/'>
              Close
          </Link>

          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Press Enter to search by title or author"
              onChange={(event) => this.queryChangeDebounced(event.target.value)}
              />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelfs={shelfs}
                  changeBookShelf={changeBookShelf}
                />
              </li>
            ) )}
          </ol>
        </div>
      </div>
    )
  }
}

export default  SearchBooks
