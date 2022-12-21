import {BsFillStarFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'

import './index.css'

const BooksCard = props => {
  const {eachBook} = props
  const {id, title, coverPic, rating, authorName, readStatus} = eachBook

  return (
    <li className="book-list-item">
      <Link to={`/books/${id}`} m className="book-link-item">
        <img src={coverPic} className="book-cover-pic" alt={title} />
        <div className="book-details-text-container">
          <h1 className="book-title">{title}</h1>
          <p className="book-author-name">{authorName}</p>
          <div className="rating-container">
            <p className="book-rating">Avg Rating</p>
            <BsFillStarFill fill="yellow" className="star-icon" />
            <p className="book-rating">{rating}</p>
          </div>
          <p className="book-status">
            Status : <span className="book-status-text">{readStatus}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default BooksCard
