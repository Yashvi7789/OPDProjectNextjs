"use client";

import { useEffect, useState } from "react";

type Hospital = {
  HospitalID: number;
  HospitalName: string;
  RegistrationCharge: string;
  RegistrationValidityMonths: number;
  OpeningDate: string;
  OpeningPatientNo: number;
  OpeningOPDNo: number;
  OpeningReceiptNo: number;
  Address: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function HospitalsPage() {

  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const initialForm = {
    HospitalName: "",
    RegistrationCharge: "",
    RegistrationValidityMonths: "",
    OpeningDate: "",
    OpeningPatientNo: "",
    OpeningOPDNo: "",
    OpeningReceiptNo: "",
    Address: ""
  };

  const [form, setForm] = useState(initialForm);

  const fetchHospitals = async () => {
    try {

      const res = await fetch(`${BASE_URL}/api/Hospitals`);
      const data = await res.json();

      setHospitals(data);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHospitals();
  }, []);

  const handleChange = (e: any) => {

    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

  };

  const resetForm = () => {

    setForm(initialForm);
    setIsEditing(false);
    setEditingId(null);
    setShowForm(false);

  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    try {

      const method = isEditing ? "PUT" : "POST";

      const url = isEditing
        ? `${BASE_URL}/api/Hospitals/${editingId}`
        : `${BASE_URL}/api/Hospitals`;


      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...form,
          UserID: 1
        })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      resetForm();
      fetchHospitals();

    } catch (err) {
      console.error(err);
    }

  };

  const handleEdit = (h: Hospital) => {

    setForm({
      HospitalName: h.HospitalName || "",
      RegistrationCharge: h.RegistrationCharge || "",
      RegistrationValidityMonths: h.RegistrationValidityMonths?.toString() || "",
      OpeningDate: h.OpeningDate
        ? new Date(h.OpeningDate).toISOString().split("T")[0]
        : "",
      OpeningPatientNo: h.OpeningPatientNo?.toString() || "",
      OpeningOPDNo: h.OpeningOPDNo?.toString() || "",
      OpeningReceiptNo: h.OpeningReceiptNo?.toString() || "",
      Address: h.Address || ""
    });

    setEditingId(h.HospitalID);
    setIsEditing(true);
    setShowForm(true);

  };

  const handleDelete = async (id: number) => {

    if (!confirm("Delete hospital?")) return;

    try {

      const res = await fetch(`${BASE_URL}/api/Hospitals/${id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      fetchHospitals();

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Hospital Master
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage hospital information and configuration
          </p>

        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium shadow"
        >
          + Add Hospital
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Hospital</th>
              <th className="px-6 py-4 text-left">Charge</th>
              <th className="px-6 py-4 text-left">Opening Date</th>
              <th className="px-6 py-4 text-left">Address</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">

            {hospitals.map((h) => (
              <tr key={h.HospitalID} className="hover:bg-gray-50">

                <td className="px-6 py-4 font-medium text-gray-700">
                  {h.HospitalID}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-500">
                  {h.HospitalName}
                </td>

                <td className="px-6 py-4 text-blue-600 font-medium">
                  ₹ {h.RegistrationCharge}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {new Date(h.OpeningDate).toLocaleDateString()}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {h.Address}
                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => handleEdit(h)}
                    className="text-white mr-3 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(h.HospitalID)}
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

      {/* Form Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center mt-7">

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-[650px] space-y-4"
          >

            <h2 className="text-xl font-semibold text-gray-400">
              {isEditing ? "Edit Hospital" : "Add Hospital"}
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                name="HospitalName"
                placeholder="Hospital Name"
                value={form.HospitalName}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2.5 w-full rounded-md text-white col-span-2"
              />

              <input
                name="RegistrationCharge"
                placeholder="Registration Charge"
                value={form.RegistrationCharge}
                onChange={handleChange}
                className="border border-gray-300 p-2.5 w-full rounded-md text-white"
              />

              <input
                name="RegistrationValidityMonths"
                placeholder="Validity Months"
                value={form.RegistrationValidityMonths}
                onChange={handleChange}
                className="border border-gray-300 p-2.5 w-full rounded-md text-white"
              />

              <input
                type="date"
                name="OpeningDate"
                value={form.OpeningDate}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2.5 w-full rounded-md text-white"
              />

              <input
                name="OpeningPatientNo"
                placeholder="Opening Patient No"
                value={form.OpeningPatientNo}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2.5 w-full rounded-md text-white"
              />

              <input
                name="OpeningOPDNo"
                placeholder="Opening OPD No"
                value={form.OpeningOPDNo}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2.5 w-full rounded-md text-white"
              />

              <input
                name="OpeningReceiptNo"
                placeholder="Opening Receipt No"
                value={form.OpeningReceiptNo}
                onChange={handleChange}
                required
                className="border border-gray-300 p-2.5 w-full rounded-md text-white"
              />

              <input
                name="Address"
                placeholder="Address"
                value={form.Address}
                onChange={handleChange}
                className="border border-gray-300 p-2.5 w-full rounded-md text-white col-span-2"
              />

            </div>

            <div className="flex justify-end gap-3 pt-3">

              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-400 text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md text-white"
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