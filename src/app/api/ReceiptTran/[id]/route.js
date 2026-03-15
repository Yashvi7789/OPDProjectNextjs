import pool from "@/lib/db";
import { NextResponse } from "next/server";


// UPDATE
export async function PUT(request, { params }) {

  try {

    const { id } = await params;

    const body = await request.json();

    const {
      ParticularName,
      Qty,
      Rate,
      Amount
    } = body;

    const [result] = await pool.query(
      `UPDATE receipt_tran
       SET ParticularName=?, Qty=?, Rate=?, Amount=?
       WHERE ReceiptTranID=?`,
      [
        ParticularName,
        Qty,
        Rate,
        Amount || Qty * Rate,
        id
      ]
    );

    return NextResponse.json({
      message: "Receipt transaction updated"
    });

  } catch (error) {

    return NextResponse.json(
      { message: "Error updating", error: error.message },
      { status: 500 }
    );

  }

}



// DELETE
export async function DELETE(request, { params }) {

  try {

    const { id } = await params;

    await pool.query(
      `DELETE FROM receipt_tran WHERE ReceiptTranID=?`,
      [id]
    );

    return NextResponse.json({
      message: "Receipt transaction deleted"
    });

  } catch (error) {

    return NextResponse.json(
      { message: "Error deleting", error: error.message },
      { status: 500 }
    );

  }

}