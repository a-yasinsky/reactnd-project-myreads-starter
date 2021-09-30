import React from 'react'
import PropTypes from 'prop-types'
import ShelfChanger from './ShelfChanger'

class Book extends React.Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelfs: PropTypes.array.isRequired,
    changeBookShelf: PropTypes.func.isRequired,
  }

  onChangeBookShelf = (newShelf) => {
    this.props.changeBookShelf(this.props.book, newShelf)
  }

  render() {
    const { book, shelfs } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url('+book.imageLinks.thumbnail+')' }}></div>
          <ShelfChanger
            shelfs = {shelfs}
            activeShelf = {book.shelf || 'none'}
            onChangeBookShelf={this.onChangeBookShelf}
          />
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map((author, index) => (
          <div className="book-authors" key={index}>{author}</div>
        ))}
      </div>
    )
  }
}

export default Book
