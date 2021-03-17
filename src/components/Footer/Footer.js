import React from 'react';
import './Footer.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='Footer'>
      <h4>© 2021 Seth Chadwick</h4>
      <a href='https://github.com/sethchad/project-4-frontend'>Project Details on GitHub</a>
    </div>
  )
}