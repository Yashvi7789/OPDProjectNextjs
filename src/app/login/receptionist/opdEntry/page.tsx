"use client";

import LogoutButton from "@/components/logoutbutton";
import { useEffect, useState } from "react";

type Patient = {
  PatientID: number;
  PatientName: string;
};

type DiagnosisType = {
  DiagnosisTypeID: number;
  DiagnosisTypeName: string;
};

type Doctor = {
  DoctorID: number;
  DoctorName: string;
};

type OPD = {
  OPDID: number;
  OPDNo: string;
  OPDDateTime: string;
  PatientID: number;
  PatientName?: string;
  DoctorName?: string;
  TreatedByDoctorID: number;
  RegistrationFee: number;
  Description: string;
};

export default function OPDEntryPage() {

  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnosisTypes, setDiagnosisTypes] = useState<DiagnosisType[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [opdList, setOpdList] = useState<OPD[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const initialForm = {
    OPDNo: "",
    OPDDateTime: "",
    PatientID: "",
    TreatedByDoctorID: "",
    RegistrationFee: "",
    Description: "",
    DiagnosisTypeID: "",
    DiagnosisDescription: ""
  };

  const [form, setForm] = useState(initialForm);

  const fetchPatients = async () => {
    const res = await fetch("/api/Patients");
    const data = await res.json();
    setPatients(data);
  };

  const fetchDiagnosisTypes = async () => {
    const res = await fetch("/api/DiagnosisTypes");
    const data = await res.json();
    setDiagnosisTypes(data);
  };

  const fetchDoctors = async () => {
    const res = await fetch("/api/Doctors");
    const data = await res.json();
    setDoctors(data);
  };

  const fetchOPD = async () => {
    const res = await fetch("/api/Opd");
    const data = await res.json();
    setOpdList(data);
  };

  useEffect(() => {
    fetchPatients();
    fetchDiagnosisTypes();
    fetchDoctors();
    fetchOPD();
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
    setShowForm(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: any) => {

    e.preventDefault();

    const method = isEditing ? "PUT" : "POST";

    const url = isEditing
      ? `/api/Opd/${editingId}`
      : "/api/Opd";

    const opdRes = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        OPDNo: form.OPDNo,
        OPDDateTime: form.OPDDateTime,
        PatientID: Number(form.PatientID),
        TreatedByDoctorID: Number(form.TreatedByDoctorID),
        RegistrationFee: Number(form.RegistrationFee),
        Description: form.Description,
        UserID: 1
      })
    });

    const opdData = await opdRes.json();

    const newOPDID = isEditing ? editingId : opdData.OPDID;

    if (form.DiagnosisTypeID) {

      await fetch("/api/OpdDiagnosisTypes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          OPDID: newOPDID,
          DiagnosisTypeID: Number(form.DiagnosisTypeID),
          Description: form.DiagnosisDescription,
          UserID: 1
        })
      });

    }

    resetForm();
    fetchOPD();
  };

  const handleEdit = (opd: OPD) => {

    setForm({
      OPDNo: opd.OPDNo,
      OPDDateTime: opd.OPDDateTime
        ? new Date(opd.OPDDateTime).toISOString().slice(0, 16)
        : "",
      PatientID: opd.PatientID.toString(),
      TreatedByDoctorID: opd.TreatedByDoctorID.toString(),
      RegistrationFee: opd.RegistrationFee.toString(),
      Description: opd.Description,
      DiagnosisTypeID: "",
      DiagnosisDescription: ""
    });

    setEditingId(opd.OPDID);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {

    if (!confirm("Delete this OPD record?")) return;

    await fetch(`/api/Opd/${id}`, {
      method: "DELETE"
    });

    fetchOPD();
  };

  return (
    <div className="p-8">

      <div className="flex justify-between mb-8">

        <div>
          <h1 className="text-3xl font-bold text-gray-500">
            OPD Entry
          </h1>

          <p className="text-gray-500 text-sm">
            Manage patient OPD visits
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + New OPD Visit
        </button>


      </div>

      <div className="bg-white border rounded-xl shadow overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 text-gray-600 uppercase text-xs">

            <tr>
              <th className="px-6 py-4 text-left">OPD No</th>
              <th className="px-6 py-4 text-left">Patient</th>
              <th className="px-6 py-4 text-left">Doctor</th>
              <th className="px-6 py-4 text-left">Fee</th>
              <th className="px-6 py-4 text-left">Reason</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody className="divide-y">

            {opdList.map((o) => (

              <tr key={o.OPDID} className="hover:bg-gray-50">

                <td className="px-6 py-4 text-gray-500">{o.OPDNo}</td>

                <td className="px-6 py-4 font-semibold text-gray-700">
                  {o.PatientName}
                </td>

                <td className="px-6 py-4 text-gray-500">{o.DoctorName}</td>

                <td className="px-6 py-4 text-gray-500">
                  ₹ {o.RegistrationFee}
                </td>

                <td className="px-6 py-4 text-gray-500">{o.Description}</td>

                <td className="px-6 py-4">

                  <button
                    onClick={() => handleEdit(o)}
                    className="text-white mr-3 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(o.OPDID)}
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

      <button className="mt-5"><LogoutButton/></button>
      

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <form
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-xl shadow-xl w-[650px] space-y-4"
          >

            <h2 className="text-xl font-semibold text-gray-700">
              {isEditing ? "Update OPD Visit" : "Create OPD Visit"}
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <input
                name="OPDNo"
                placeholder="OPD Number"
                value={form.OPDNo}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white"
              />

              <input
                type="datetime-local"
                name="OPDDateTime"
                value={form.OPDDateTime}
                onChange={handleChange}
                required
                className="border p-2.5 w-full rounded-md text-white"
              />

              <select
                name="PatientID"
                value={form.PatientID}
                onChange={handleChange}
                required
                className="border p-2.5 w-full rounded-md text-gray-400"
              >
                <option value="">Select Patient</option>

                {patients.map((p) => (
                  <option key={p.PatientID} value={p.PatientID}>
                    {p.PatientName}
                  </option>
                ))}

              </select>

              <select
                name="TreatedByDoctorID"
                value={form.TreatedByDoctorID}
                onChange={handleChange}
                required
                className="border p-2.5 w-full rounded-md text-gray-400"
              >
                <option value="">Select Doctor</option>

                {doctors.map((d) => (
                  <option key={d.DoctorID} value={d.DoctorID}>
                    {d.DoctorName}
                  </option>
                ))}

              </select>

              <input
                name="RegistrationFee"
                placeholder="Registration Fee"
                value={form.RegistrationFee}
                onChange={handleChange}
                required
                className="border p-2.5 w-full rounded-md text-white"
              />

              <select
                name="DiagnosisTypeID"
                value={form.DiagnosisTypeID}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-gray-400"
              >

                <option value="">Select Diagnosis</option>

                {diagnosisTypes.map((d) => (
                  <option key={d.DiagnosisTypeID} value={d.DiagnosisTypeID}>
                    {d.DiagnosisTypeName}
                  </option>
                ))}

              </select>

              <textarea
                name="Description"
                placeholder="Reason for Visit"
                value={form.Description}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white col-span-2"
              />

              <textarea
                name="DiagnosisDescription"
                placeholder="Diagnosis Notes"
                value={form.DiagnosisDescription}
                onChange={handleChange}
                className="border p-2.5 w-full rounded-md text-white col-span-2"
              />

            </div>

            <div className="flex justify-end gap-3 pt-3">

              <button
                type="button"
                onClick={resetForm}
                className="border px-4 py-2 rounded text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-indigo-600 text-white px-5 py-2 rounded"
              >
                {isEditing ? "Update OPD" : "Save OPD"}
              </button>

            </div>

          </form>

        </div>

      )}

    </div>
  );
}