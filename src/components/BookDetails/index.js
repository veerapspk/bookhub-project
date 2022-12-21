import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsFillStarFill} from 'react-icons/bs'

import Navbar from '../Navbar'
import Footer from '../Footer'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class BookDetails extends Component {
  state = {booksDetails: [], bookApiStatus: apiStatus.initial}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({bookApiStatus: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {id} = match.params
    const url = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const book = data.book_details
      const updatedBook = {
        id: book.id,
        title: book.title,
        coverPic: book.cover_pic,
        rating: book.rating,
        readStatus: book.read_status,
        aboutBook: book.about_book,
        aboutAuthor: book.about_author,
        authorName: book.author_name,
      }
      this.setState({
        booksDetails: updatedBook,
        bookApiStatus: apiStatus.success,
      })
    } else {
      this.setState({bookApiStatus: apiStatus.failure})
    }
  }

  getLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color=" #0284c7" height={60} width={60} />
    </div>
  )

  onFailureBtn = () => {
    this.getData()
  }

  getSuccessView = () => {
    const {booksDetails} = this.state
    console.log(booksDetails)
    const {
      title,
      rating,
      authorName,
      aboutAuthor,
      aboutBook,
      readStatus,
      coverPic,
    } = booksDetails
    return (
      <div className="book-details-main-container">
        <div className="book-details-card">
          <div className="book-details-responsive-container">
            <img
              src={coverPic}
              className="book-details-cover-pic"
              alt={title}
            />
            <div className="book-details-text-parent-container">
              <h1 className="book-title title-lg">{title}</h1>
              <p className="book-author-name  name-lg">{authorName}</p>
              <div className="rating-container">
                <p className="book-rating rating-lg">Avg Rating</p>
                <BsFillStarFill fill="yellow" className="star-icon lg-icon" />
                <p className="book-rating rating-lg">{rating}</p>
              </div>
              <p className="book-status status-lg">
                Status: <span className="book-status-text">{readStatus}</span>
              </p>
            </div>
          </div>
          <hr className="line" />
          <div className="book-details-description-section">
            <h1 className="book-details-description-head">About Author</h1>
            <p className="book-details-description">{aboutAuthor}</p>
            <h1 className="book-details-description-head">About Book</h1>
            <p className="book-details-description">{aboutBook}</p>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    )
  }

  getFailureView = () => (
    <div className="loader-container">
      <img
        alt="failure view"
        className="failure-img"
        src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670753247/Group_7522faulure_view_jzhpny.png"
      />
      <p className="failure-text">Something went wrong, Please try again.</p>
      <button onClick={this.onFailureBtn} className="logout-btn" type="button">
        Try Again
      </button>
    </div>
  )

  getResultView = () => {
    const {bookApiStatus} = this.state

    switch (bookApiStatus) {
      case apiStatus.success:
        return this.getSuccessView()
      case apiStatus.loading:
        return this.getLoader()
      case apiStatus.failure:
        return this.getFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <Navbar />
        {this.getResultView()}
      </div>
    )
  }
}

export default BookDetails
