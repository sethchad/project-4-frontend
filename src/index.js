import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/Lato-Regular.ttf';
import './fonts/Redressed-Regular.ttf';


ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);

