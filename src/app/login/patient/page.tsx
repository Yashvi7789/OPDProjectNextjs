"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaUserInjured, FaPhone } from "react-icons/fa";

export default function PatientSelectPage() {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPatients() {
      const res = await fetch("/api/Patients");
      const data = await res.json();
      setPatients(data);
    }

    fetchPatients();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      <h1 className="text-3xl font-semibold text-gray-300 mt-5">
        Select Patient
      </h1>

      <div className="grid grid-cols-3 gap-6">

        {patients.map((p) => (

          <Link
            key={p.PatientID}
            href={`/login/patient/${p.PatientID}`}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >

            <div className="flex items-center gap-4">

              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                <FaUserInjured />
              </div>

              <div>
                <p className="font-semibold text-gray-200">
                  {p.PatientName}
                </p>

                <p className="text-sm text-gray-500">
                  #{p.PatientNo}
                </p>
              </div>

            </div>

            <div className="mt-4 text-sm text-gray-400 flex items-center gap-2">
              <FaPhone />
              {p.MobileNo}
            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}