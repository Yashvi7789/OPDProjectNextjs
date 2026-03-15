import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET ALL
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT st.*, t.TreatmentTypeName
      FROM subtreatment_types st
      JOIN treatment_types t ON st.TreatmentTypeID = t.TreatmentTypeID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching sub treatment types", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
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

    if (!SubTreatmentTypeName || !TreatmentTypeID || !Rate || !UserID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO subtreatment_types
      (SubTreatmentTypeName, TreatmentTypeID, Rate, IsActive, Description, UserID, AccountID)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        SubTreatmentTypeName,
        TreatmentTypeID,
        Rate,
        IsActive ?? 1,
        Description || null,
        UserID,
        AccountID || null
      ]
    );

    return NextResponse.json(
      { message: "Sub treatment type created successfully", SubTreatmentTypeID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating sub treatment type", error: error.message },
      { status: 500 }
    );
  }
}

