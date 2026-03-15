"use client";

import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";

export default function LogoutButton() {
  const handleLogout = (e: React.MouseEvent) => {
    if (!confirm("Are you sure you want to logout?")) {
      e.preventDefault();
    }
  };

  return (
    <Link
      href="/"
      onClick={handleLogout}
      className="flex items-center text-red-300 gap-2 px-4 py-3 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
    >
      <FaSignOutAlt />
      Logout
    </Link>
  );
}