import './App.css';
import { useState } from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';


function App() {
  let [formData, setFormData] = useState({
    uname: '',
    uemail: '',
    uphone: '',
    umessage: '',
    index: '' 
  });

  let [userData, setUserData] = useState([]);

  let getValue = (event) => {
    let { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let handleSubmit = (event) => {
    event.preventDefault();

  
    let checkDuplicate = userData.some(
      (user) => user.uemail === formData.uemail || user.uphone === formData.uphone
    );

    if (checkDuplicate) {
      alert('User already exists!');
      return;
    }

    if (formData.index === '') {
    
      let currentUserFormData = {
        uname: formData.uname,
        uemail: formData.uemail,
        uphone: formData.uphone,
        umessage: formData.umessage,
        index: userData.length, 
      };

      setUserData((prevUserData) => [...prevUserData, currentUserFormData]);
    } else {
    
      let updatedData = userData.map((user, i) =>
        i === Number(formData.index)
          ? { ...formData, index: i } 
          : user
      );
      setUserData(updatedData);
    }

  
    setFormData({
      uname: '',
      uemail: '',
      uphone: '',
      umessage: '',
      index: ''
    });
  };

  let handleEdit = (index) => {
    let selectedUser = userData[index];
    setFormData({
      ...selectedUser, 
      index: index.toString() // Ensure it's a string for controlled input
    });
  };

  let handleDelete = (index) => {
    let filteredData = userData.filter((_, i) => i !== index);
    setUserData(filteredData);
  };

  return (
  
    <Container fluid>
      <Container>
        <Row>
          <Col className='text-center py-5'>
            <h1>Enquiry Now</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={5}>
            <form onSubmit={handleSubmit}>
              <div className='pb-3'>
                <label className='form-label'>Name</label>
                <input type='text' onChange={getValue} value={formData.uname} name='uname' className='form-control' />
              </div>
              <div className='pb-3'>
                <label className='form-label'>Email</label>
                <input type='email' onChange={getValue} value={formData.uemail} name='uemail' className='form-control' />
              </div>
              <div className='pb-3'>
                <label className='form-label'>Phone</label>
                <input type='number' onChange={getValue} value={formData.uphone} name='uphone' className='form-control' />
              </div>
              <div className='pb-3'>
                <label className='form-label'>Message</label>
                <textarea className='form-control' onChange={getValue} value={formData.umessage} name="umessage" rows="3"></textarea>
              </div>
              <button className='btn btn-primary'>
                {formData.index !== "" ? 'Update' : 'Save'}
              </button>
            </form>
          </Col>
          <Col lg={7}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.length >= 1 ? (
                  userData.map((user, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{user.uname}</td>
                      <td>{user.uemail}</td>
                      <td>{user.uphone}</td>
                      <td>{user.umessage}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
                        <button className="btn btn-warning mx-2" onClick={() => handleEdit(index)}>Edit</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">No data found</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </Container>
  );

}

export default App;
