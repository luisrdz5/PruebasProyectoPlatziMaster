import React from 'react';
import { logoutRequest } from '../actions';
import { connect } from 'react-redux';

const ButtonSession = (props) => {
    const { user } = props;
    const hasUser = user ;
    const handleLogout = () => {
      props.logoutRequest({});
      window.location.href = '/login';
    };
    const handleLogin = () => {
      window.location.href = '/login';
    }
    console.log(hasUser);

    return (
        <div className="Header__menu--session">
            <input type="button" 
                className="text" 
                value={hasUser ? 'Cerrar sesión' : 'Iniciar sesión'} 
                onClick = { hasUser ? handleLogout : handleLogin }   />
        </div>
    )
}
const mapStateToProps = state => {
    return {
      user: state.user,
    };
  };
  const mapDispatchToProps = {
    logoutRequest,
  };
export default connect(mapStateToProps, mapDispatchToProps)(ButtonSession);