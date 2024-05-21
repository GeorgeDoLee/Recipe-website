import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const navItems = [
  {
      name: 'Home',
      link: '/',
  },
  {
      name: 'My Recipes',
      link: '/my-recipes'
  },
  {
      name: 'Saved Recipes',
      link: '/saved-recipes'
  },
  {
      name: 'About Us',
      link: '/'
  }
]

const Footer = () => {
  const linkedin = 'https://www.linkedin.com/in/giorgi-dolidze-05428b278/';
  const github = 'https://github.com/GeorgeDoLee';
  
  return (
    <section className='container px-5 py-10 sm:px-10 bg-blue-rich'>
      <div className='flex flex-col items-center gap-10 text-white'>
        <div className='flex flex-col items-center gap-5'>
          <h3 className='text-base font-semibold sm:text-lg'>Quick Links</h3>
          <ul className='grid grid-cols-2 grid-rows-2 gap-5 text-sm sm:gap-3 sm:grid-rows-1 justify-items-center sm:grid-cols-4 sm:text-base'>
            {navItems.map((item, index) => (
              <li key={index}>
                <Link to={item.link} className='block text-center sm:text-left'>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        <div className='flex items-center justify-between w-full text-sm sm:text-base'>
          <p className='w-40 sm:w-auto'>
            &copy; Digital property of George Dolidze
          </p>
          
          <div className='flex gap-5'>
            <a href={linkedin} target='_blank' rel='noopener noreferrer'>
              <FaLinkedin className='w-6 h-auto cursor-pointer sm:w-8' />
            </a>
            <a href={github} target='_blank' rel='noopener noreferrer'>
              <FaGithub className='w-6 h-auto cursor-pointer sm:w-8' />  
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer
