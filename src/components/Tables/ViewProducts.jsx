"use client";
import { getToken } from "app/config/actions";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const ViewProducts = () => {
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = await getToken();
      console.log("token:", token);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("products:", response.data);
        setProductData(response.data.products); // Assuming the response data contains a products array
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleRemove = async (id) => {
    console.log(`Removing product with id: ${id}`);
    try {
      const token = await getToken();
      await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProductData((prevData) => prevData.filter((product) => product.id !== id));
      console.log(`Product with id: ${id} removed`);
    } catch (error) {
      console.error(`Failed to remove product with id: ${id}`, error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="px-4 py-6 md:px-6 xl:px-7.5">
        <h4 className="text-xl font-semibold text-black dark:text-white">
          Top Products
        </h4>
      </div>

      <div className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">ID</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Product Image</p>
        </div>
        <div className="col-span-2 hidden items-center sm:flex">
          <p className="font-medium">Name</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Description</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Price</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Actions</p>
        </div>
      </div>

      {productData?.map((product) => (
        <div
          className="grid grid-cols-7 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-9 md:px-6 2xl:px-7.5"
          key={product.id}
        >
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">{product.id}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image
              src=""
                // src={product.image} 
                width={60}
                height={50}
                alt={product.name}
              />
            </div>
          </div>
          <div className="col-span-2 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">{product.name}</p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.description}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center space-x-2">
            <button
              onClick={() => handleRemove(product.id)}
              className="h-8 w-20 bg-red-600 text-sm text-white rounded hover:cursor-pointer hover:opacity-75"
            >
              Delete
            </button>
            <Link
              href={`/edit-product/${product.id}`}
              className="h-8 w-20 bg-orange-400 text-sm text-white rounded flex items-center justify-center hover:cursor-pointer hover:opacity-75"
            >
              Edit
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ViewProducts;
