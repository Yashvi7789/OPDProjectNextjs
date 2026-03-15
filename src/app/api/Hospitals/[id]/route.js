import pool from "@/lib/db";
import { NextResponse } from "next/server";


// ✅ GET Hospital By ID
export async function GET(request,{params}) {
  try {
    const {id} = await params;

    const [rows] = await pool.query(
      "SELECT * FROM Hospital WHERE HospitalID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Hospital not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching hospital", error: error.message },
      { status: 500 }
    );
  }
}


// ✅ UPDATE Hospital
export async function PUT(request, {params}) {
  try {
    const {id} = await params;
    const body = await request.json();

    const {
      HospitalName,
      DefaultPaymentModeID,
      RegistrationCharge,
      RegistrationValidityMonths,
      OpeningDate,
      OpeningPatientNo,
      OpeningOPDNo,
      OpeningReceiptNo,
      Description,
      UserID,
      Address,
      IsRateEnableInReceipt,
      IsRegistrationFeeEnableInOPD
    } = body;

    const [existing] = await pool.query(
      "SELECT * FROM Hospital WHERE HospitalID = ?",
      [id]
    );

    if (existing.length === 0) {
      return NextResponse.json(
        { message: "Hospital not found" },
        { status: 404 }
      );
    }

    await pool.query(
      `UPDATE Hospital SET
        HospitalName = ?,
        DefaultPaymentModeID = ?,
        RegistrationCharge = ?,
        RegistrationValidityMonths = ?,
        OpeningDate = ?,
        OpeningPatientNo = ?,
        OpeningOPDNo = ?,
        OpeningReceiptNo = ?,
        Description = ?,
        UserID = ?,
        Address = ?,
        IsRateEnableInReceipt = ?,
        IsRegistrationFeeEnableInOPD = ?
      WHERE HospitalID = ?`,
      [
        HospitalName,
        DefaultPaymentModeID || null,
        RegistrationCharge || null,
        RegistrationValidityMonths || null,
        OpeningDate,
        OpeningPatientNo,
        OpeningOPDNo,
        OpeningReceiptNo,
        Description || null,
        UserID,
        Address || null,
        IsRateEnableInReceipt ?? null,
        IsRegistrationFeeEnableInOPD ?? null,
        id
      ]
    );

    return NextResponse.json(
      { message: "Hospital updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating hospital", error: error.message },
      { status: 500 }
    );
  }
}


// ✅ DELETE Hospital
export async function DELETE(request, {params}) {
  try {
    const {id} = await params;

    const [result] = await pool.query(
      "DELETE FROM Hospital WHERE HospitalID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Hospital not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Hospital deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting hospital", error: error.message },
      { status: 500 }
    );
  }
}
