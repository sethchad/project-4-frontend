import React from 'react';
import './Home.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className='Home'>
      <h1>Recipe Book</h1>
      <br />
      <Link to="/allmeals">
        <Button variant="success">View the Recipes</Button>
      </Link>
    </div>
  )
}