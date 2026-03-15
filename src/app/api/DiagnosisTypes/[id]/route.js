import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const {id} = await params;

    const [rows] = await pool.query(
      "SELECT * FROM diagnosis_types WHERE DiagnosisTypeID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Diagnosis type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching diagnosis type", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {

  try {

    const { id } =await params;

    const body = await request.json();

    const {
      DiagnosisTypeName,
      DiagnosisTypeShortName,
      IsActive,
      HospitalID,
      Description,
      UserID,
      PhotoURL
    } = body;

    // ⭐ FIX BUFFER VALUE
    let activeValue = 1;

    if (typeof IsActive === "object" && IsActive?.data) {
      activeValue = IsActive.data[0];
    } else if (IsActive !== undefined) {
      activeValue = IsActive;
    }

    const [result] = await pool.query(
      `UPDATE diagnosis_types SET
        DiagnosisTypeName = ?,
        DiagnosisTypeShortName = ?,
        IsActive = ?,
        HospitalID = ?,
        Description = ?,
        UserID = ?,
        PhotoURL = ?
      WHERE DiagnosisTypeID = ?`,
      [
        DiagnosisTypeName,
        DiagnosisTypeShortName,
        activeValue,
        Number(HospitalID),
        Description || null,
        UserID || 1,
        PhotoURL || null,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Diagnosis not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Diagnosis updated successfully"
    });

  } catch (error) {

    console.log("UPDATE ERROR:", error);

    return NextResponse.json(
      { message: "Error updating diagnosis", error: error.message },
      { status: 500 }
    );

  }

}


export async function DELETE(request, { params }) {
  try {
    const {id} =await  params;

    const [result] = await pool.query(
      "DELETE FROM diagnosis_types WHERE DiagnosisTypeID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Diagnosis type not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Diagnosis type deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting diagnosis type", error: error.message },
      { status: 500 }
    );
  }
}
