import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/components/Navbar.scss';

const Navbar = () => {
  return (
    <nav>
      <div>
        <li>Contapp</li>
      </div>
      <div>
        <Link to='/' replace> Home</Link>
        <Link to='/account' replace>Cuentas</Link>
        <Link to='/policy' replace>Polizas</Link>
      </div>
    </nav>
  );
};

export default Navbar;
