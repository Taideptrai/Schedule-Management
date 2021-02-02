import react from 'react';
import axios from 'axios';
import moment from 'moment';
import { useState } from 'react';
import Modal from 'react-modal';
import { FileEarmarkWord } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
const User = ({user,reload}) => {
  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width                 : '60%',
      textAlign             : 'center',
      posistion             : 'relative',
      height                : 'auto',
      
wordWrap: 'break-word'
    }
  };
  var subtitle;
  const [modalIsOpen,setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  const handleEdit = (itemEdit) =>{
    history.push(`/create/${itemEdit._id}`)
  }
 
  function closeModal(){
    setIsOpen(false);
  }
  const [show, setShow] = useState(false);
  const {noteTitle, message, _id,startDate, endDate,autoDelete} = user;
  const history = useHistory(); 
  const handleOnclick = async (id) =>{
    const {data} = await axios.delete(`http://localhost:4000/delete/${id}`);
    alert(data.message)
    reload()
}
  
  return ( 
        <>
        <tr>
              <th>{noteTitle}</th>
              <td><FileEarmarkWord onClick={openModal}/></td>
              <td>{moment(startDate).format('DD-MM-YYYY')}</td>
              <td>{moment(endDate).format('DD-MM-YYYY')}</td>
              <td><input id="autocomple" type="checkbox" checked ={autoDelete}/></td>
              <td><button onClick={() => {handleEdit(user)}} type="button" className="btn btn-primary mr-1">Edit</button><button onClick={() => handleOnclick(_id)} type="button" className="btn btn-primary ml-1">Delete</button></td>
        </tr>
        <div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <p className="text-danger">Description</p>
          <button style={{position:"absolute", right:'10px', top:"10px"}} className="btn btn-close" onClick={closeModal}>x</button>
          <p>{message}</p>
        </Modal>
      </div>
        </>
      
  );
}


export default User;
