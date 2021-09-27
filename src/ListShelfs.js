import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'

class ListShelfs extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelfs: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
  }
  render() {
    const { books, shelfs, changeBookShelf } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf) => (
              <Shelf
                shelf={shelf}
                books={books.filter(book => book.shelf === shelf.id )}
                shelfs={shelfs}
                key={shelf.id}
                changeBookShelf={changeBookShelf}
              />
            ))}
          </div>
        </div>
        <Link
          to='/search'
          className='open-search'
        ><button>Add a book</button></Link>
      </div>
    )
  }
}

export default ListShelfs
