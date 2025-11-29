import React from "react";
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import "../Styles/user/UserLayout.css";

export default function UserLayout({ children }) {
  return (
    <div className="user-layout">
      <UserSidebar />
      <div className="user-content">
        <Header />
        <main className="user-main">{children}</main>
      </div>
    </div>
  );
}
