import React, { useState, useEffect } from "react";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import Homepage from "./components/main/Homepage";
import Feed from "./components/main/Feed";
import Visiting from "./components/main/Visiting";

const getUserStatus = () => {
  let user = sessionStorage.getItem('userStatus');
  return user ? JSON.parse(user) : {route: 'login', isLoggedIn: false, name: ''};
}

// gets name of logged in user in event of session interruption
const getUsername = () => {
  let username = sessionStorage.getItem('username');
  return username ? JSON.parse(username) : '';
}

function App() {
  
  const [userStatus, setUserStatus] = useState(getUserStatus());
  // the name of the logged in user
  const [username, setUsername] = useState(getUsername());

  const changeUserStatus = (route='login', isLoggedIn=false, name='') => {
    setUserStatus({route, isLoggedIn, name});

    // ensures that username will only hold the logged in user
    if (!username) {
      setUsername(name);
    }
    if (route === 'logout') {
      setUsername('');
    }
  };

  useEffect(() => {
    sessionStorage.setItem('userStatus', JSON.stringify(userStatus));
    sessionStorage.setItem('username', JSON.stringify(username));
  }, [userStatus, username]);

  const { route, isLoggedIn, name } = userStatus;

  if (isLoggedIn) {
    if (route === 'homepage' && name === username) {
      return <Homepage username={name} changeUserStatus={changeUserStatus} /> 
    }
    else if (route === 'feed') {
      return <Feed changeUserStatus={changeUserStatus} username={username} />
    }
    else {
      return <Visiting visitorName={username} searchName={name} changeUserStatus={changeUserStatus} />
    }
  }

  else {
    if (route === 'login' || route === 'logout') {
      return <Login changeUserStatus={changeUserStatus} />
    }
    else {
      return <Signup changeUserStatus={changeUserStatus} />
    }
  }

  // return (
  //   <div className="container">
  //     {
  //       route === 'login' || route === 'logout' ?
  //         <Login changeUserStatus={changeUserStatus} /> : 
  //         route === 'signup' ?
  //           <Signup changeUserStatus={changeUserStatus} /> :
  //           route === 'homepage' && name === username ?
  //             <Homepage username={name} changeUserStatus={changeUserStatus} /> :
  //             route === 'feed' ?
  //               <Feed changeUserStatus={changeUserStatus} username={username} /> :
  //               <Visiting visitorName={username} searchName={name} changeUserStatus={changeUserStatus} />
  //     }
  //   </div>
  // );
}

export default App;
