"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaUser } from "react-icons/fa";

export default function DoctorPatients() {
  const params = useParams();
  const doctorId = params.id;

  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const doctorRes = await fetch(`/api/Doctors/${doctorId}`);
        const doctor = await doctorRes.json();

        const hospitalId = doctor.HospitalID;

        const patientRes = await fetch(`/api/Patients`);
        const patientData = await patientRes.json();

        const hospitalPatients = patientData.filter(
          (p: any) => p.HospitalID === hospitalId
        );

        setPatients(hospitalPatients);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (doctorId) fetchData();
  }, [doctorId]);

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h1 className="text-2xl font-semibold text-gray-800">
          Patients
        </h1>

        <span className="text-sm text-gray-500">
          Total Patients: {patients.length}
        </span>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b text-gray-600 text-sm">

            <tr>
              <th className="text-left px-6 py-4">Patient</th>
              <th className="text-left px-6 py-4">Patient No</th>
              <th className="text-left px-6 py-4">Age</th>
              <th className="text-left px-6 py-4">Gender</th>
              <th className="text-left px-6 py-4">Blood</th>
              <th className="text-left px-6 py-4">Mobile</th>
              <th className="text-left px-6 py-4">City</th>
              <th className="text-left px-6 py-4">Registered</th>
            </tr>

          </thead>

          <tbody>

            {loading && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  Loading patients...
                </td>
              </tr>
            )}

            {!loading && patients.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  No patients found
                </td>
              </tr>
            )}

            {patients.map((p: any) => (
              <tr
                key={p.PatientID}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* Patient */}

                <td className="px-6 py-4 flex items-center gap-3">

                  <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <FaUser size={14} />
                  </div>

                  <div>
                    <p className="font-medium text-gray-400">
                      {p.PatientName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {p.Occupation || "—"}
                    </p>
                  </div>

                </td>

                {/* Patient Number */}

                <td className="px-6 py-4 text-gray-700">
                  #{p.PatientNo}
                </td>

                {/* Age */}

                <td className="px-6 py-4 text-gray-700">
                  {p.Age}
                </td>

                {/* Gender */}

                <td className="px-6 py-4 text-gray-700">
                  {p.Gender}
                </td>

                {/* Blood */}

                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded bg-red-50 text-red-600 font-medium">
                    {p.BloodGroup}
                  </span>
                </td>

                {/* Mobile */}

                <td className="px-6 py-4 text-gray-700">
                  {p.MobileNo}
                </td>

                {/* City */}

                <td className="px-6 py-4 text-gray-700">
                  {p.Address}
                </td>

                {/* Registration */}

                <td className="px-6 py-4 text-gray-500 text-sm">
                  {new Date(p.RegistrationDateTime).toLocaleDateString()}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}