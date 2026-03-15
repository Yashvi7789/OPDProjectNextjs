import pool from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const {id} =await params;

    const [rows] = await pool.query(
      "SELECT * FROM receipts WHERE ReceiptID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Receipt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching receipt", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request,{params}){

try{

const {id}= await params;
const body=await request.json();

const receiptDate=body.ReceiptDate
? new Date(body.ReceiptDate)
: null;

const [result]=await pool.query(

`UPDATE receipts SET
ReceiptNo=?,
ReceiptDate=?,
OPDID=?,
AmountPaid=?,
Description=?,
UserID=?,
PaymentModeID=?,
ReferenceNo=?,
ReferenceDate=?,
cancellationDateTime=?,
CancellationByUserID=?,
CancellationRemarks=?
WHERE ReceiptID=?`,

[
body.ReceiptNo,
receiptDate,
body.OPDID,
body.AmountPaid,
body.Description || null,
body.UserID || 1,
body.PaymentModeID || 1,
body.ReferenceNo || null,
body.ReferenceDate || null,
body.cancellationDateTime || null,
body.CancellationByUserID || null,
body.CancellationRemarks || null,
id
]

);

if(result.affectedRows===0){
return NextResponse.json({message:"Receipt not found"},{status:404});
}

return NextResponse.json({message:"Receipt updated successfully"},{status:200});

}catch(error){

console.error(error);

return NextResponse.json(
{message:"Error updating receipt",error:error.message},
{status:500}
);

}

}


export async function DELETE(request, { params }) {
  try {
    const {id} =await params;

    const [result] = await pool.query(
      "DELETE FROM receipts WHERE ReceiptID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "Receipt not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Receipt deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting receipt", error: error.message },
      { status: 500 }
    );
  }
}
