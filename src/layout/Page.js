import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MyNotification from '../components/MyNotification'

export default function Page(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const showError = (msg) => {
    setError(true);
    setErrorMessage(msg);
  }
  
  const closeNotification = () => {
    setError(false);
    setErrorMessage('');
  }

  return (
    <>
      <MyNotification open={error} message={errorMessage} severity='error' closeNotification={closeNotification}/>
      <props.element location={location} navigate={navigate} showError={showError}/>
    </>
  )
}
