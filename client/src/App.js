import axios from 'axios';
import { useEffect, useState } from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import './App.css';

import UserContext from './context/UserContext';

import Header from './components/Header';

import Dashboard from './views/Dashboard';
import Error from './views/Error';
import Login from './views/Login';
import Settings from './views/Settings';
import Add from './views/Add';

function App() {
  const [user,setUser] = useState({});
  const userIDs = localStorage.getItem('userID');
  

  useEffect(() => {
    console.log(userIDs)
      axios.get(`http://localhost:8000/api/user/${userIDs}`).then(response=>{
          setUser(response.data.user)
        })
  }, [userIDs]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, userIDs }}>
        <Header />
      </UserContext.Provider>  

      <Switch>
        {/* LOGIN */}
        <Route exact path="/">
          <UserContext.Provider value={{ user, setUser,userIDs }}>
          {
            userIDs ? <Dashboard /> : <Login />
          }
          </UserContext.Provider>
        </Route>

        {/* Settings */}
        <Route exact path="/settings">
          <UserContext.Provider value={{ user, setUser,userIDs }}>
            <Settings />
          </UserContext.Provider>
        </Route>

        {/* Add Fmaily Member */}
        <Route exact path="/add">
          <Add />
        </Route>

        {/* ERROR/404 routes */}
        <Route exact path="/404">
          <Error />
        </Route>

        <Route><Redirect to="/404" /></Route>
      </Switch>
    </div>
  );
}

export default App;
