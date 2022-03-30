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
import Find from './views/Find';
import Footer from './components/Footer';


function App() {
  const [user,setUser] = useState({});
  const userIDs = localStorage.getItem('userID');
  const [spouseIDs,setSpouseIds] = useState([])

  useEffect(() => {
      axios.get(`http://localhost:8000/api/user/${userIDs}`).then(response=>{
          setUser(response.data.user)
          setSpouseIds(response.data.user.spouse)
        })
  }, [userIDs,user]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, userIDs }}>
        <Header />
      </UserContext.Provider>  

      <Switch>
        {/* LOGIN */}
        <Route exact path="/">
          <UserContext.Provider value={{ user, setUser,userIDs,spouseIDs }}>
          {
            userIDs ? <Dashboard /> : <Login />
          }
          </UserContext.Provider>
        </Route>

        {/* Settings */}
        <Route exact path="/settings">
          <UserContext.Provider value={{ user, setUser, userIDs }}>
            <Settings />
          </UserContext.Provider>
        </Route>

        {/* Add Fmaily Member */}
        <Route exact path="/find">
          <UserContext.Provider value={{ user, setUser, userIDs }}>
            <Find />
          </UserContext.Provider>
        </Route>

        {/* ERROR/404 routes */}
        <Route exact path="/404">
          <Error />
        </Route>

        <Route><Redirect to="/404" /></Route>
      </Switch>
      <UserContext.Provider value={{ userIDs }}>
        <Footer/>
        </UserContext.Provider>
    </div>
  );
}

export default App;
