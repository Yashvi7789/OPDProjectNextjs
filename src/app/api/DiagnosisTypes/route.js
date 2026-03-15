import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT dt.*, h.HospitalName
      FROM diagnosis_types dt
      JOIN Hospital h ON dt.HospitalID = h.HospitalID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching diagnosis types", error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const body = await request.json();

    const {
      DiagnosisTypeName,
      DiagnosisTypeShortName,
      IsActive,
      HospitalID,
      Description,
      PhotoURL,
      UserID
    } = body;

    if (!DiagnosisTypeName || !HospitalID || !UserID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO diagnosis_types
      (DiagnosisTypeName, DiagnosisTypeShortName, IsActive, HospitalID, Description,PhotoURL, UserID)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        DiagnosisTypeName,
        DiagnosisTypeShortName || null,
        IsActive ?? 1,
        HospitalID,
        Description || null,
        PhotoURL ||null,
        UserID
      ]
    );

    return NextResponse.json(
      { message: "Diagnosis type created successfully", DiagnosisTypeID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating diagnosis type", error: error.message },
      { status: 500 }
    );
  }
}
