import React,{useState,useEffect} from 'react'
import { View } from './View';
import 'bootstrap/dist/css/bootstrap.min.css'
import moment from 'react-moment';
import 'moment-timezone';

export const App = () => {

  const getData=()=>{
    const data=localStorage.getItem('users');
    if(data){
      return JSON.parse(data);
    }
    else{
      return []
    }
  }

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [users,setUsers]=useState(getData());
  

  //getting the value from storage
  const handleChangeFirstName=(val)=>{
    if(val.target.value.length>50){ 
      this.setState({
        firstNameErr: "Username shouldn't exceed 10 characters"
      });
    }
    setFirstName(val.target.value);
  }

  const [userList, setuserList] = useState(users);
  function compareFN(a, b) 
    {
      let aLowerFirstName = a.firstName.toLowerCase();
      let bLowerFirstName = b.firstName.toLowerCase()
      if (aLowerFirstName > bLowerFirstName) return 1;
      if (aLowerFirstName < bLowerFirstName) return -1;
      return 0;
    }
  const sortByFirstNameHandler = () =>
  {
    const sorted = [...userList].sort(compareFN);//calling compare function
    setuserList(sorted);//storing sorted values
  };
  function compareLN(a, b) 
    {
      let aLowerLastName = a.lastName.toLowerCase();
      let bLowerLastName = b.lastName.toLowerCase();
      if (aLowerLastName > bLowerLastName) return 1;
      if (aLowerLastName < bLowerLastName) return -1;
      return 0;
    }

  const sortByLastNameHandler = () => {
    const sorted = [...userList].sort(compareLN);//calling compare function
    setuserList(sorted);//storing sorted values
  };

  function compareDOB(a, b) 
    {
      if (a.dob > b.dob) return 1;
      if (a.dob < b.dob) return -1;
      return 0;
    }

  const sortByDobHandler = () => {
    const sorted = [...userList].sort(compareDOB);//calling compare function
    setuserList(sorted);//storing sorted values
  };

  const createUserHandler= (val)=>{
    let user={
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      dob: dob,
      city:city,
      phone: phone,
      email: email
    }
    setUsers([...users,user]);
    setFirstName('');
    setLastName('');
    setGender('');
    setDob('');
    setCity('');
    setPhone('');
    setEmail('');
  }
  //window.localStorage.clear();
  //Saving to local storage
  useEffect(()=>{
    localStorage.setItem('users',JSON.stringify(users));
  },[users])
  
  function getMaxDate() 
  {
    return moment().subtract(0, "years");
  }
  function getMinDate() 
  {
    return moment().subtract(100, "years");
  }


       
  return (
    

    <div className='wrapper'>
      <h1>Create User</h1>
      <div className='main'>
        <div className='form-container'>
          <form autoComplete='off' className='form-group' onSubmit={createUserHandler}>
            <label>First Name</label>
            <input type="text" className='form-control' maxLength={50} minLength={2} required
            onChange={handleChangeFirstName} value={firstName}>
            </input>
            <br></br>
            <label>Last Name</label>
            <input type="text" className='form-control' maxLength={50} minLength={2} required
            onChange={(val)=>setLastName(val.target.value)} value={lastName}></input>
            <br></br>
            <label>Gender</label>
            
            <select name="selectList" id="selectList" className='form-control' defaultValue={"default"}
            onChange={(val)=>setGender(val.target.value)} value={gender} required>
              <option value=''>--Please choose an option--</option>
              <option value="Female" >Female</option>
              <option value="Male" >Male</option>
            </select>
            <br></br>
            <label>Date of Birth</label>
            <input type="date" className='form-control'
            minDate= {getMinDate} maxDate= {getMaxDate} required
            onChange={(val)=>setDob(val.target.value)} value={dob}></input>
            <br></br>
            <label>City</label>
            <input type="text" className='form-control'
            onChange={(val)=>setCity(val.target.value)} value={city}></input>
            <br></br>
            <label>Phone</label>
            <input type="phone" className='form-control' required
            onChange={(val)=>setPhone(val.target.value)} value={phone}></input>
            <br></br>
            <label>Email</label>
            <input type="email" className='form-control' required
            onChange={(val)=>setEmail(val.target.value)} value={email}></input>
            <br></br>
            <button type='submit' className='submitButton'>Creat User</button>
            
          </form>
        </div>


        <div className='view-container'>

          {users.length>0 &&
          <>
          <br></br>
          <div className='sort'>
            <button className='sortButton' onClick={sortByFirstNameHandler}>Sort By First Name</button>
            <button className='sortButton' onClick={sortByLastNameHandler}>Sort By Last Name</button>
            <button className='sortButton' onClick={sortByDobHandler}>Sort By Date of Birth</button>
          </div>
            <div className='table-responsive'>
              <table className='table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Birth Date</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  <View users={userList}>

                  </View>
                </tbody>
              </table>
            </div>
          </>}
          {users.length<1 && <div>No users</div>}

        </div>
      </div>
    </div>
  )
}

export default App;
