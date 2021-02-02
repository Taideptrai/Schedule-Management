import { useEffect, useState } from "react";
import { animateScroll } from "react-scroll";
import axios from 'axios';
import User from "./User";
import { useHistory } from "react-router-dom";
const Users = () => {
    const history= useHistory();
    const user = localStorage.getItem('user');
    const scrollToBottom = () => {
        animateScroll.scrollToBottom({
          containerId: "options-holder"
        });
    }
    const LogoutHandle = () =>{
      localStorage.clear()
      history.push('/');
      
    }
    const [value,setValue] = useState([]);
    const [trigger, setTrigger] = useState(true);
    console.log(value)
    useEffect(() =>{
        const userId = localStorage.getItem("userId");
        const fetchData = async() =>{
            const {data} = await axios.post('/hello',{userId});
            setValue(data);
            scrollToBottom();
        }
        userId ? fetchData(): history.push("/")
      
    },[trigger,history]);

  return (
    <div>
      <h2 className="display-8">Hello, <span className=" text-primary">{user}</span></h2>
      <div className="my-3">
      <button 
      type="button" 
      className="btn btn-success ml-3"
      onClick={()=>{history.push("/create")}}>Create</button>
      <button type="button" className="btn btn-success ml-3">History Delete</button>
      <button onClick={LogoutHandle} type="button" className="btn btn-success ml-3">Log Out</button>
      </div>
    {   
        value.length === 0 
        ? "Loading..."
        : (<table className="table">
              <thead className="thead-dark ">
                <tr>
                  <th scope="col">Note</th>
                  <th scope="col">Description</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Auto remove</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
           {value.map(item=>(
           <User reload={() => setTrigger(!trigger)} key={item._id} user={item}/>
        ))
           }
              </tbody>
        </table>
        )
    }
    </div>
  );
}


export default Users;
