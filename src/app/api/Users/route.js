import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// ✅ GET - Get All Users
export async function GET() {
  try {
    const [rows] = await pool.query(
      `SELECT 
        UserID,
        Username,
        Email,
        FullName,
        Role,
        IsActive,
        LastLogin,
        Phone,
        Created,
        Modified
       FROM users`
    );

    return NextResponse.json(rows, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching users", error: error.message },
      { status: 500 }
    );
  }
}


// ✅ POST - Create User
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      Username,
      Email,
      Password,
      FullName,
      Role,
      Phone
    } = body;

    // Validation
    if (!Username || !Email || !Password || !FullName || !Role) {
      return NextResponse.json(
        { message: "Required fields missing" },
        { status: 400 }
      );
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(Password, 10);

    const [result] = await pool.query(
      `INSERT INTO users 
       (Username, Email, PasswordHash, FullName, Role, Phone)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        Username,
        Email,
        hashedPassword,
        FullName,
        Role,
        Phone || null
      ]
    );

    return NextResponse.json(
      { message: "User created successfully", UserID: result.insertId },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error creating user", error: error.message },
      { status: 500 }
    );
  }
}
