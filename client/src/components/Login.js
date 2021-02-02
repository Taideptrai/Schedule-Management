import axios from "axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
function Login() {
  const history = useHistory();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("");
  const handleSubmitForm = async(e) =>{
    e.preventDefault();
    localStorage.clear();
    setError("");
    try{
    const {data} =  await axios.post('/signin', { email, password });
    console.log('datauserId', data.userId);
    alert(`Welcome ${data.email} login success`);
    history.push('/user');
    localStorage.setItem('user', data.email);
    localStorage.setItem('userId', data.userId);
    }catch(error){
      setError(error.response.data.message);
    }
  };
  return ( 
    <div className="login px-5 py-5 mx-auto border border-primary" style={{width:"700px"}}>
        <p className="display-4">Login</p>
        <form onSubmit={handleSubmitForm}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input
                 value={email}
                 type="email" 
                 className="form-control" 
                 id="exampleInputEmail1" aria-describedby="emailHelp" 
                 placeholder="Enter email"
                 onChange={(e)=>setEmail(e.target.value)}
                 />
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input
                 value={password} 
                 type="password" 
                 className="form-control" 
                 id="exampleInputPassword1" 
                 placeholder="Password"
                 onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            {
              error && (<div className="alert alert-danger" role="alert">
              {error}
            </div>)
            }
            <button type="submit" className="btn btn-primary">Submit</button><br/><br/>
            <Link to="/register">Dont have Account ? Register</Link>
        </form>
    </div>
  );
};
export default Login;
