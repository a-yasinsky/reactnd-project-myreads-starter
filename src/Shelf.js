import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Shelf extends React.Component {
  static propTypes = {
    shelf: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
  }
  render() {
    const { shelf, books, shelfs, changeBookShelf } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map(book => (
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

export default Shelf
