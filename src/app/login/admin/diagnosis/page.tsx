"use client";

import { useEffect, useState } from "react";

type Diagnosis = {
  DiagnosisTypeID: number;
  DiagnosisTypeName: string;
  DiagnosisTypeShortName: string;
  Description: string;
  HospitalID: number;
  HospitalName?: string;
  PhotoURL?: string;
  UserID: number;
  Created: string;
  Modified: string;
};

type Hospital = {
  HospitalID: number;
  HospitalName: string;
};

export default function DiagnosisPage() {

  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const initialForm = {
    DiagnosisTypeID: 0,
    DiagnosisTypeName: "",
    DiagnosisTypeShortName: "",
    Description: "",
    HospitalID: "",
    PhotoURL: "",
    UserID: 1,
  };

  const [form, setForm] = useState<any>(initialForm);

  // Fetch Diagnosis
  const fetchDiagnosis = async () => {

    const res = await fetch("/api/DiagnosisTypes");
    const data = await res.json();

    setDiagnosis(data);
    setLoading(false);

  };

  // Fetch Hospitals
  const fetchHospitals = async () => {

    const res = await fetch("/api/Hospitals");
    const data = await res.json();

    setHospitals(data);

  };

  useEffect(() => {

    fetchDiagnosis();
    fetchHospitals();

  }, []);

  const handleChange = (e: any) => {

    const { name, value } = e.target;

    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));

  };

  // Add / Update
  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const method = editing ? "PUT" : "POST";

    const url = editing
      ? `/api/DiagnosisTypes/${form.DiagnosisTypeID}`
      : "/api/DiagnosisTypes";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        HospitalID: Number(form.HospitalID)
      }),
    });

    setShowForm(false);
    setEditing(false);
    setForm(initialForm);

    fetchDiagnosis();

  };

  // Delete
  const handleDelete = async (id: number) => {

    if (!confirm("Delete this diagnosis?")) return;

    await fetch(`/api/DiagnosisTypes/${id}`, {
      method: "DELETE",
    });

    setDiagnosis((prev) =>
      prev.filter((d) => d.DiagnosisTypeID !== id)
    );

  };

  // Edit
  const handleEdit = (d: Diagnosis) => {

    setEditing(true);

    setForm({
      ...d,
      HospitalID: d.HospitalID?.toString() || ""
    });

    setShowForm(true);

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin h-12 w-12 border-t-4 border-indigo-600 rounded-full"></div>
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-50 py-10 px-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-3xl font-bold text-gray-900">
            Diagnosis Master
          </h1>

          <p className="text-gray-500">
            Manage diagnosis records
          </p>

        </div>

        <button
          onClick={() => {
            setEditing(false);
            setForm(initialForm);
            setShowForm(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Diagnosis
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

        {diagnosis.map((d) => (

          <div
            key={d.DiagnosisTypeID}
            className="bg-white rounded-xl shadow border hover:shadow-lg transition overflow-hidden"
          >

            {/* Image */}

            <div className="h-50 bg-gray-100">

              {d.PhotoURL && (
                <img
                  src={d.PhotoURL}
                  className="w-full h-full object-cover"
                />
              )}

            </div>

            {/* Content */}

            <div className="p-5 space-y-2">

              <h2 className="text-xl font-semibold text-gray-400">
                {d.DiagnosisTypeName}
              </h2>

              <p className="text-sm text-indigo-600 font-medium">
                Code: {d.DiagnosisTypeShortName}
              </p>

              <p className="text-gray-600 text-sm">
                {d.Description}
              </p>

              <div className="text-sm text-gray-500">

                Hospital:

                <span className="font-medium text-gray-700 ml-1">
                  {d.HospitalName}
                </span>

              </div>

              <div className="text-xs text-gray-400 pt-2">
                Created: {new Date(d.Created).toLocaleDateString()}
              </div>

              {/* Actions */}

              <div className="flex gap-2 pt-3">

                <button
                  onClick={() => handleEdit(d)}
                  className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg border border-blue-200 hover:bg-blue-100"
                >
                  Update
                </button>

                <button
                  onClick={() => handleDelete(d.DiagnosisTypeID)}
                  className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg border border-red-200 hover:bg-red-100"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-[420px] space-y-4"
          >

            <h2 className="text-xl font-semibold text-gray-400">
              {editing ? "Update Diagnosis" : "Add Diagnosis"}
            </h2>

            <input
              name="DiagnosisTypeName"
              placeholder="Diagnosis Name"
              required
              value={form.DiagnosisTypeName}
              onChange={handleChange}
              className="border p-2.5 w-full rounded-md text-white"
            />

            <input
              name="DiagnosisTypeShortName"
              placeholder="Short Name"
              value={form.DiagnosisTypeShortName}
              onChange={handleChange}
              className="border p-2.5 w-full rounded-md text-white"
            />

            <textarea
              name="Description"
              placeholder="Description"
              value={form.Description}
              onChange={handleChange}
              className="border p-2.5 w-full rounded-md text-white"
            />

            {/* Hospital Dropdown */}

            <select
              name="HospitalID"
              required
              value={form.HospitalID}
              onChange={handleChange}
              className="border p-2.5 w-full rounded-md text-gray-400"
            >

              <option value="">Select Hospital</option>

              {hospitals.map((h) => (

                <option key={h.HospitalID} value={h.HospitalID}>
                  {h.HospitalName}
                </option>

              ))}

            </select>

            <input
              name="PhotoURL"
              placeholder="Photo URL"
              value={form.PhotoURL || ""}
              onChange={handleChange}
              className="border p-2.5 w-full rounded-md text-white"
            />

            {form.PhotoURL && (
              <img
                src={form.PhotoURL}
                alt="Preview"
                className="w-full h-40 object-cover rounded-lg border"
              />
            )}

            <div className="flex justify-end gap-3 pt-3">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded-md text-white hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded-md"
              >
                {editing ? "Update" : "Save"}
              </button>

            </div>

          </form>

        </div>

      )}

    </div>

  );

}