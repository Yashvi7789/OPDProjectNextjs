import pool from "@/lib/db";
import { NextResponse } from "next/server";


// ✅ GET ALL
export async function GET() {

  try {

    const [rows] = await pool.query(`
      SELECT rt.*, r.ReceiptNo
      FROM receipt_tran rt
      JOIN receipts r ON rt.ReceiptID = r.ReceiptID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {

    return NextResponse.json(
      { message: "Error fetching receipt transactions", error: error.message },
      { status: 500 }
    );

  }

}



// ✅ CREATE
export async function POST(request) {

  try {

    const body = await request.json();

    const {
      ReceiptID,
      ParticularName,
      Qty,
      Rate,
      Amount,
      UserID
    } = body;

    if (!ReceiptID || !ParticularName || !Qty || !Rate || !UserID) {

      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );

    }

    const [result] = await pool.query(
      `INSERT INTO receipt_tran
      (ReceiptID, ParticularName, Qty, Rate, Amount, UserID)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        ReceiptID,
        ParticularName,
        Qty,
        Rate,
        Amount || Qty * Rate,
        UserID
      ]
    );

    return NextResponse.json(
      {
        message: "Receipt transaction added successfully",
        ReceiptTranID: result.insertId
      },
      { status: 201 }
    );

  } catch (error) {

    return NextResponse.json(
      { message: "Error creating receipt transaction", error: error.message },
      { status: 500 }
    );

  }

}