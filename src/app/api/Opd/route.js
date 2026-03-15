import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET ALL
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT o.*, p.PatientName, d.DoctorName
      FROM opd o
      JOIN patients p ON o.PatientID = p.PatientID
      JOIN Doctor d ON o.TreatedByDoctorID = d.DoctorID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching OPD records", error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const body = await request.json();

    const {
      OPDNo,
      OPDDateTime,
      PatientID,
      IsFollowUpCase,
      TreatedByDoctorID,
      RegistrationFee,
      Description,
      UserID,
      OLDOPDNo
    } = body;

    if (!OPDDateTime || !PatientID || !TreatedByDoctorID || !RegistrationFee || !UserID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO opd
      (OPDNo, OPDDateTime, PatientID, IsFollowUpCase,
       TreatedByDoctorID, RegistrationFee, Description, UserID, OLDOPDNo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        OPDNo || null,
        OPDDateTime,
        PatientID,
        IsFollowUpCase ?? 0,
        TreatedByDoctorID,
        RegistrationFee,
        Description || null,
        UserID,
        OLDOPDNo || null
      ]
    );

    return NextResponse.json(
      { message: "OPD created successfully", OPDID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating OPD", error: error.message },
      { status: 500 }
    );
  }
}

