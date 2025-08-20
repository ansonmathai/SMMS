import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import ProductTable from "./components/ProductTable";
import NewCustomerForm from "./components/NewCustomerForm";
import DateTimeDisplay from "./components/DateTimeDisplay";
import './App.css';

const App = () => {
  const [myOptions, setMyOptions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [records, setRecords] = useState([]);
  const [totalBill, setTotalBill] = useState(0);
  const [customerCid, setCustomerCid] = useState('');
  const [fetchedCustomerCid, setFetchedCustomerCid] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash'); // New state for payment method
  const searchInputRef = useRef();

  const getSearchOptions = async () => {
    try {
      const response = await axios.get('http://localhost:5000/product-names');
      setMyOptions(response.data.map(option => option.pname));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getProductDetails = async (pname) => {
    try {
      const response = await axios.get(`http://localhost:5000/product-details?pname=${pname}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getCustomerDetails = async (cid) => {
    try {
      const response = await axios.get(`http://localhost:5000/customer-details?cid=${cid}`);
      handleNewCustomer(response.data.cname, cid);
      setCustomerCid('');

    } catch (error) {
      console.error("Error fetching data:", error);
      setCustomerCid('Invalid ID');
      setTimeout(() => { 
        setCustomerCid(''); }, 700);
    }
  };

  useEffect(() => {
    getSearchOptions();
  }, []);

  useEffect(() => {
    const calculateTotalBill = () => {
      const total = records.reduce((sum, record) => sum + (record.Quantity * record.mrp), 0);
      setTotalBill(total.toFixed(2));
    };
    calculateTotalBill();
  }, [records]);

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectProduct = (event, value) => {
    getProductDetails(value);
  };

  const handleNewCustomer = (name, cid) => {
    setCustomerName(name);
    setFetchedCustomerCid(cid);
  };

  const handleCustomerSearch = (e) => {
    setCustomerCid(e.target.value);
  };

  const searchCustomer = () => {
    if (customerCid) {
      getCustomerDetails(customerCid);
    }
  };

  const addNewRecord = () => {
    if (selectedProduct) {
      const fixedMrp = parseFloat(selectedProduct.mrp).toFixed(2);
      setRecords([...records, { ...selectedProduct, Quantity: 1, mrp: fixedMrp }]);
      setSelectedProduct(null);
      setSearchInput('');
      if (searchInputRef.current) {
        searchInputRef.current.value = '';
      }
      // Scroll to the bottom of the table
      const scrollContainer = document.querySelector('.scroll-container');
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  };

  const handleIncrease = (index) => {
    const newRecords = [...records];
    newRecords[index].Quantity += 1;
    setRecords(newRecords);
  };

  const handleDecrease = (index) => {
    const newRecords = [...records];
    if (newRecords[index].Quantity > 0) {
      newRecords[index].Quantity -= 1;
    }
    setRecords(newRecords);
  };

  const handleDelete = (index) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  const handleBill = async () => {
    try {
      const response = await axios.post('http://localhost:5000/create-bill', {
        cid: customerCid,
        total: totalBill,
        payable: totalBill,
        payment: paymentMethod, // Use selected payment method
        records
      });
      console.log('Bill created:', response.data);
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  return (
     <div className="App">
      <div className="search-container">
        <div className="search-bar">
          <SearchBar
            myOptions={myOptions}
            searchInput={searchInput}
            handleSearch={handleSearch}
            handleSelectProduct={handleSelectProduct}
            searchInputRef={searchInputRef}
          />
        </div>
        <button onClick={addNewRecord} className="add-button" >Add</button>
        <div className="customer-search">
          <input
            type="text"
            value={customerCid}
            onChange={handleCustomerSearch}
            placeholder="Customer ID"
          />
          <button onClick={searchCustomer} className="search-button">Search</button>
        </div>
      </div>
      
      
      <ProductTable
        records={records}
        handleIncrease={handleIncrease}
        handleDecrease={handleDecrease}
        handleDelete={handleDelete}
      />
      <div className="total-bill-container" onClick={handleBill}>
        <div>
          Total Bill: ₹{totalBill}
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="cash">Cash</option>
            <option value="credit card">Credit Card</option>
            <option value="debit card">Debit Card</option>
            <option value="upi">UPI</option>
          </select>
        </div>
      </div>
      <NewCustomerForm/>
      <DateTimeDisplay />
    </div>
  );  
  
};

export default App;
