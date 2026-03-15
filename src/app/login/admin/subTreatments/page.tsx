"use client";

import { useEffect, useState } from "react";

type SubTreatment = {
  SubTreatmentTypeID: number;
  SubTreatmentTypeName: string;
  TreatmentTypeID: number;
  TreatmentTypeName?: string;
  Rate: number;
  IsActive: number;
  Description: string;
  UserID: number;
  AccountID?: number | null;
  Created?: string;
  Modified?: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export default function SubTreatmentsPage() {

  const [subTreatments, setSubTreatments] = useState<SubTreatment[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const initialForm: SubTreatment = {
    SubTreatmentTypeID: 1,
    SubTreatmentTypeName: "",
    TreatmentTypeID: 1,
    Rate: 0,
    IsActive: 1,
    Description: "",
    UserID: 1,
    AccountID: null
  };

  const [form, setForm] = useState<SubTreatment>(initialForm);

  // Fetch data
  const fetchSubTreatments = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/SubtreatmentTypes`);
      const data = await res.json();
      setSubTreatments(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchSubTreatments();
  }, []);

  // Handle form change
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  const resetForm = () => {
    setForm(initialForm);
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  // Submit form
  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const payload = {
      ...form,
      TreatmentTypeID: Number(form.TreatmentTypeID),
      Rate: Number(form.Rate),
      IsActive: 1,
      UserID: 1
    };

    const method = isEditing ? "PUT" : "POST";

    const url = isEditing
    ? `${BASE_URL}/api/SubtreatmentTypes/${editingId}`
    : `${BASE_URL}/api/SubtreatmentTypes`;

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    resetForm();
    fetchSubTreatments();
  };

  // Edit
  const handleEdit = (st: SubTreatment) => {

    setForm({
      ...st,
      Rate: Number(st.Rate),
      TreatmentTypeID: Number(st.TreatmentTypeID)
    });

    setEditingId(st.SubTreatmentTypeID);
    setIsEditing(true);
    setShowForm(true);
  };

  // Delete
  const handleDelete = async (id: number) => {

    if (!confirm("Delete this sub treatment?")) return;

    await fetch(`${BASE_URL}/api/SubtreatmentTypes/${id}`, {
      method: "DELETE"
    });

    fetchSubTreatments();
  };

  return (
    <div className="p-8">

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Sub Treatments
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage sub treatment types
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow"
        >
          + Add Sub Treatment
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">

            <tr>
              <th className="px-6 py-4 text-left">ID</th>
              <th className="px-6 py-4 text-left">Sub Treatment</th>
              <th className="px-6 py-4 text-left">Treatment</th>
              <th className="px-6 py-4 text-left">Rate</th>
              <th className="px-6 py-4 text-left">Description</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody className="divide-y divide-gray-200">

            {subTreatments.map((st) => (

              <tr key={st.SubTreatmentTypeID} className="hover:bg-gray-50">

                <td className="px-6 py-4 text-gray-500">
                  {st.SubTreatmentTypeID}
                </td>

                <td className="px-6 py-4 font-semibold text-gray-400">
                  {st.SubTreatmentTypeName}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {st.TreatmentTypeName}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  ₹ {st.Rate}
                </td>

                <td className="px-6 py-4 text-gray-500">
                  {st.Description}
                </td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => handleEdit(st)}
                    className="text-white mr-3 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(st.SubTreatmentTypeID)}
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
              {isEditing ? "Edit Sub Treatment" : "Add Sub Treatment"}
            </h2>

            <input
              name="SubTreatmentTypeName"
              placeholder="Sub Treatment Name"
              value={form.SubTreatmentTypeName}
              onChange={handleChange}
              required
              className="border p-2.5 w-full rounded-md text-white"
            />

            <input
              name="TreatmentTypeID"
              placeholder="Treatment ID"
              type="number"
              value={form.TreatmentTypeID}
              onChange={handleChange}
              required
              className="border p-2.5 w-full rounded-md text-white"
            />

            <input
              name="Rate"
              placeholder="Rate"
              type="number"
              value={form.Rate}
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