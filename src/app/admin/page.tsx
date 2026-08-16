"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "changeme";
    if (password === adminPassword) {
      sessionStorage.setItem("limbs-admin", "true");
      router.push("/admin/dashboard");
    } else {
      setError(true);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-20">
      <h1
        className="text-4xl text-white mb-8 text-center"
        style={{ fontFamily: "var(--font-cormorant)" }}
      >
        Admin
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          className="input-field"
          autoFocus
        />
        {error && (
          <p className="text-xs text-red-400">Incorrect password</p>
        )}
        <button type="submit" className="btn-primary w-full">
          Login
        </button>
      </form>
    </div>
  );
}