"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EyeIcon from "../../../svgs/EyeIcon";
import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import BoyImgLogo from "svgs/BoyImgLogo";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
    criteriaMode: "all",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  




  const handleOnSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}register`,
        data,
      );
      console.log("response:",response.data);
      if (response.data.status === "success") {
        toast.success(response.data.message);
        router.push("/signin")
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="rounded-sm border  border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ">
        <div className="flex h-screen">
          <div className="z-1 hidden h-screen w-full flex-1 xl:block xl:w-1/2">
            <div className="px-26 py-17.5 text-center">
              <Link className="mb-5.5 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="2xl:px-20">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
                suspendisse.
              </p>

              <BoyImgLogo />
            </div>
          </div>

          <div className="bg-gray-100 w-full flex-1 overflow-y-auto border-stroke dark:border-strokedark xl:w-1/2  xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Start for free</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Sign Up to Rocco
              </h2>

              <form onSubmit={handleSubmit(handleOnSubmit)}>
                {/* First Name */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your First Name"
                      minlength="3"
                      maxlength="31"
                      {...register("firstname", {
                        required: "This is required.",
                        minLength: {
                          value: 3,
                          message: "Greator than three charactors",
                        },
                        maxLength: {
                          value: 30,
                          message: "This input exceed maxLength.",
                        },
                      })}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="firstname"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type} className="text-[14px] text-red-600">
                            {message}
                          </p>
                        ))
                      }
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Last Name  */}

                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter your First Name"
                      minlength="3"
                      maxlength="31"
                      {...register("lastname", {
                        required: "This is required.",
                        minLength: {
                          value: 3,
                          message: "Greator than three charactors",
                        },
                        maxLength: {
                          value: 30,
                          message: "This input exceed maxLength.",
                        },
                      })}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="lastname"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type} className="text-[14px] text-red-600">
                            {message}
                          </p>
                        ))
                      }
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M11.0008 9.52185C13.5445 9.52185 15.607 7.5281 15.607 5.0531C15.607 2.5781 13.5445 0.584351 11.0008 0.584351C8.45703 0.584351 6.39453 2.5781 6.39453 5.0531C6.39453 7.5281 8.45703 9.52185 11.0008 9.52185ZM11.0008 2.1656C12.6852 2.1656 14.0602 3.47185 14.0602 5.08748C14.0602 6.7031 12.6852 8.00935 11.0008 8.00935C9.31641 8.00935 7.94141 6.7031 7.94141 5.08748C7.94141 3.47185 9.31641 2.1656 11.0008 2.1656Z"
                            fill=""
                          />
                          <path
                            d="M13.2352 11.0687H8.76641C5.08828 11.0687 2.09766 14.0937 2.09766 17.7719V20.625C2.09766 21.0375 2.44141 21.4156 2.88828 21.4156C3.33516 21.4156 3.67891 21.0719 3.67891 20.625V17.7719C3.67891 14.9531 5.98203 12.6156 8.83516 12.6156H13.2695C16.0883 12.6156 18.4258 14.9187 18.4258 17.7719V20.625C18.4258 21.0375 18.7695 21.4156 19.2164 21.4156C19.6633 21.4156 20.007 21.0719 20.007 20.625V17.7719C19.9039 14.0937 16.9133 11.0687 13.2352 11.0687Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Email
                  </label>
                  <div className="relative">
                    <input
                      placeholder="Enter your email"
                      type="string"
                      maxlength="25"
                      {...register("email", {
                        required: "This is required.",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address.",
                        },
                        minLength: {
                          value: 3,
                          message: "This input exceed minLength.",
                        },
                        maxLength: {
                          value: 26,
                          message: "This input exceed maxLength.",
                        },
                      })}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="email"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type} className="text-[14px] text-red-600">
                            {message}
                          </p>
                        ))
                      }
                    />
                    <span className="absolute right-4 top-4">
                      <svg
                        className="fill-current"
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g opacity="0.5">
                          <path
                            d="M19.2516 3.30005H2.75156C1.58281 3.30005 0.585938 4.26255 0.585938 5.46567V16.6032C0.585938 17.7719 1.54844 18.7688 2.75156 18.7688H19.2516C20.4203 18.7688 21.4172 17.8063 21.4172 16.6032V5.4313C21.4172 4.26255 20.4203 3.30005 19.2516 3.30005ZM19.2516 4.84692C19.2859 4.84692 19.3203 4.84692 19.3547 4.84692L11.0016 10.2094L2.64844 4.84692C2.68281 4.84692 2.71719 4.84692 2.75156 4.84692H19.2516ZM19.2516 17.1532H2.75156C2.40781 17.1532 2.13281 16.8782 2.13281 16.5344V6.35942L10.1766 11.5157C10.4172 11.6875 10.6922 11.7563 10.9672 11.7563C11.2422 11.7563 11.5172 11.6875 11.7578 11.5157L19.8016 6.35942V16.5688C19.8703 16.9125 19.5953 17.1532 19.2516 17.1532Z"
                            fill=""
                          />
                        </g>
                      </svg>
                    </span>
                  </div>
                </div>

            
                {/* Passward */}
                <div className="mb-4">
                  <label className="mb-2.5 block font-medium text-black dark:text-white">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      maxLength={21}
                      {...register("password", {
                        required: "This is required.",
                        minLength: {
                          value: 8,
                          message: "Minimum eight charactors should be.",
                        },
                        maxLength: {
                          value: 20,
                          message: "This input exceed maxLength.",
                        },
                      })}
                      className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                    />
                    <ErrorMessage
                      errors={errors}
                      name="password"
                      render={({ messages }) =>
                        messages &&
                        Object.entries(messages).map(([type, message]) => (
                          <p key={type} className="text-[14px] text-red-600">
                            {message}
                          </p>
                        ))
                      }
                    />
                    {showPassword ? (
                      <div className=" absolute right-4 top-7 -translate-y-1/2 transform cursor-pointer">
                        <EyeIcon
                          onClick={togglePasswordVisibility}
                          className="bg-gray-200"
                        />
                      </div>
                    ) : (
                      <div className=" absolute right-4 top-7 -translate-y-1/2 transform cursor-pointer">
                        <EyeIcon
                          onClick={togglePasswordVisibility}
                          className="bg-gray-200"
                        />
                      </div>
                    )}
                  </div>
                </div>
                



             


                <div className="mb-5">
                  <input
                    type="submit"
                    value="Create account"
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
                  />
                </div>


                <div className="mt-6 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link href="/signin" className="text-primary">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
