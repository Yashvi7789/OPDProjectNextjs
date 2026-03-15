import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET ALL
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT od.*, o.OPDNo, d.DiagnosisTypeName
      FROM opd_diagnosistypes od
      JOIN opd o ON od.OPDID = o.OPDID
      JOIN diagnosis_types d ON od.DiagnosisTypeID = d.DiagnosisTypeID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching OPD diagnosis types", error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const body = await request.json();

    const {
      OPDID,
      DiagnosisTypeID,
      Description,
      UserID
    } = body;

    if (!OPDID || !DiagnosisTypeID || !UserID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO opd_diagnosistypes
      (OPDID, DiagnosisTypeID, Description, UserID)
      VALUES (?, ?, ?, ?)`,
      [
        OPDID,
        DiagnosisTypeID,
        Description || null,
        UserID
      ]
    );

    return NextResponse.json(
      { message: "OPD diagnosis type added successfully", OPDDiagnosisTypeID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating OPD diagnosis type", error: error.message },
      { status: 500 }
    );
  }
}
