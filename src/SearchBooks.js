import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBooks extends React.Component {
  state = {
    query: '',
    searchBooks: []
  }

  queryChange = (query) => {
    this.setState(()=>({
      query: query.trim()
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.query) {
      BooksAPI.search(this.state.query)
        .then((books) => {
          this.setState(()=>({
            searchBooks: [...books]
          }))
        })
    }
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
            <form onSubmit={this.handleSubmit}>
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.queryChange(event.target.value)}
                />
            </form>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {searchBooks.map(book => (
              <li key={book.id}>
                <Book
                  book={book}
                  shelfs={shelfs}
                  key={book.id}
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
