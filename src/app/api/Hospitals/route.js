import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [rows] = await pool.query(
    `SELECT 
        HospitalID,
        HospitalName,
        RegistrationCharge,
        RegistrationValidityMonths,
        OpeningDate,
        OpeningPatientNo,
        OpeningOPDNo,
        OpeningReceiptNo,
        Address,
        IsRateEnableInReceipt,
        IsRegistrationFeeEnableInOPD,
        Created
    FROM Hospital;`
    );

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching hospitals", error: error.message },
      { status: 500 }
    );
  }
}



export async function POST(request) {
  try {
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

   
    if (!HospitalName || !OpeningDate || !OpeningPatientNo || !OpeningOPDNo || !OpeningReceiptNo) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO Hospital
      (
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
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
        UserID || 1,
        Address || null,
        IsRateEnableInReceipt ?? null,
        IsRegistrationFeeEnableInOPD ?? null
      ]
    );

    return NextResponse.json(
      { message: "Hospital created successfully", HospitalID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating hospital", error: error.message },
      { status: 500 }
    );
  }
}
