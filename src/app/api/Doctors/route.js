import pool from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT d.*, h.HospitalName
      FROM Doctor d
      JOIN Hospital h ON d.HospitalID = h.HospitalID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching doctors", error: error.message },
      { status: 500 }
    );
  }
}



export async function POST(request) {
  try {
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
      HospitalID
    } = body;

    if (!DoctorName || !Qualification || !Specialization || !Phone || !ConsultationFee || !OPDStartTime || !OPDEndTime || !HospitalID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO Doctor
      (DoctorName, Qualification, Specialization, Phone, Email, ConsultationFee, OPDStartTime, OPDEndTime, PhotoURL, HospitalID)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        DoctorName,
        Qualification,
        Specialization,
        Phone,
        Email || null,
        ConsultationFee,
        OPDStartTime,
        OPDEndTime,
        PhotoURL || null,
        HospitalID
      ]
    );

    return NextResponse.json(
      { message: "Doctor created successfully", DoctorID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating doctor", error: error.message },
      { status: 500 }
    );
  }
}

