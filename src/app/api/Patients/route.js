import pool from "@/lib/db";
import { NextResponse } from "next/server";

// ✅ GET ALL
export async function GET() {
  try {
    const [rows] = await pool.query(`
      SELECT p.*, h.HospitalName
      FROM patients p
      JOIN Hospital h ON p.HospitalID = h.HospitalID
    `);

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching patients", error: error.message },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  try {
    const body = await request.json();

    const {
      PatientName,
      PatientNo,
      RegistrationDateTime,
      Age,
      BloodGroup,
      Gender,
      Occupation,
      Address,
      HospitalID,
      StateID,
      CityID,
      PinCode,
      MobileNo,
      ReferredBy,
      Description,
      UserID,
      EmergencyContactNo
    } = body;

    if (!PatientName || !PatientNo || !Gender || !HospitalID || !MobileNo || !UserID) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    const [result] = await pool.query(
      `INSERT INTO patients
      (PatientName, PatientNo, RegistrationDateTime, Age, BloodGroup, Gender,
       Occupation, Address, HospitalID, StateID, CityID, PinCode,
       MobileNo, ReferredBy, Description, UserID, EmergencyContactNo)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        PatientName,
        PatientNo,
        RegistrationDateTime || new Date(),
        Age,
        BloodGroup,
        Gender,
        Occupation,
        Address,
        HospitalID,
        StateID,
        CityID,
        PinCode,
        MobileNo,
        ReferredBy,
        Description,
        UserID,
        EmergencyContactNo
      ]
    );

    return NextResponse.json(
      { message: "Patient created successfully", PatientID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating patient", error: error.message },
      { status: 500 }
    );
  }
}
