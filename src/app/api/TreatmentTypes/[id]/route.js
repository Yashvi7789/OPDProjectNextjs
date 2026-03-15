import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const {id} = await params;

    const [rows] = await pool.query(
      "SELECT * FROM treatment_types WHERE TreatmentTypeID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Treatment type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching treatment type", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    const {id} =await  params;
    const body = await request.json();

    const {
      TreatmentTypeName,
      TreatmentTypeShortName,
      HospitalID,
      Description,
      UserID
    } = body;

    const [result] = await pool.query(
      `UPDATE treatment_types SET
        TreatmentTypeName = ?,
        TreatmentTypeShortName = ?,
        HospitalID = ?,
        Description = ?,
        UserID = ?
      WHERE TreatmentTypeID = ?`,
      [
        TreatmentTypeName,
        TreatmentTypeShortName,
        HospitalID,
        Description,
        UserID,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Treatment type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Treatment type updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating treatment type", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const {id} =await params;

    const [result] = await pool.query(
      "DELETE FROM treatment_types WHERE TreatmentTypeID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Treatment type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Treatment type deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting treatment type", error: error.message },
      { status: 500 }
    );
  }
}
