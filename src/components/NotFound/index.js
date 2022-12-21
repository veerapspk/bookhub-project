import {Link} from 'react-router-dom'

import './index.css'

const NotFound = () => (
  <div className="not-found-bg">
    <img
      src="https://res.cloudinary.com/dddpdcdmk/image/upload/v1670924208/Group_7484_nprggc.png"
      alt="not found"
      className="not-found-img"
    />
    <h1 className="not-found-head">Page Not Found</h1>
    <p className="not-found-description">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="logout-btn">
        Go Back to Home
      </button>
    </Link>
  </div>
)
export default NotFound
