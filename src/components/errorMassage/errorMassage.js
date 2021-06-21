import React from 'react';
import './errorMassage.scss';

const ErrorMassage = () => {
  return (
    <>
    <img className="error-picture" src={process.env.PUBLIC_URL + '/img/error.png'} alt='error'></img>
    <span className="error-text">Something wrong...</span>
    </>
  )
}
export default ErrorMassage;
