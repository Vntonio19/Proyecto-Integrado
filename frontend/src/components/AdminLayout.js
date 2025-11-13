import React from "react";
import Navbar from "./Navbar";
import "./Static/DashboardAdmin.css";

export default function AdminLayout({ children, logout }) {
  return (
    <div className="admin-layout">
      <Navbar logout={logout} />
      <div className="admin-content">{children}</div>
    </div>
  );
}
