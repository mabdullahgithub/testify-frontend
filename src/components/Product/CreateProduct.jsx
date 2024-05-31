"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios"; // Import axios
import { getToken } from "app/config/actions"; // Adjust this import based on your project structure
import { toast } from "react-toastify"; // Import toast if you're using react-toastify
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: null,
    },
    criteriaMode: "all",
  });

  const handleOnSubmit = async (data) => {
    try {
      const token = await getToken();
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("image", data.image[0]);


      console.log("formData:", formData);

      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}create-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("response:", response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        router.push("/product-list");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="space-y-12">
        <div className="border-gray-900/10 border-b pb-12">
          <h2 className="text-gray-900 text-base font-semibold leading-7">
            Personal Information
          </h2>
          <p className="text-gray-600 mt-1 text-sm leading-6">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  {...register("name", { required: true })}
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="description"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Description
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="description"
                  id="description"
                  autoComplete="family-name"
                  {...register("description", { required: true })}
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-3 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.description && <span className="text-red-600">Description is required</span>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Price
              </label>
              <div className="mt-2">
                <input
                  id="price"
                  name="price"
                  type="number"
                  {...register("price", { required: true })}
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.price && <span className="text-red-600">Price is required</span>}
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="image"
                className="text-gray-900 block text-sm font-medium leading-6"
              >
                Image
              </label>
              <div className="mt-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  {...register("image", { required: true })}
                  className="text-gray-900 ring-gray-300 placeholder:text-gray-400 block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.image && <span className="text-red-600">Image is required</span>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          className="text-gray-900 text-sm font-semibold leading-6"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </form>
  );
};

export default CreateProduct;