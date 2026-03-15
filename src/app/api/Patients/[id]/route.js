import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request, { params }) {
  try {
    const {id} =await params;

    const [rows] = await pool.query(
      "SELECT * FROM patients WHERE PatientID = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "Patient not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching patient", error: error.message },
      { status: 500 }
    );
  }
}


export async function PUT(request, { params }) {
  try {
    const {id} =await params;
    const body = await request.json();

    const [result] = await pool.query(
      `UPDATE patients SET
        PatientName = ?,
        Age = ?,
        BloodGroup = ?,
        Gender = ?,
        Occupation = ?,
        Address = ?,
        HospitalID = ?,
        StateID = ?,
        CityID = ?,
        PinCode = ?,
        MobileNo = ?,
        ReferredBy = ?,
        Description = ?,
        EmergencyContactNo = ?
      WHERE PatientID = ?`,
      [
        body.PatientName,
        body.Age,
        body.BloodGroup,
        body.Gender,
        body.Occupation,
        body.Address,
        body.HospitalID,
        body.StateID,
        body.CityID,
        body.PinCode,
        body.MobileNo,
        body.ReferredBy,
        body.Description,
        body.EmergencyContactNo,
        id
      ]
    );

    return NextResponse.json(
      { message: "Patient updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating patient", error: error.message },
      { status: 500 }
    );
  }
}


export async function DELETE(request, { params }) {
  try {
    const {id} =await params;

    const [result] = await pool.query(
      "DELETE FROM patients WHERE PatientID = ?",
      [id]
    );

    return NextResponse.json(
      { message: "Patient deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting patient", error: error.message },
      { status: 500 }
    );
  }
}
