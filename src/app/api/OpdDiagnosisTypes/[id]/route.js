import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const {id} =await params;

    const [rows] = await pool.query(
      "SELECT * FROM opd_diagnosistypes WHERE OPDDiagnosisTypeID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching record", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    const {id} =await params;
    const body = await request.json();

    const [result] = await pool.query(
      `UPDATE opd_diagnosistypes SET
        OPDID = ?,
        DiagnosisTypeID = ?,
        Description = ?,
        UserID = ?
      WHERE OPDDiagnosisTypeID = ?`,
      [
        body.OPDID,
        body.DiagnosisTypeID,
        body.Description,
        body.UserID,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Record updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating record", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const {id} =await params;

    const [result] = await pool.query(
      "DELETE FROM opd_diagnosistypes WHERE OPDDiagnosisTypeID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Record deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting record", error: error.message },
      { status: 500 }
    );
  }
}
