import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Navbar from '../Navbar'
import BooksCard from '../BooksCard'
import Footer from '../Footer'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class BookShelves extends Component {
  state = {
    activeTab: bookshelvesList[0].value,
    searchValue: '',
    isLoading: true,
    bookshelvesApiStatus: 'FAILURE',
    booksList: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({isLoading: true})
    const {searchValue, activeTab} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/book-hub/books?shelf=${activeTab}&search=${searchValue}`
    const options = {
      method: 'GET',
      headers: {authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.books.map(each => ({
        id: each.id,
        coverPic: each.cover_pic,
        title: each.title,
        authorName: each.author_name,
        rating: each.rating,
        readStatus: each.read_status,
      }))
      this.setState({
        isLoading: false,
        booksList: updatedData,
        bookshelvesApiStatus: 'SUCCESS',
      })
    } else {
      this.setState({isLoading: false, bookshelvesApiStatus: 'FAILURE'})
    }
  }

  onInputChange = event => {
    this.setState({searchValue: event.target.value})
  }

  onSearchBtn = () => {
    this.getData()
  }

  onTabChange = newTab => {
    this.setState({activeTab: newTab}, this.getData)
  }

  geLgtBookshelves = () => {
    const {activeTab} = this.state

    return (
      <ul className="lg-tabs-container">
        {bookshelvesList.map(each => {
          const onTab = event => {
            this.onTabChange(event.target.value)
          }
          return (
            <li
              className={activeTab === each.value ? 'lg-tab-item' : ''}
              key={each.id}
            >
              <button
                type="button"
                onClick={onTab}
                value={each.value}
                className={
                  activeTab === each.value
                    ? 'lg-tab-btn active-tab'
                    : 'lg-tab-btn'
                }
              >
                {each.label}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  onFailureBtn = () => {
    this.getData()
  }

  renderFailureView = () => (
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

  renderEmptyView = () => {
    const {searchValue} = this.state

    return (
      <div className="loader-container">
        <img
          src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670843501/Asset_1_1_yc132m.png"
          alt="no books"
          className="failure-img"
        />
        <p className="failure-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderItems = () => {
    const {booksList} = this.state

    return (
      <div className="bookshelves-success-container">
        <ul className="bookshelves-ul-container">
          {booksList.map(each => (
            <BooksCard key={each.id} eachBook={each} />
          ))}
        </ul>
        <Footer />
      </div>
    )
  }

  renderSuccessView = () => {
    const {booksList} = this.state

    return (
      <div className="success-main-container">
        {booksList.length < 1 ? this.renderEmptyView() : this.renderItems()}
      </div>
    )
  }

  renderResult = () => {
    const {bookshelvesApiStatus} = this.state
    switch (bookshelvesApiStatus) {
      case 'SUCCESS':
        return this.renderSuccessView()
      case 'FAILURE':
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderSmBookshelves = () => {
    const {activeTab} = this.state

    return (
      <div className="sm-main-tabs-container">
        <h1 className="bookshelves-sm-heading">Bookshelves</h1>
        <ul className="sm-tabs-container">
          {bookshelvesList.map(each => {
            const onTab = event => {
              this.onTabChange(event.target.value)
            }
            return (
              <li className="sm-tab-item" key={each.id}>
                <button
                  type="button"
                  onClick={onTab}
                  value={each.value}
                  className={
                    activeTab === each.value
                      ? 'sm-tab-btn sm-active-tab'
                      : 'sm-tab-btn'
                  }
                >
                  {each.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderSearchContainer = () => {
    const {searchValue, activeTab} = this.state
    const activeValueObj = bookshelvesList.find(
      each => each.value === activeTab,
    )
    const activeValue = activeValueObj.label
    return (
      <div className="search-and-active-tab-container">
        <h1 className="lg-active-label-text">{activeValue} Books</h1>
        <div className="search-container">
          <input
            placeholder="Search"
            value={searchValue}
            onChange={this.onInputChange}
            type="search"
            className="search-input"
          />
          <button
            testid="searchButton"
            onClick={this.onSearchBtn}
            type="button"
            className="search-btn"
          >
            <BsSearch fill="grey" />
          </button>
        </div>
      </div>
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color=" #0284c7" height={60} width={60} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="bg-container">
        <Navbar activeRoute="bookshelves" />
        <div className="bookshelves-content-container">
          <div className="bookshelves-lg-sidebar-container">
            <h1 className="bookshelves-heading">Bookshelves</h1>
            {this.geLgtBookshelves()}
          </div>
          <div className="bookshelves-container-two">
            {this.renderSearchContainer()}
            {this.renderSmBookshelves()}
            {isLoading ? this.renderLoader() : this.renderResult()}
          </div>
        </div>
      </div>
    )
  }
}

export default BookShelves
