import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET ALL
export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT * FROM receipts`
    );

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching receipts", error: error.message },
      { status: 500 }
    );
  }
}



export async function POST(request) {
  try {
    const body = await request.json();

    const {
      ReceiptNo,
      ReceiptDate,
      OPDID,
      AmountPaid,
      Description,
      UserID,
      PaymentModeID,
      ReferenceNo,
      ReferenceDate,
      cancellationDateTime,
      CancellationByUserID,
      CancellationRemarks
    } = body;

    if (!ReceiptDate || !OPDID || !AmountPaid || !UserID || !PaymentModeID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO receipts
      (ReceiptNo, ReceiptDate, OPDID, AmountPaid, Description,
       UserID, PaymentModeID, ReferenceNo, ReferenceDate,
       cancellationDateTime, CancellationByUserID, CancellationRemarks)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        ReceiptNo || null,
        ReceiptDate,
        OPDID,
        AmountPaid,
        Description || null,
        UserID,
        PaymentModeID,
        ReferenceNo || null,
        ReferenceDate || null,
        cancellationDateTime || null,
        CancellationByUserID || null,
        CancellationRemarks || null
      ]
    );

    return NextResponse.json(
      { message: "Receipt created successfully", ReceiptID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating receipt", error: error.message },
      { status: 500 }
    );
  }
}
