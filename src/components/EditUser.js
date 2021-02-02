
import { useParams } from 'react-router-dom';

function EditUser(props) {
  const {id} = useParams()
  return ( 
    <div>
        edit user component : {id}
    </div>
  );
}


export default EditUser;
