"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaHospital,
  FaUserMd,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaStethoscope,
  FaPills,
  FaProcedures,
  FaClipboardList
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = (e: any) => {
    const confirmLogout = confirm("Are you sure you want to logout?");
    if (!confirmLogout) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">

      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-white rounded-lg shadow-md text-gray-700"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 w-72 bg-gradient-to-b from-slate-900 to-slate-950
          transform transition-transform duration-300 ease-in-out lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 border-r border-slate-800/60 shadow-2xl
        `}
      >

        {/* Logo */}
        <div className="p-6 border-b border-slate-800/60">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            OPD Admin
          </div>
        </div>

        {/* Menu */}
        <nav className="flex flex-col p-4 space-y-1.5 text-sm font-medium">

          <Link href="/login/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <MdDashboard className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Dashboard</span>
          </Link>

          <Link href="/login/admin/hospitals"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaHospital className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Hospitals</span>
          </Link>

          <Link href="/login/admin/doctors"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaUserMd className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Doctors</span>
          </Link>

          <Link href="/login/admin/patients"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaUsers className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Patients</span>
          </Link>

          <Link href="/login/admin/diagnosis"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaStethoscope className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Diagnosis</span>
          </Link>

          <Link href="/login/admin/treatments"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaPills className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Treatments</span>
          </Link>

          <Link href="/login/admin/subTreatments"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaProcedures className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Sub Treatments</span>
          </Link>

          <Link href="/login/admin/opdEntry"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaClipboardList className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>OPD Entry</span>
          </Link>

          <Link href="/login/admin/receiptEntry"
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white">
            <FaClipboardList className="text-indigo-400 group-hover:text-indigo-300 transition-colors" size={18} />
            <span>Receipt Entry</span>
          </Link>

          <Link
            href="/"
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-red-600/20 hover:shadow-md hover:translate-x-1 group active:scale-98 text-white"
          >
            <FaSignOutAlt className="text-red-400 group-hover:text-red-300 transition-colors" size={18} />
            <span className="text-red-400 group-hover:text-red-300">Log Out</span>
          </Link>

        </nav>

        {/* Footer */}
        <div className="mt-auto p-6 border-t border-slate-800/60 text-xs text-slate-400">
          <div>Version 1.0</div>
          <div className="mt-1">© {new Date().getFullYear()} OPD System</div>
        </div>

      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">

        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl sm:text-2xl font-semibold text-gray-500">
              OPD Management System
            </h1>

            <div className="flex items-center gap-4">

              <div className="text-sm text-gray-600 hidden sm:block">
                Admin Panel • Rajkot
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
                A
              </div>

            </div>

          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
}