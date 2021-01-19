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
        <Link to='/'>Home</Link>
        <Link to='/create'>Crear cuenta</Link>
      </div>
    </nav>
  );
};

export default Navbar;
