import { useEffect, useState } from 'react';
import { Switch,Route,Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import UserContext from './context/UserContext';
import Dashboard from './views/Dashboard';
import Error from './views/Error';
import Login from './views/Login';

function App() {
  const [user,setUser] = useState("");
  const userIDs = localStorage.getItem('userID');
  

  useEffect(() => {
    if(userIDs){
      setUser(userIDs)
    }
  }, [userIDs,user]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
      </UserContext.Provider>  

      <Switch>
        {/* LOGIN */}
        <Route exact path="/">
          <UserContext.Provider value={{ user, setUser }}>
          {
            user.length === 0 ? <Login /> : <Dashboard />
          }
          </UserContext.Provider>
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
