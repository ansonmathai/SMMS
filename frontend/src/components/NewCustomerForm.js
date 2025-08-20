import React, { useState } from 'react';
import axios from 'axios';
import './NewCustomerForm.css'; // Import the stylesheet

function NewCustomerForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [fetchedCustomerCid, setFetchedCustomerCid] = useState('');
  const [customerName, setCustomerName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/add-customer', {
        cname: name,
        cphone: phone,
        email: email,
        caddress: address || null
      });

      console.log('Customer added:', response.data);
      if (response.data.success) {
        setCustomerName(response.data.cname);  
        setFetchedCustomerCid(response.data.cid);// Clear form
        setName('');
        setPhone('');
        setEmail('');
        setAddress('');
      }
    } catch (error) {
      console.error('Error adding customer:', error);
    }
  };

  return (
    <div className="new-customer-container">
      <div className="customer-search-container" >
        <div>Customer Name: {customerName}</div>
        <div>Customer ID: {fetchedCustomerCid}</div>
      </div>
      <form onSubmit={handleSubmit} className="new-customer-form">
        <div className="form-group">
          <input
            type="text"
            placeholder='*Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="right-align"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder='*Phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="right-align"
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder='*Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="right-align"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="right-align"
          />
        </div>
        <button className="Add1" type="submit" >Add</button>
      </form>
    </div>
  );
}

export default NewCustomerForm;

