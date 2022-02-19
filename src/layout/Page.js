import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import MyNotification from '../components/MyNotification'

export default function Page(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [notification, setNotification] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("error");

  const showNotification = (msg, sev = 'error') => {
    setNotification(true);
    setMessage(msg);
    setSeverity(sev);
  }
  
  const closeNotification = () => {
    setNotification(false);
    setMessage('');
  }

  return (
    <>
      <MyNotification open={notification} message={message} severity={severity} closeNotification={closeNotification}/>
      <props.element location={location} navigate={navigate} showNotification={showNotification}/>
    </>
  )
}
