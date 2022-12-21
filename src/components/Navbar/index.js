import {withRouter, Link} from 'react-router-dom'
import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Navbar extends Component {
  state = {showNavItems: false}

  onLogoutBtn = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/')
  }

  renderNavItems = () => {
    const {activeRoute} = this.props
    return (
      <ul className="nav-items-container">
        <li className="nav-items">
          <Link
            to="/"
            className={
              activeRoute === 'Home' ? 'link-item active' : 'link-item'
            }
          >
            <p>Home</p>
          </Link>
        </li>
        <li className="nav-items">
          <Link
            to="/shelf"
            className={
              activeRoute === 'bookshelves' ? 'link-item active' : 'link-item'
            }
          >
            <p>BookShelves</p>
          </Link>
        </li>
        <li className="nav-items">
          <button
            onClick={this.onLogoutBtn}
            className="logout-btn"
            type="button"
          >
            Logout
          </button>
        </li>
        <li>
          <button
            onClick={this.onHamburger}
            type="button"
            className="hamburger-close-btn"
          >
            x
          </button>
        </li>
      </ul>
    )
  }

  onHamburger = () => {
    this.setState(prev => ({showNavItems: !prev.showNavItems}))
  }

  renderLargeNavbarItems = () => {
    const {activeRoute} = this.props
    console.log(activeRoute)
    return (
      <ul className="nav-items-container-lg">
        <li className="nav-items">
          <Link
            to="/"
            className={
              activeRoute === 'Home' ? 'link-item active' : 'link-item'
            }
          >
            <p>Home</p>
          </Link>
        </li>
        <li className="nav-items">
          <Link
            to="/shelf"
            className={
              activeRoute === 'bookshelves' ? 'link-item active' : 'link-item'
            }
          >
            <p> BookShelves</p>
          </Link>
        </li>
        <li className="nav-items">
          <button
            onClick={this.onLogoutBtn}
            className="logout-btn"
            type="button"
          >
            Logout
          </button>
        </li>
      </ul>
    )
  }

  render() {
    const {showNavItems} = this.state
    return (
      <>
        <nav className="navbar">
          <Link className="link-item-img" to="/">
            <img
              alt="website logo"
              className="nav-logo"
              src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670593031/Group_7732navlogo_twtasw.png"
            />
          </Link>
          <button
            onClick={this.onHamburger}
            className="hamburger-btn"
            type="button"
          >
            <img
              src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670592632/iconhamburger_d142yw.png"
              alt="hamburger"
              className="hamburger-img"
            />
          </button>
          {this.renderLargeNavbarItems()}
        </nav>
        {showNavItems && this.renderNavItems()}
      </>
    )
  }
}

export default withRouter(Navbar)
