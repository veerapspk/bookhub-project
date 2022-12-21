import './index.css'

const googleUrl =
  'https://res.cloudinary.com/dddpdcdmk/image/upload/v1670671114/googlegooglelatest_mjk0sp.png'
const twitterUrl =
  'https://res.cloudinary.com/dddpdcdmk/image/upload/v1670671152/twittertwitter_yhayrc.png'
const instagramUrl =
  'https://res.cloudinary.com/dddpdcdmk/image/upload/v1670671140/instagraminsta_wucohu.png'
const youtubeUrl =
  'https://res.cloudinary.com/dddpdcdmk/image/upload/v1670671127/youtubeyoutube_hhurpn.png'

const Footer = () => (
  <div className="footer-bg">
    <div className="footer-images-container">
      <img src={googleUrl} className="footer-img" alt="google" />
      <img src={twitterUrl} className="footer-img" alt="twitter" />
      <img src={instagramUrl} className="footer-img" alt="instagram" />
      <img src={youtubeUrl} className="footer-img" alt="youTube" />
    </div>
    <p className="contact-us">Contact Us</p>
  </div>
)

export default Footer
