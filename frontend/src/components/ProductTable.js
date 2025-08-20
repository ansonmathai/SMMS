import React from "react";
import "./ProductTable.css"; // Ensure to import the stylesheet

const ProductTable = ({ records, handleIncrease, handleDecrease, handleDelete }) => (
  <div className="product-table-container">
    <table className="table">
      <thead>
        <tr>
          <th className="product-column">Product</th>
          <th className="quantity-column">Quantity</th>
          <th className="expiry-column">Expiry Date</th>
          <th className="mrp-column">MRP</th>
          <th className="total-column">Total</th>
          <th className="action-column">Action</th>
        </tr>
      </thead>
    </table>
    <div className="scroll-container">
      <table className="table">
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td className="product-column">{record.pname}</td>
              <td className="quantity-column">{record.Quantity}</td>
              <td className="expiry-column">{record.expiry}</td>
              <td className="mrp-column">{record.mrp}</td>
              <td className="total-column">{(record.Quantity * record.mrp).toFixed(2)}</td>
              <td className="action-column">
                <button onClick={() => handleIncrease(index)}>+</button>
                <button onClick={() => handleDecrease(index)}>-</button>
                <button onClick={() => handleDelete(index)}>
                  <i className="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductTable;
