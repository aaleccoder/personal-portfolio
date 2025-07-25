"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { login } from "@/app/admin/actions";

interface User {
  name: string;
  email: string;
  $id: string;
}

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col bg-black/40 backdrop-blur-md p-5 rounded-md shadow-lg shadow-accent">
        <form className="flex flex-col space-y-5 font-sans">
          <input
            type="text"
            name={"email"}
            placeholder={"Email"}
            className="border p-4 rounded-md bg-black/30 "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name={"password"}
            placeholder={"Password"}
            className="border p-4 rounded-md bg-black/30 "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            formAction={login}
            type="submit"
            className="bg-primary shadow-md p-4 rounded-md mt-2 w-full"
          >
            Login
          </Button>
          {errorMessage && (
            <div className="text-red-500 text-sm mt-2 ">{errorMessage}</div>
          )}
        </form>
      </div>
    </div>
  );
};
