import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/Flipkart.css'; // Import the CSS file

const Flipkart = () => {
  const [search, setSearch] = useState('laptop');
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleInput = (event) => {
    setInput(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input !== '') {
      setSearch(input);
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`https://price-api.datayuge.com/api/v1/compare/search?product=${search}&api_key=xOtf2llgqrehyycPUTNN3ORyki7JNl2bMIE`);
      const data = await response.json();
      setResult(data.data);
      if (!data.ok) {
        setError('Error fetching the data: Too many requests');
      }
    } catch (error) {
      setError("Error fetching data: Too many requests");
    }
  }

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="container">
      <div className="header">
        Product Lowest Drop Price
      </div>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search products" 
          onChange={handleInput} 
          value={input}
        />
        <button type="submit">Search</button>
      </form>
      <div className="button-group">
        <button onClick={() => console.log('Product drop price')}>Product drop price</button>
        <button onClick={() => console.log('Price on various websites')}>Price on various websites</button>
      </div>
      <div className="product-grid">
        {result.length > 0 ? (
          result.map((product) => (
            <Link to={`/Prices/${product.product_id}`} key={product.product_id} className="product-card">
              <img src={product.product_image} alt={product.product_title} />
              <h2>{product.product_title}</h2>
              <p>Lowest drop price ₹ {product.product_lowest_price}</p>
            </Link>
          ))
        ) : (
          <div className="error-message">{error} Please wait some more time...</div>
        )}
      </div>
    </div>
  );
}

export default Flipkart;
