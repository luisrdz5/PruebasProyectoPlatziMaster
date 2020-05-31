import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/components/Header.styl';
import ButtonSession from '../components/sessionButton';

import avatarGrey from '../assets/images/avatar-grey.png';
import flag from '../assets/images/flag.png';
import searchIcon from '../assets/images/search-icon.png';
import logo from '../assets/images/logo.png';
import shoppingCart from '../assets/images/logo_shopping_cart.png';


const Header = (props) => {
  return (
  <div className="Header">
    <div className="Header__principal">
      <div className="Header__principal__toggle"> 
        <label htmlFor="toggle"> &#9776;</label>
        <input type="checkbox" id="toggle" />
        <menu className="Header__menu" id="Header__menu">
          <div className="Header__menu--container">
            <div className="Header__menu--welcome">
              Bienvenido
            </div>
            <div className="Header__menu--name">
              Anonimo
            </div>
            <div className="Header__menu--avatar">
              <img src={avatarGrey} alt="avatar" />
            </div>
            <div className="Header__menu--country">
              <img src={flag} alt="flag" />
            </div>
          </div>
          <div className="Header__menu--title">
            <div className="Header__menu--title--text">
                Menu
            </div>
          </div>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/">Pedidos</Link>
          </li>
          <li>
            <Link to="/checkout">Carrito</Link>
          </li>
          <li>
            <Link to="/">Perfil</Link>
          </li>
          <li>
            <div className="Header__menu--dark">
              Dark mode <input name="dark" type="checkbox" className="Header__menu--darkMode" /> 
            </div>
          </li>
            <ButtonSession />
          <div className="Header__menu--exit">
            <input type="button" className="text" value="Salir" /> 
          </div>
        </menu>
      </div>
      <div className="Header__principal__logo"> 
        <Link to="/">
          <img src={logo} /> 
        </Link>
      </div>
      <div className="Header__principal__shopping_cart">  
        <Link to="/checkout"> 
          <img src={shoppingCart} alt="logo shopping cart" /> 
        </Link>
        {props.cart.length > 0 &&
        <div className="Header-alert">{props.cart.length}</div>
        }
      </div>
    </div>
    <div className= "Header__search">
      <img src={searchIcon} alt="search-icon"/>
      <input type="text" name="search" results="5" name="search" placeholder="Buscar" />
    </div>
  </div>
)};

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};

export default connect(mapStateToProps, null)(Header);