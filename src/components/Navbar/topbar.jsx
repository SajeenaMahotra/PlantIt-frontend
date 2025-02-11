import React from 'react';
import { useNavigate } from 'react-router-dom';
import './topbar.css';

const TopBar = () => {
  const navigate = useNavigate();
  
  return (
      <div className="top-bar">
        <span className='text-content'>
          To explore more, <span className="login-page" onClick={() => navigate('/login')}>LOGIN.</span>
        </span>
      </div>
  );
}

export default TopBar;
