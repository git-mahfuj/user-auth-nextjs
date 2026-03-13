/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface User {
  name?: string;
  email?: string;
  idAdmin?: boolean;
  isVerified?: boolean;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

const Profilepage = () => {
  const [user, setUser] = useState<User>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/api/user-details");

        if (response.data) {
          setUser(response.data.user || response.data);
          toast.success("User ");
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchedUser();
  }, []);

  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await axios.get("/api/logout");
      if (res) {
        toast.success("Logout SuccessFully");
        router.push("/");
      }
    } catch (error: any) {
      toast.error("Server Error While Logout");
    }
  };
  console.log(user);
  return (
    <div className="flex flex-col justify-center items-center translate-y-10 gap-5">
      <h1 className="text-5xl font-medium">Profilepage</h1>
      <h2 className="font-medium text-4xl">Welcome : {user.name}</h2>
      <Button onClick={handleLogout} className={"p-5"}> Logout </Button>
    </div>
  );
};

export default Profilepage;
