// "use client";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";

// export default function AdminLogin() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const router = useRouter();

//   async function handleLogin() {
//     const res = await fetch("http://localhost:5000/api/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ username, password }),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       localStorage.setItem("admin-token", data.token);
//       router.push("/admin"); // redirect to protected admin page
//     } else {
//       setError("Login failed. Please check your credentials.");
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
//       <div className="bg-white shadow-md p-8 rounded-md w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6 text-black">Admin Login</h2>
//         <Input placeholder="Username"   value={username} onChange={(e) => setUsername(e.target.value)} className="mb-4 text-gray-900" />
//         <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4 text-gray-900" />
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <Button className="text-gray-50 bg-gray-600" onClick={handleLogin}>Login</Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const data={
    username: username,
    password: password,
  }
  
  const handleLogin = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
  localStorage.setItem("admin-token", data.username);
      console.log("Login success, redirecting...");
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <Input placeholder="write test for demo" value={username} onChange={(e) => setUsername(e.target.value)} className="mb-2" />
      <Input placeholder="Password- test for demo" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" />
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
}
