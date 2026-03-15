"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaUserMd,
  FaEnvelope,
  FaPhone,
  FaHospital,
  FaEdit,
  FaSave,
  FaGraduationCap,
  FaStethoscope,
} from "react-icons/fa";

export default function DoctorProfile() {
  const params = useParams();
  const doctorId = params.id;

  const [editMode, setEditMode] = useState(false);

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    qualification: "",
    hospital: "",
    fee: "",
    photo: "",
  });

  useEffect(() => {
    async function fetchDoctor() {
      try {
        const res = await fetch(`/api/Doctors/${doctorId}`);
        const data = await res.json();

        setDoctor({
          name: data.DoctorName || "",
          email: data.Email || "",
          phone: data.Phone || "",
          specialization: data.Specialization || "",
          qualification: data.Qualification || "",
          hospital: data.HospitalName || "",
          fee: data.ConsultationFee || "",
          photo: data.PhotoURL || "",
        });
      } catch (error) {
        console.log(error);
      }
    }

    if (doctorId) fetchDoctor();
  }, [doctorId]);

  const handleChange = (e: any) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await fetch(`/api/Doctors/${doctorId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(doctor),
      });

      alert("Profile Updated Successfully");
      setEditMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* Banner */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">

        <div className="flex justify-between items-start">

          <div className="flex items-center gap-6">

            {/* Doctor Image */}

            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">

              {doctor.photo ? (
                <img
                  src={doctor.photo}
                  alt="doctor"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white flex items-center justify-center text-indigo-600 text-3xl">
                  <FaUserMd />
                </div>
              )}

            </div>

            {/* Name */}

            <div>

              <h2 className="text-3xl font-bold">
                {doctor.name || "Doctor Name"}
              </h2>

              <p className="opacity-90 flex items-center gap-2 mt-1">
                <FaStethoscope />
                {doctor.specialization}
              </p>

              <p className="opacity-80 text-sm flex items-center gap-2 mt-1">
                <FaGraduationCap />
                {doctor.qualification}
              </p>

            </div>

          </div>

          {/* Edit Button */}

          <button
            onClick={() => setEditMode(!editMode)}
            className="bg-white text-gray-300 px-5 py-2 rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition"
          >
            <FaEdit />
            {editMode ? "Cancel" : "Edit Profile"}
          </button>

        </div>

      </div>

      {/* Information Cards */}

      {!editMode && (

        <div className="grid grid-cols-2 gap-6">

          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">

            <div className="bg-indigo-100 p-3 rounded-lg text-indigo-600">
              <FaEnvelope />
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{doctor.email}</p>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">

            <div className="bg-green-100 p-3 rounded-lg text-green-600">
              <FaPhone />
            </div>

            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{doctor.phone}</p>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">

            <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
              <FaHospital />
            </div>

            <div>
              <p className="text-sm text-gray-500">Hospital</p>
              <p className="font-medium">{doctor.hospital}</p>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6 flex items-center gap-4">

            <div className="bg-yellow-100 p-3 rounded-lg text-yellow-600">
              ₹
            </div>

            <div>
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="font-medium">₹{doctor.fee}</p>
            </div>

          </div>

        </div>

      )}

      {/* Edit Form */}

      {editMode && (

        <div className="bg-white rounded-xl shadow-lg border p-8 space-y-6">

          <h3 className="text-xl font-semibold text-gray-400">
            Edit Profile
          </h3>

          <div className="grid grid-cols-2 gap-6">

            <input
              name="name"
              value={doctor.name}
              onChange={handleChange}
              placeholder="Doctor Name"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              placeholder="Specialization"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="qualification"
              value={doctor.qualification}
              onChange={handleChange}
              placeholder="Qualification"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="hospital"
              value={doctor.hospital}
              onChange={handleChange}
              placeholder="Hospital"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="email"
              value={doctor.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="phone"
              value={doctor.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="fee"
              value={doctor.fee}
              onChange={handleChange}
              placeholder="Consultation Fee"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

            <input
              name="photo"
              value={doctor.photo}
              onChange={handleChange}
              placeholder="Photo URL"
              className="border p-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          <button
            onClick={handleUpdate}
            className="bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-green-700 transition"
          >
            <FaSave />
            Update Profile
          </button>

        </div>

      )}

    </div>
  );
}