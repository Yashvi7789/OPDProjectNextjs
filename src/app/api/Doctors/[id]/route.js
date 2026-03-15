import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(request, { params }) {
  try {
    const {id} = await params;

    const [rows] = await pool.query(
      `SELECT d.*, h.HospitalName
       FROM Doctor d
       JOIN Hospital h ON d.HospitalID = h.HospitalID
       WHERE d.DoctorID = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching doctor", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const {id} = await params;
    const body = await request.json();

    const {
      DoctorName,
      Qualification,
      Specialization,
      Phone,
      Email,
      ConsultationFee,
      OPDStartTime,
      OPDEndTime,
      PhotoURL,
      HospitalID,
      IsActive
    } = body;

    const [result] = await pool.query(
      `UPDATE Doctor SET
        DoctorName = ?,
        Qualification = ?,
        Specialization = ?,
        Phone = ?,
        Email = ?,
        ConsultationFee = ?,
        OPDStartTime = ?,
        OPDEndTime = ?,
        PhotoURL = ?,
        HospitalID = ?,
        IsActive = ?
      WHERE DoctorID = ?`,
      [
        DoctorName,
        Qualification,
        Specialization,
        Phone,
        Email,
        ConsultationFee,
        OPDStartTime,
        OPDEndTime,
        PhotoURL,
        HospitalID,
        IsActive ?? 1,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Doctor updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating doctor", error: error.message },
      { status: 500 }
    );
  }
}



export async function DELETE(request, { params }) {
  try {
    const {id} = await params;

    const [result] = await pool.query(
      "DELETE FROM Doctor WHERE DoctorID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Doctor not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Doctor deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting doctor", error: error.message },
      { status: 500 }
    );
  }
}
