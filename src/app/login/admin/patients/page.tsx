"use client";

import { useEffect, useState } from "react";

type Patient = {
  PatientID: number;
  PatientName: string;
  PatientNo: number;
  RegistrationDateTime: string;
  Age: number;
  BloodGroup: string;
  Gender: string;
  Occupation: string;
  Address: string;
  HospitalID: number;
  HospitalName?: string;
  StateID: number;
  CityID: number;
  PinCode: string;
  MobileNo: string;
  ReferredBy: string;
  Description: string;
  UserID: number;
  EmergencyContactNo: string;
};

export default function PatientsPage() {

  const [patients, setPatients] = useState<Patient[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const initialForm: Patient = {
    PatientID: 0,
    PatientName: "",
    PatientNo: 0,
    RegistrationDateTime: "",
    Age: 0,
    BloodGroup: "",
    Gender: "",
    Occupation: "",
    Address: "",
    HospitalID: 1,
    StateID: 1,
    CityID: 1,
    PinCode: "",
    MobileNo: "",
    ReferredBy: "",
    Description: "",
    UserID: 1,
    EmergencyContactNo: "",
  };

  const [form, setForm] = useState<Patient>(initialForm);

  const fetchPatients = async () => {
    try {
      const res = await fetch("/api/Patients");
      const data = await res.json();
      setPatients(data);
    } catch (err) {
      console.error("Error fetching patients", err);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `/api/Patients/${editingId}`
      : "/api/Patients";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchPatients();
  };

  const handleEdit = (patient: Patient) => {
    setForm({
      ...patient,
      RegistrationDateTime: patient.RegistrationDateTime
        ? new Date(patient.RegistrationDateTime)
            .toISOString()
            .split("T")[0]
        : "",
    });

    setEditingId(patient.PatientID);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {

    if (!confirm("Delete this patient?")) return;

    await fetch(`/api/Patients/${id}`, {
      method: "DELETE",
    });

    fetchPatients();
  };

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Patients
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage patient registrations
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow"
        >
          + Add Patient
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">

            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Age</th>
              <th className="px-6 py-4 text-left">Gender</th>
              <th className="px-6 py-4 text-left">Hospital</th>
              <th className="px-6 py-4 text-left">Mobile</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody className="divide-y divide-gray-200">

            {patients.map((p) => (

              <tr key={p.PatientID} className="hover:bg-gray-50">

                <td className="px-6 py-4 text-gray-500">{p.PatientID}</td>

                <td className="px-6 py-4 font-semibold text-gray-400">
                  {p.PatientName}
                </td>

                <td className="px-6 py-4 text-gray-400">
                  {p.Age}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {p.Gender}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {p.HospitalName}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {p.MobileNo}
                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => handleEdit(p)}
                    className="text-white mr-3 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.PatientID)}
                    className="text-white mr-3 bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-[650px] space-y-4"
          >

            <h2 className="text-xl font-semibold text-gray-400">
              {isEditing ? "Edit Patient" : "Add Patient"}
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                name="PatientName"
                placeholder="Patient Name"
                value={form.PatientName}
                onChange={handleChange}
                required
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="PatientNo"
                placeholder="Patient No"
                value={form.PatientNo}
                onChange={handleChange}
                required
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="Age"
                placeholder="Age"
                value={form.Age}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="BloodGroup"
                placeholder="Blood Group"
                value={form.BloodGroup}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="Gender"
                placeholder="Gender"
                value={form.Gender}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="MobileNo"
                placeholder="Mobile"
                value={form.MobileNo}
                onChange={handleChange}
                required
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="EmergencyContactNo"
                placeholder="Emergency Contact"
                value={form.EmergencyContactNo}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="Occupation"
                placeholder="Occupation"
                value={form.Occupation}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="PinCode"
                placeholder="Pin Code"
                value={form.PinCode}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                name="ReferredBy"
                placeholder="Referred By"
                value={form.ReferredBy}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <textarea
                name="Address"
                placeholder="Address"
                value={form.Address}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white col-span-2"
              />

            </div>

            <div className="flex justify-end gap-3">

              <button
                type="button"
                onClick={resetForm}
                className="border px-4 py-2 rounded text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-5 py-2 rounded"
              >
                {isEditing ? "Update" : "Save"}
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}