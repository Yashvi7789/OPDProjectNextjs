import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const {id} =await params;

    const [rows] = await pool.query(
      "SELECT * FROM subtreatment_types WHERE SubTreatmentTypeID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Sub treatment type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching sub treatment type", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    const {id} =await params;
    const body = await request.json();

    const {
      SubTreatmentTypeName,
      TreatmentTypeID,
      Rate,
      IsActive,
      Description,
      UserID,
      AccountID
    } = body;

    const [result] = await pool.query(
      `UPDATE subtreatment_types SET
        SubTreatmentTypeName = ?,
        TreatmentTypeID = ?,
        Rate = ?,
        IsActive = ?,
        Description = ?,
        UserID = ?,
        AccountID = ?
      WHERE SubTreatmentTypeID = ?`,
      [
        SubTreatmentTypeName,
        TreatmentTypeID,
        Rate,
        IsActive,
        Description,
        UserID,
        AccountID,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Sub treatment type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Sub treatment type updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating sub treatment type", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const {id} =await params;

    const [result] = await pool.query(
      "DELETE FROM subtreatment_types WHERE SubTreatmentTypeID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Sub treatment type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Sub treatment type deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting sub treatment type", error: error.message },
      { status: 500 }
    );
  }
}
