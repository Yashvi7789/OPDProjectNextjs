"use client";

import LogoutButton from "@/components/logoutbutton";
import Link from "next/link";
import { FaUserNurse, FaHospitalUser, FaArrowRight } from "react-icons/fa";

export default function ReceptionistHome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

      <div className="max-w-4xl w-full space-y-8">

        {/* Welcome Section */}

        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-10 shadow-xl flex items-center gap-6">

          <div className="bg-white text-blue-600 p-5 rounded-full text-3xl">
            <FaUserNurse />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Welcome Receptionist 👋
            </h1>

            <p className="text-blue-100 mt-2">
              Manage patient OPD entries quickly and efficiently.
            </p>
          </div>

        </div>

        {/* Navigation Card */}

        <Link
          href="/login/receptionist/opdEntry"
          className="block bg-white rounded-xl p-8 shadow hover:shadow-lg transition border"
        >

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="bg-indigo-100 text-indigo-600 p-4 rounded-lg text-xl">
                <FaHospitalUser />
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-400">
                  Go to OPD Entry
                </h2>

                <p className="text-gray-500 text-sm">
                  Register a new OPD patient
                </p>
              </div>

            </div>

            <FaArrowRight className="text-gray-400 text-xl" />

          </div>

        </Link>

      </div>

    </div>
  );
}