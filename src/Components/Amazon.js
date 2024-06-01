import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './css/Amazon.css'; 

const Amazon = () => {
  const [search, setSearch] = useState('apple');
  const [input, setInput] = useState('');
  const [result, setResult] = useState([]);
  const [error, setError] = useState('');

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (e) => {
    if (input !== '') {
      setSearch(input);
    }
    e.preventDefault();
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://price-api.datayuge.com/api/v1/compare/search?product=${search}&api_key=xOtf2llgqrehyycPUTNN3ORyki7JNl2bMIE&id=ZToxMjIyNA`);
      const data = await response.json();
      setResult(data.data);
      if (!data.ok) {
        setError('Error fetching the data: Too many requests');
      }
    } catch (error) {
      setError("Error fetching data: Too many requests");
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  return (
    <div className="bg-light h-full p-8">
      <div className="container mx-auto">
        <div className="header text-2xl font-bold text-center mb-10">
          Product Lowest Drop Price
        </div>
        <form onSubmit={handleSubmit} className="search-form flex flex-col items-center mb-10">
          <input
            type="text"
            placeholder="Search products"
            value={input}
            onChange={handleInput}
            className="search-input w-1/2 p-2 mb-4 rounded-lg shadow-md"
          />
          <button type="submit" className="search-button bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600">
            Search
          </button>
        </form>
        <div className="actions flex justify-around mb-10">
          <button className="action-button bg-white py-2 px-4 rounded-lg shadow-md">
            Product drop price
          </button>
          <button className="action-button bg-white py-2 px-4 rounded-lg shadow-md">
            Price on various websites
          </button>
        </div>
        <div className="product-grid grid grid-cols-1 gap-4 md:grid-cols-4">
          {result.length > 0 ? (
            result.map((product) => (
              <Link to={`/Prices/${product.product_id}`} key={product.product_id} className="product-card bg-white p-4 rounded-lg shadow-md hover:bg-gray-100">
                <img className="product-image w-full h-40 object-cover mb-4" src={product.product_image} alt={product.product_title} />
                <h2 className="product-title text-lg font-semibold mb-2">{product.product_title}</h2>
                <p className="product-price text-gray-600">Lowest drop price ₹ {product.product_lowest_price}</p>
              </Link>
            ))
          ) : (
            <div className="error-message text-red-700">{error} Please wait some more time...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Amazon;
