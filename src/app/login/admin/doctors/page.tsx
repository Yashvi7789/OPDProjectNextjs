"use client";

import { useEffect, useState } from "react";

type Doctor = {
  DoctorID: number;
  DoctorName: string;
  Qualification: string;
  Specialization: string;
  Phone: string;
  Email?: string | null;
  ConsultationFee: string | number;
  OPDStartTime: string;
  OPDEndTime: string;
  HospitalID: number;
  HospitalName?: string;
  PhotoURL?: string;
  IsActive: number;
  Created: string;
  Modified: string;
};

type Hospital = {
  HospitalID: number;
  HospitalName: string;
};

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    DoctorName: "",
    Qualification: "",
    Specialization: "",
    Phone: "",
    Email: "",
    ConsultationFee: "",
    OPDStartTime: "",
    OPDEndTime: "",
    PhotoURL: "",
    HospitalID: ""
  });

  useEffect(() => {
    fetchDoctors();
    fetchHospitals();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await fetch("/api/Doctors");
      const data = await res.json();
      setDoctors(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchHospitals = async () => {
    try {
      const res = await fetch("/api/Hospitals");
      const data = await res.json();
      setHospitals(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Really remove this doctor?")) return;

    try {
      const res = await fetch(`/api/Doctors/${id}`, { method: "DELETE" });

      if (!res.ok) throw new Error("Delete failed");

      setDoctors((prev) => prev.filter((d) => d.DoctorID !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleAddDoctor = async (e: any) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/Doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          HospitalID: Number(form.HospitalID)
        })
      });

      if (!res.ok) throw new Error("Doctor creation failed");

      setShowForm(false);

      setForm({
        DoctorName: "",
        Qualification: "",
        Specialization: "",
        Phone: "",
        Email: "",
        ConsultationFee: "",
        OPDStartTime: "",
        OPDEndTime: "",
        PhotoURL: "",
        HospitalID: ""
      });

      fetchDoctors();
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/70 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-10 flex justify-between items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              Doctor Master
            </h1>
            <p className="mt-3 text-gray-600 text-lg">
              Our specialist team providing quality care
            </p>
          </div>

          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
          >
            + Add Doctor
          </button>
        </div>

        {/* ADD DOCTOR FORM */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-2xl w-[650px] p-8">

              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Add New Doctor
              </h2>

              <form
                onSubmit={handleAddDoctor}
                className="grid grid-cols-2 gap-4"
              >

                <input
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  placeholder="Doctor Name"
                  required
                  value={form.DoctorName}
                  onChange={(e) =>
                    setForm({ ...form, DoctorName: e.target.value })
                  }
                />

                <input
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  placeholder="Qualification"
                  required
                  value={form.Qualification}
                  onChange={(e) =>
                    setForm({ ...form, Qualification: e.target.value })
                  }
                />

                <input
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  placeholder="Specialization"
                  required
                  value={form.Specialization}
                  onChange={(e) =>
                    setForm({ ...form, Specialization: e.target.value })
                  }
                />

                <input
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  placeholder="Phone"
                  required
                  value={form.Phone}
                  onChange={(e) =>
                    setForm({ ...form, Phone: e.target.value })
                  }
                />

                <input
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  placeholder="Email"
                  value={form.Email}
                  onChange={(e) =>
                    setForm({ ...form, Email: e.target.value })
                  }
                />

                <input
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  placeholder="Consultation Fee"
                  required
                  value={form.ConsultationFee}
                  onChange={(e) =>
                    setForm({ ...form, ConsultationFee: e.target.value })
                  }
                />

                <input
                  type="time"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  required
                  value={form.OPDStartTime}
                  onChange={(e) =>
                    setForm({ ...form, OPDStartTime: e.target.value })
                  }
                />

                <input
                  type="time"
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 text-gray-400"
                  required
                  value={form.OPDEndTime}
                  onChange={(e) =>
                    setForm({ ...form, OPDEndTime: e.target.value })
                  }
                />

                {/* PHOTO URL */}
                <div className="col-span-2">
                  <input
                    className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 w-full text-gray-400"
                    placeholder="Photo URL"
                    value={form.PhotoURL}
                    onChange={(e) =>
                      setForm({ ...form, PhotoURL: e.target.value })
                    }
                  />

                  {form.PhotoURL && (
                    <div className="mt-4 flex justify-center">
                      <img
                        src={form.PhotoURL}
                        alt="Preview"
                        className="h-40 w-40 object-cover rounded-xl border shadow"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://ui-avatars.com/api/?name=Doctor&background=6366f1&color=fff&size=128";
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* HOSPITAL DROPDOWN */}
                <select
                  className="border rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 col-span-2 text-gray-400"
                  required
                  value={form.HospitalID}
                  onChange={(e) =>
                    setForm({ ...form, HospitalID: e.target.value })
                  }
                >
                  <option value="">Select Hospital</option>

                  {hospitals.map((hospital) => (
                    <option
                      key={hospital.HospitalID}
                      value={hospital.HospitalID}
                    >
                      {hospital.HospitalName}
                    </option>
                  ))}
                </select>

                <div className="col-span-2 flex justify-end gap-4 mt-4">

                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    Save Doctor
                  </button>

                </div>
              </form>
            </div>
          </div>
        )}

        {/* DOCTOR CARDS */}
        {doctors.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-xl">
            No doctors found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {doctors.map((doctor) => (
              <div
                key={doctor.DoctorID}
                className="bg-white rounded-2xl shadow-md border border-gray-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-64 relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                  <img
                    src={doctor.PhotoURL || ""}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">

                  <h3 className="text-xl font-bold text-gray-500 mb-1">
                    {doctor.DoctorName}
                  </h3>

                  <div className="text-indigo-600 font-semibold text-lg mb-4">
                    {doctor.Specialization}
                  </div>

                  <div className="space-y-3 text-sm text-gray-700 flex-grow">

                    <div className="flex justify-between">
                      <span>Qualification</span>
                      <span>{doctor.Qualification}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Hospital</span>
                      <span>{doctor.HospitalName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Fee</span>
                      <span>₹{doctor.ConsultationFee}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>OPD Hours</span>
                      <span>
                        {doctor.OPDStartTime.slice(0, 5)} – {doctor.OPDEndTime.slice(0, 5)}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Phone</span>
                      <span>{doctor.Phone}</span>
                    </div>

                  </div>

                  <button
                    onClick={() => handleDelete(doctor.DoctorID)}
                    className="mt-7 flex items-center justify-center gap-2 w-full py-3 px-5 bg-red-50 hover:bg-red-100 text-red-700 font-medium rounded-xl border border-red-200 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300/50"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>

                    Remove Doctor
                  </button>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}