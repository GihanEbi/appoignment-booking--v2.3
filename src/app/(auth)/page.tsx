"use client";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import { sign_in_user } from "@/routes/auth/authRoutes";
import { saveToken } from "@/utils/auth-utils";
import { Loader } from "@/components/Loader/Loader";

const page = () => {
  const router = useRouter();

  // --------- form for user details ----------
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  // --------- form errors for user group details ----------
  const [formErrors, setFormErrors] = useState<any>({});
  // --------- state for loading spinner ---------
  const [loading, setLoading] = useState(false);

  // -------- handleChange for input fields ---------
  const handleChange = (value: string, name: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // -------- handleSubmit for form submission ---------
  const handleSubmit = async () => {
    // -------- prevent multiple submission
    if (loading) return;
    try {
      setLoading(true);
      const data = await sign_in_user(form);

      if (data.success) {
        saveToken(data.data.token);
        // Redirect to user dashboard or home page after successful login
        router.push("/user/appointments/ongoing_appointments");
      } else {
        console.log("Error:", data.message);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setFormErrors({ general: "Login failed. Please try again." });
    }
  };
  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/bg1.jpg')",
      }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg max-w-md w-full">
      {loading && (
        <div className="fixed top-1/2 left-1/2 z-[9999] -translate-x-1/2 -translate-y-1/2">
          <Loader size={40} className="text-blue-500" />
        </div>
      )}
        <h1 className="text-4xl font-bold text-center text-gray-800">Signin</h1>
        <div className="mt-4 space-y-4">
          <p className="text-gray-600 text-center">
            Please enter your credentials
          </p>
          <div className="space-y-2">
            <Label className="text-gray-700">Email</Label>
            <Input
              placeholder="Email"
              className="bg-white"
              onChange={(e) => handleChange(e.target.value, "email")}
              value={form.email}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-gray-700">Password</Label>
            <Input
              placeholder="Password"
              type="password"
              className="bg-white"
              onChange={(e) => handleChange(e.target.value, "password")}
              value={form.password}
            />
          </div>
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
            onClick={handleSubmit}
            disabled={loading}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
