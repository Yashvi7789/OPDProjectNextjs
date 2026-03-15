"use client";

import LogoutButton from "@/components/logoutbutton";
import Link from "next/link";
import { useState } from "react";
import {
  FaNotesMedical,
  FaFileInvoice,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

export default function BillingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

        {/* Brand */}
        <div className="p-6 border-b border-slate-800/60">
          <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            OPD Billing
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 space-y-1.5 text-sm font-medium">

          {[
            {
              href: "/login/billingstaff",
              label: "Dashboard",
              icon: MdDashboard,
            },
            {
              href: "/login/billingstaff/opdEntry",
              label: "OPD Entry",
              icon: FaNotesMedical,
            },
            {
              href: "/login/billingstaff/receiptEntry",
              label: "Receipt Entry",
              icon: FaFileInvoice,
            },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                hover:bg-slate-800/60 hover:shadow-md hover:translate-x-1 group
                text-white
              `}
            >
              <item.icon
                className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                size={18}
              />
              <span>{item.label}</span>
            </Link>
          ))}
        <LogoutButton/>
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

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">

        {/* Top Navbar */}
        <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

            <h1 className="text-xl sm:text-2xl font-semibold text-gray-500">
              OPD Management System
            </h1>

            <div className="flex items-center gap-4">

              <div className="text-sm text-gray-600 hidden sm:block">
                Billing Panel • Rajkot
              </div>

              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-md">
                B
              </div>

            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}