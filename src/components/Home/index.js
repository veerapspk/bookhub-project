import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import Navbar from '../Navbar'
import Footer from '../Footer'

import './index.css'

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
      },
    },
  ],
}

const apiStatus = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {
    ratedBooksList: [],
    homeApiStatus: apiStatus.initial,
    showError: false,
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({homeApiStatus: apiStatus.loading})
    const url = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        coverPic: each.cover_pic,
        title: each.title,
        authorName: each.author_name,
      }))

      this.setState({
        ratedBooksList: updatedData,
        homeApiStatus: apiStatus.success,
        showError: false,
      })
    } else {
      this.setState({homeApiStatus: apiStatus.success, showError: true})
    }
  }

  renderHomeDetails = () => (
    <div className="home-details-container">
      <h1 className="home-head">Find Your Next Favorite Books?</h1>
      <p className="home-description">
        You are in the right place. Tell us what titles or genres you have
        enjoyed in the past, and we will give you surprisingly insightful
        recommendations.
      </p>
      <Link className="find-link" to="/shelf">
        <button type="button" className="find-books-btn sm-btn">
          Find Books
        </button>
      </Link>
    </div>
  )

  renderSlider = () => {
    const {ratedBooksList} = this.state

    return (
      <Slider {...settings} className="slider">
        {ratedBooksList.map(each => (
          <div key={each.id}>
            <Link to={`/books/${each.id}`} className="slider-link">
              <div key={each.id} className="slider-img-container">
                {' '}
                <img
                  className="slider-img"
                  alt="top rated"
                  src={each.coverPic}
                />{' '}
                <h1 className="slider-title">{each.title}</h1>{' '}
                <h1 className="slider-author-name">{each.authorName}</h1>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    )
  }

  renderSuccessView = () => {
    const {showError} = this.state

    return (
      <div className="home-container">
        <div>
          {this.renderHomeDetails()}
          <div className="slider-container">
            <div className="slider-head-btn-container">
              <h1 className="home-head">Top Rated Books</h1>
              <Link className="lg-find-btn find-link" to="/shelf">
                <button type="button" className="find-books-btn">
                  Find Books
                </button>
              </Link>
            </div>
            {showError ? this.renderFailureView() : this.renderSlider()}
          </div>
        </div>
        {!showError && <Footer />}
      </div>
    )
  }

  renderResult = () => {
    const {homeApiStatus} = this.state
    switch (homeApiStatus) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.loading:
        return this.renderLoader()

      default:
        return null
    }
  }

  onFailureBtn = () => {
    this.getData()
  }

  renderLoader = () => (
    <div className="loader" testid="loader">
      <Loader type="TailSpin" color=" #0284c7" height={60} width={60} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
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

  render() {
    return (
      <div className="bg-container">
        <Navbar activeRoute="Home" />
        {this.renderResult()}
      </div>
    )
  }
}

export default Home
