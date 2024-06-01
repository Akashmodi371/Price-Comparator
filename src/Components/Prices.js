import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './css/Prices.css'; // Import the CSS file

const Prices = () => {
  const { productID } = useParams();
  const [productData, setProductData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://price-api.datayuge.com/api/v1/compare/detail', {
        params: {
          api_key: 'xOtf2llgqrehyycPUTNN3ORyki7JNl2bMIE',
          id: productID,
        },
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      setProductData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [productID]);

  return (
    <div className="container mx-auto mt-8 ">
      {productData ? (
        <div>
          <h2 className="text-3xl font-semibold pl-7 mb-4">{productData.product_name}</h2>
          <div className="pl-6">
            <p className="text-lg">Brand: {productData.product_brand}</p>
            <p className="text-lg">Model: {productData.product_model}</p>
            <p className="text-lg">Ratings: {productData.product_ratings}</p>
          </div>
          <h3 className="  pt-2 pl-5 text-xl mt-4">Available Colors</h3>
          <ul className="  grid grid-cols-4  w-3/4  pb-6  pt-4 pl-10 list-disc list-inside text-lg">
            {productData.available_colors.map((color, index) => (
              <li key={index}>{color}</li>
            ))}
          </ul>

          <h3 className=" pl-10 text-xl mt-4">Product Images</h3>
          <div className="product-images pt-6 pl-16 grid grid-cols-2 items-center gap-4 lg:gap-2 sm:grid-cols-4">
            {productData.product_images.map((imageUrl, index) => (
              <div key={index}>
                <img src={imageUrl} alt={`Image ${index}`} className="rounded-lg shadow-md" />
              </div>
            ))}
          </div>

          <h3 className="text-2xl mt-8">Stores and Prices</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 text-left">Store Name</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Price</th>
                  <th className="py-2 px-4 border border-gray-300 text-left">Store URL</th>
                </tr>
              </thead>
              <tbody>
                {productData.stores.map((store, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                    <td className="py-2 px-4 border border-gray-300">{Object.keys(store)[0]}</td>
                    {store[Object.keys(store)[0]] ? (
                      <>
                        <td className="py-2 px-4 border border-gray-300">{store[Object.keys(store)[0]].product_price}</td>
                        <td className="py-2 px-4 border border-gray-300">
                          {store[Object.keys(store)[0]].product_store_url ? (
                            <a
                              href={store[Object.keys(store)[0]].product_store_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              View on {Object.keys(store)[0]}
                            </a>
                          ) : (
                            <span className="text-red-500">Not Available</span>
                          )}
                        </td>
                      </>
                    ) : (
                      <td colSpan="2" className="py-2 px-4 border border-gray-300 text-red-500">Not Available on this store</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-red-500 text-xl">Product not available</p>
      )}
    </div>
  );
};

export default Prices;
