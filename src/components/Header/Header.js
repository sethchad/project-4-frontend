import React from 'react';
import './Header.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className='Header'>
      <Link to="/"><h4 className='appName'>Recipe Book</h4></Link>
      <Link to="/allmeals">
        <Button variant="light">All Recipes</Button>
      </Link>
    </div>
  )
}