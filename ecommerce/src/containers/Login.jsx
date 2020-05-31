import React,{ useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/images/google.png';
import { loginUser, loginUserGoogle } from '../actions';
import '../styles/containers/Login.styl';

const Login = (props) => {
  const [form, setValues] = useState({
    email: '',
  });
  const handleInput = (event) => {
    setValues({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    props.loginUser(form, '/');
  };

  const handleGoogle = (event) => {
    event.preventDefault();
    props.loginUserGoogle('/');
  };


  return (
    <>
      <section className='login'>
        <section className='login__container'>
          <h2>Ingresar</h2>
          <form action='login__container--form' onSubmit={handleSubmit}>
            <input
              name='email'
              className='input'
              type='text'
              placeholder='Correo'
              onChange={handleInput}
            />
            <input
              name='password'
              className='input'
              type='password'
              placeholder='Contraseña'
              onChange={handleInput}
            />
            <button className='button'>Iniciar Sesión</button>
            <div className='login__container--remember-me'>
              <label>
                <input type='checkbox' name='' id='cbox1' value='checkbox' />
                <span>Recuérdame</span>
              </label>

            </div>
          </form>
          <section className='login__container_social-media'>
            <button className='login__container_social-media--Google-button' onClick={handleGoogle}>
              <img src={googleIcon} alt='Google' />
            </button>
          </section>
        </section>
        <p className='login__container--register'>
          No tienes ninguna cuenta
          {' '}
          <Link to='/register'>Registrate</Link>
        </p>
      </section>
    </>
  );
};
const mapDispatchToProps = {
  loginUser,
  loginUserGoogle,
};
export default connect(null, mapDispatchToProps)(Login);