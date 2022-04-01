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
import Explain from './views/Explain';


function App() {
  const [user,setUser] = useState({});
  const userIDs = localStorage.getItem('userID');
  const [spouseIDs,setSpouseIds] = useState([])
  const [siblingIds,setSiblingIds] = useState([])
  const [parentsIds,setParentsIds] = useState([])
  const [stepParentsIds,setStepParentsIds] = useState([])
  const [kidsIds,setKidsIds] = useState([])
  const [stepKidsIds,setStepKidsIds] = useState([])
  const [stepSiblingIds,setStepSibling] = useState([])

  useEffect(() => {
    if(userIDs){
      axios.get(`http://localhost:8000/api/user/${userIDs}`).then(response=>{
          setUser(response.data.user)
          setSpouseIds(response.data.user.spouse)
          setSiblingIds(response.data.user.siblings)
          setParentsIds(response.data.user.parents)
          setStepParentsIds(response.data.user.stepParents)
          setKidsIds(response.data.user.children)
          setStepKidsIds(response.data.user.stepKids)
          setStepSibling(response.data.user.stepSibling)
        })
    }
  }, [userIDs,user]);

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser, userIDs }}>
        <Header />
      </UserContext.Provider>  

      <Switch>
        {/* LOGIN */}
        <Route exact path="/">
          <UserContext.Provider value={{ user, setUser,userIDs,spouseIDs,siblingIds,parentsIds,stepParentsIds,kidsIds,stepKidsIds,stepSiblingIds }}>
          {
            userIDs  ? <Dashboard /> : <Login />
          }
          </UserContext.Provider>
        </Route>

        {/* Settings */}
        <Route exact path="/settings">
          <UserContext.Provider value={{ user, setUser, userIDs }}>
          {
            userIDs  ? <Settings /> : <Redirect to="/" /> 
          }
          </UserContext.Provider>
        </Route>

        {/* Add Fmaily Member */}
        <Route exact path="/find">
          <UserContext.Provider value={{ user, setUser, userIDs }}>
            {
              userIDs  ? <Find /> : <Redirect to="/" /> 
            }
          </UserContext.Provider>
        </Route>

        {/* ERROR/404 routes */}
        <Route exact path="/404">
          <Error />
        </Route>

        <Route exact path="/explain">
          <Explain />
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
