import React from 'react'
import { FaFreeCodeCamp } from "react-icons/fa"
import { FaTwitter } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"
import { FaTelegram } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"
import { FaRss } from "react-icons/fa"


function Footer() {
  return (
    <div className='footer' >
        <div className="icons">
          <FaFreeCodeCamp className='icon' />
          <FaTwitter className='icon' />
          <FaWhatsapp className='icon' />
          <FaTelegram className='icon' />
          <FaYoutube className='icon' />
          <FaRss className='icon' />
        </div>
        <div className="footer-text">
          <p>&copy; 2013-2022 Webengine, Inc All rights reserved.  </p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting dummy text of the printing </p>
        </div>
    </div>
  )
}

export default Footer