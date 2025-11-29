import React from "react";
import Navbar from "../components/Navbar";

export default function AdminLayout({ children, logout }) {
  return (
    <div className="admin-layout">
      <Navbar logout={logout} />

      <div className="admin-content">
        {children}
      </div>
    </div>
  );
}
