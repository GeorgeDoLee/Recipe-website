import React from 'react'
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  const linkedin = 'https://www.linkedin.com/in/giorgi-dolidze-05428b278/';
  const github = 'https://github.com/GeorgeDoLee';
  
  return (
    <section className='container px-5 py-10 sm:px-10 bg-blue-rich'>
      <div className='flex flex-col items-center gap-10 text-white'>
        <div className='flex flex-col items-center gap-5'>
          <h3 className='text-base font-semibold sm:text-lg'>Quick Links</h3>
          <ul className='flex gap-10 text-sm sm:text-base'>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='/'>about us</Link>
            </li>
            <li>
              <Link to='/'>contact us</Link>
            </li>
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
