import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {

  try {

    const [rows] = await pool.query(`
      SELECT 
        d.DoctorID,
        d.DoctorName,
        d.HospitalName,
        COUNT(p.PatientID) AS PatientCount
      FROM Doctor d
      LEFT JOIN patients p 
      ON p.DoctorID = d.DoctorID
      GROUP BY d.DoctorID
    `);

    return NextResponse.json(rows);

  } catch (error) {

    return NextResponse.json(
      { message: "Error fetching doctor dashboard", error },
      { status: 500 }
    );

  }

}