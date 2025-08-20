import React, { useState } from "react";

function Add() {
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div>
        <div>
          <label htmlFor="Product">Product:</label>
          <input
            type="text"
            name="Product"
            className="Form-control"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="Quantity">Quantity:</label>
          <input
            type="number"
            name="Quantity"
            className="Form-control"
            value={quantity}
            readOnly
          />
        </div>
        <div>
          <button onClick={handleIncrease}>+</button>
          <button onClick={handleDecrease}>-</button>
        </div>
      </div>
    </div>
  );
}

export default Add;
