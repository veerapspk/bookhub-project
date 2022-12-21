import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showError: false, errorMsg: ''}

  onSuccess = data => {
    console.log(data.jwt_token)
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  fetchData = async () => {
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data)
    } else {
      this.setState({showError: true, errorMsg: data.error_msg})
    }
  }

  onSubmitForm = async event => {
    event.preventDefault()
    this.fetchData()
  }

  onUsername = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  getUsernameInput = () => {
    const {username} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="input-container">
        <label className="label" htmlFor="username">
          Username*
        </label>
        <input
          onChange={this.onUsername}
          id="username"
          value={username}
          type="text"
          className="input"
        />
      </div>
    )
  }

  getUserPasswordInput = () => {
    const {password} = this.state
    return (
      <div className="input-container">
        <label className="label" htmlFor="password">
          Password*
        </label>
        <input
          onChange={this.onPassword}
          id="password"
          value={password}
          type="password"
          className="input"
        />
      </div>
    )
  }

  render() {
    const {showError, errorMsg} = this.state
    return (
      <div className="login-bg">
        <img
          alt="website login"
          className="login-img-sm"
          src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670579470/Ellipse_99login_mobile_bg_v5qw93.jpg"
        />
        <img
          className="login-img-lg"
          src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670498983/Rectangle_1467book_hub_login_qdyz5f.jpg"
          alt="website login"
        />
        <div className="form-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670580375/Group_7731website_logo_xdrwv8.png"
            alt="login website logo"
          />

          <form className="form" onSubmit={this.onSubmitForm}>
            {this.getUsernameInput()}
            {this.getUserPasswordInput()}
            {showError && <p className="error-text">{errorMsg}</p>}
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
