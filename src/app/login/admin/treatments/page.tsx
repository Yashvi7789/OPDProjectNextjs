"use client";

import { useEffect, useState } from "react";

type Treatment = {
  TreatmentTypeID: number;
  TreatmentTypeName: string;
  TreatmentTypeShortName: string;
  HospitalID: number;
  HospitalName?: string;
  Description: string;
  UserID: number;
  Created: string;
  Modified: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:3000";

export default function TreatmentsPage() {

  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const initialForm: Treatment = {
    TreatmentTypeID: 0,
    TreatmentTypeName: "",
    TreatmentTypeShortName: "",
    HospitalID: 1,
    Description: "",
    UserID: 1,
    Created: "",
    Modified: ""
  };

  const [form, setForm] = useState<Treatment>(initialForm);

  // Fetch treatments
  const fetchTreatments = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/TreatmentTypes`);
      const data = await res.json();
      setTreatments(data);
    } catch (err) {
      console.error("Error fetching treatments", err);
    }
  };

  useEffect(() => {
    fetchTreatments();
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
  ? `${API_BASE}/api/TreatmentTypes/${editingId}`
  : `${API_BASE}/api/TreatmentTypes`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchTreatments();
  };

  const handleEdit = (treatment: Treatment) => {

    setForm(treatment);
    setEditingId(treatment.TreatmentTypeID);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {

    if (!confirm("Delete this treatment?")) return;

    await fetch(`${API_BASE}/api/TreatmentTypes/${id}`, {
      method: "DELETE",
    });

    fetchTreatments();
  };

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Treatments
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage treatment types
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow"
        >
          + Add Treatment
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">

            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Treatment</th>
              <th className="px-6 py-4 text-left">Short Name</th>
              <th className="px-6 py-4 text-left">Hospital</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody className="divide-y divide-gray-200">

            {treatments.map((t) => (

              <tr key={t.TreatmentTypeID} className="hover:bg-gray-50">

                <td className="px-6 py-4 text-gray-500">
                  {t.TreatmentTypeID}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-400">
                  {t.TreatmentTypeName}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {t.TreatmentTypeShortName}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {t.HospitalName}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {t.Description}
                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => handleEdit(t)}
                    className="text-white mr-3 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(t.TreatmentTypeID)}
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
            className="bg-white p-8 rounded-xl shadow-xl w-[420px] space-y-4"
          >

            <h2 className="text-xl font-semibold text-gray-400">
              {isEditing ? "Edit Treatment" : "Add Treatment"}
            </h2>

            <input
              name="TreatmentTypeName"
              placeholder="Treatment Name"
              value={form.TreatmentTypeName}
              onChange={handleChange}
              required
              className="border p-2.5 w-full rounded-md text-white"
            />

            <input
              name="TreatmentTypeShortName"
              placeholder="Short Name"
              value={form.TreatmentTypeShortName}
              onChange={handleChange}
              className="border p-2.5 w-full rounded-md text-white"
            />

            <input
              name="HospitalID"
              placeholder="Hospital ID"
              value={form.HospitalID}
              onChange={handleChange}
              required
              className="border p-2.5 w-full rounded-md text-white"
            />

            <textarea
              name="Description"
              placeholder="Description"
              value={form.Description}
              onChange={handleChange}
              className="border p-2.5 w-full rounded-md text-white"
            />

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