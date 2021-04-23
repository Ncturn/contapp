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
        <Link to='/account' replace>Cuentas</Link>
        <Link to='/policy' replace>Polizas</Link>
        <Link to='/balance' replace>Balanza</Link>
      </div>
    </nav>
  );
};

export default Navbar;
