"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { toast } from "react-toastify";

export default async function LoginVendor(data) {
  console.log("data:", data)
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}login`,
      data,
    );
    console.log("res:", response.data);

    const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    if (response.data.status == "success") {
    
      cookies.set({
        name: "id",
        value: response.data.user.id,
        expires: expiryTime,
        httpOnly: true,
        sameSite: "Lax", // Or 'Strict' for enhanced security
      })
      
      cookies().set({
        name: "token",
        value: response.data.token,
        expires: expiryTime,
        httpOnly: true,
        sameSite: "Lax", // Or 'Strict' for enhanced security
      });
      

      console.log(response.data);
      return response.data;
    } else {
      console.log("error");
      toast.error(response.data.message)
      return response.data.message;
    }
  } catch (error) {
    console.error("Login Error:", error);
    // Handle the error appropriately, potentially return an error response
    throw error; // Or re-throw to allow for centralized error handling
  }
}

export async function LogoutVendor() {
  const token = cookies().get("token").value;
  console.log("LogoutVendor:", token);
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_BASE_URL}logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(response.data);
  cookies().delete("id");
  cookies().delete("token");
  console.log("logout res:", response);
  return response.data;
}



export async function getToken(){
  const token = cookies().get("token").value;
  
  return token;

}
