
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { Route } from 'react-router-dom';
import Users from './components/Users';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Register from './components/Register';
const App = () => {
  return (
    <div className="App">
       <h1 className="text-danger">Schedule Management</h1>
        <Route path="/" exact component={Login}></Route>
        <Route path="/register"  component={Register}></Route>
        <Route path="/user" exact component={Users}></Route>
        <Route path="/edit/:id"  component={EditUser}></Route>
        <Route path="/create"  component={CreateUser} exact></Route>
        <Route path="/create/:userId"  component={CreateUser}></Route>
        
    </div>
  );
}

export default App;
