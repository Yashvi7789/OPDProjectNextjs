import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET ALL
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT tt.*, h.HospitalName
      FROM treatment_types tt
      JOIN Hospital h ON tt.HospitalID = h.HospitalID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching treatment types", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      TreatmentTypeName,
      TreatmentTypeShortName,
      HospitalID,
      Description,
      UserID
    } = body;

    if (!TreatmentTypeName || !HospitalID || !UserID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO treatment_types
      (TreatmentTypeName, TreatmentTypeShortName, HospitalID, Description, UserID)
      VALUES (?, ?, ?, ?, ?)`,
      [
        TreatmentTypeName,
        TreatmentTypeShortName || null,
        HospitalID,
        Description || null,
        UserID
      ]
    );

    return NextResponse.json(
      { message: "Treatment type created successfully", TreatmentTypeID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating treatment type", error: error.message },
      { status: 500 }
    );
  }
}
