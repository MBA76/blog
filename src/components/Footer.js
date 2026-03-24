import React from 'react'

import gatsby from '../assets/gatsby.png'
import github from '../assets/nav-github.png'
import logo from '../assets/logo.png'

const links = [
  { url: 'https://medium.com/@mberkcan1532', label: 'Medium' },
  { url: 'https://www.berkcan.tech/rss.xml', label: 'RSS feed' },
  { url: 'https://www.linkedin.com/in/berkcan-akgul', label: 'LinkedIn' },
  {/* url: 'https://ko-fi.com/taniarascia', label: 'Buy me a coffee' */},
]
const madeWithLinks = [
  { url: 'https://www.gatsbyjs.org', label: 'Gatsby', icon: gatsby },
  { url: 'https://github.com/MBA76', label: 'GitHub', icon: github },
  { url: 'https://www.netlify.com', label: 'Netlify', icon: logo },
]

export const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-section">
        <nav className="footer-menu">
          {links.map((link) => (
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="footer-link"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <nav className="footer-menu-buttons">
          {madeWithLinks.map((link) => (
            <a
              href={link.url}
              title={link.label}
              target="_blank"
              rel="noopener noreferrer"
              key={link.url}
              className="button small"
            >
              <img src={link.icon} alt={link.label} />
              <span>{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="footer-made-by"> • Built by Berkcan Akgül • </div>
      </section>
    </footer>
  )
}
