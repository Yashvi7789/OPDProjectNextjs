"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Doctor = {
  DoctorID: number;
  DoctorName: string;
  HospitalName: string;
  PhotoURL: string;
  Specialization: string;
};

export default function DoctorSelectPage() {

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const router = useRouter();

  useEffect(() => {

    fetch("/api/Doctors")
      .then(res => res.json())
      .then(data => setDoctors(data));

  }, []);

  const selectDoctor = (id: number) => {
    router.push(`/login/doctor/${id}/dashboard`);
  };

  return (

    <div className="p-10 bg-gray-50 min-h-screen">

      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Select Doctor
      </h1>

      <p className="text-gray-500 mb-10">
        Choose which doctor you are
      </p>

      <div className="grid md:grid-cols-3 gap-6">

        {doctors.map((doc) => (

          <div
            key={doc.DoctorID}
            onClick={() => selectDoctor(doc.DoctorID)}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-400 transition-all duration-200 cursor-pointer p-6 flex items-center gap-4"
          >

            <img
              src={doc.PhotoURL}
              className="w-16 h-16 rounded-full object-cover border border-gray-200"
            />

            <div>

              <h2 className="font-semibold text-lg text-gray-300">
                {doc.DoctorName}
              </h2>

              <p className="text-sm text-gray-500">
                {doc.Specialization}
              </p>

              <p className="text-sm font-medium text-indigo-600">
                {doc.HospitalName}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}