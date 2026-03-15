import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const {id} =await params;

    const [rows] = await pool.query(
      "SELECT * FROM opd WHERE OPDID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "OPD not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching OPD", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    const {id} = await params;
    const body = await request.json();

    const [result] = await pool.query(
      `UPDATE opd SET
        OPDNo = ?,
        OPDDateTime = ?,
        PatientID = ?,
        IsFollowUpCase = ?,
        TreatedByDoctorID = ?,
        RegistrationFee = ?,
        Description = ?,
        UserID = ?,
        OLDOPDNo = ?
      WHERE OPDID = ?`,
      [
        body.OPDNo,
        body.OPDDateTime,
        body.PatientID,
        body.IsFollowUpCase || 0,
        body.TreatedByDoctorID,
        body.RegistrationFee,
        body.Description,
        body.UserID,
        body.OLDOPDNo || null,
        id
      ]
    );

    return NextResponse.json(
      { message: "OPD updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating OPD", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const {id} =await params;

    await pool.query(
      "DELETE FROM opd WHERE OPDID = ?",
      [id]
    );

    return NextResponse.json(
      { message: "OPD deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting OPD", error: error.message },
      { status: 500 }
    );
  }
}

