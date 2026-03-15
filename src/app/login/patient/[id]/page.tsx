"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FaUserInjured,
  FaEdit,
  FaSave,
  FaPhone,
  FaMapMarkerAlt,
  FaTint,
  FaUser,
  FaBriefcase,
  FaUserMd,
  FaBirthdayCake
} from "react-icons/fa";
import LogoutButton from "@/components/logoutbutton";

export default function PatientProfile() {

  const params = useParams();
  const id = params.id;

  const [editMode, setEditMode] = useState(false);
  const [patient, setPatient] = useState<any>({});

  useEffect(() => {

    async function fetchPatient() {

      const res = await fetch(`/api/Patients/${id}`);
      const data = await res.json();
      setPatient(data);

    }

    if (id) fetchPatient();

  }, [id]);

  const handleChange = (e: any) => {
    setPatient({ ...patient, [e.target.name]: e.target.value });
  };

  const updatePatient = async () => {

    await fetch(`/api/Patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    });

    alert("Patient Updated");
    setEditMode(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 mt-5">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-8 text-white flex justify-between items-center">

        <div className="flex items-center gap-4">

          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-indigo-600 text-xl">
            <FaUserInjured />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {patient.PatientName}
            </h2>

            <p className="opacity-80">
              Patient No: #{patient.PatientNo}
            </p>
          </div>

        </div>

        <button
          onClick={() => setEditMode(!editMode)}
          className="bg-white text-indigo-600 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-100"
        >
          <FaEdit />
          {editMode ? "Cancel" : "Edit"}
        </button>

      </div>

      {/* View Mode */}

      {!editMode && (

        <div className="grid grid-cols-2 gap-6">

          <Info icon={<FaBirthdayCake />} label="Age" value={patient.Age} />
          <Info icon={<FaUser />} label="Gender" value={patient.Gender} />
          <Info icon={<FaTint />} label="Blood Group" value={patient.BloodGroup} />
          <Info icon={<FaBriefcase />} label="Occupation" value={patient.Occupation} />
          <Info icon={<FaPhone />} label="Mobile" value={patient.MobileNo} />
          <Info icon={<FaMapMarkerAlt />} label="Address" value={patient.Address} />
          <Info icon={<FaUserMd />} label="Referred By" value={patient.ReferredBy} />
           
      <button>
        <LogoutButton/>
      </button>
        </div>
      )
      
      }

      

      {/* Edit Mode */}

      {editMode && (

        <div className="bg-white border rounded-xl p-6 space-y-4 shadow-sm">

          <div className="grid grid-cols-2 gap-4">

            <Input name="PatientName" value={patient.PatientName} onChange={handleChange}/>
            <Input name="Age" value={patient.Age} onChange={handleChange}/>
            <Input name="Gender" value={patient.Gender} onChange={handleChange}/>
            <Input name="BloodGroup" value={patient.BloodGroup} onChange={handleChange}/>
            <Input name="Occupation" value={patient.Occupation} onChange={handleChange}/>
            <Input name="MobileNo" value={patient.MobileNo} onChange={handleChange}/>
            <Input name="Address" value={patient.Address} onChange={handleChange}/>
            <Input name="ReferredBy" value={patient.ReferredBy} onChange={handleChange}/>

          </div>

          <button
            onClick={updatePatient}
            className="bg-green-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
          >
            <FaSave />
            Save Changes
          </button>

        </div>

      )}

    </div>
  );
}


/* Info Card */

function Info({ icon, label, value }: any) {

  return (
    <div className="bg-white border rounded-lg p-4 flex items-center gap-4 shadow-sm">

      <div className="bg-indigo-100 text-indigo-600 p-3 rounded-lg text-lg">
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-300">{value}</p>
      </div>

    </div>
  );
}


/* Input Field */

function Input({ name, value, onChange }: any) {

  return (
    <input
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={name}
      className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
    />
  );

}