import React from 'react'
import PropTypes from 'prop-types'

class ShelfChanger extends React.Component {
  static propTypes = {
    activeShelf: PropTypes.string.isRequired,
    shelfs: PropTypes.array.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired,
  }

  handleChange = (e) => {
    this.props.onChangeBookShelf(e.target.value);
  }

  render() {
    const { shelfs, activeShelf } = this.props;
    return (
      <div className="book-shelf-changer">
        <select onChange={this.handleChange} defaultValue={activeShelf}>
          <option value="move" disabled>Move to...</option>
          {shelfs.map(shelf => (
            <option
              value={shelf.id}
              key={shelf.id}
            >{shelf.name}</option>
          ))}
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}

export default ShelfChanger
