import React, { useEffect } from 'react'

const Alert = ({ msg, removeAlert }) => {

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);

    return () => clearTimeout(timeout);
  }, [])

  return <p className={`alert alert-danger`}>{msg}</p>
}

export default Alert
