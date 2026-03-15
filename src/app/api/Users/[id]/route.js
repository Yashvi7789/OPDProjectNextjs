import pool from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


// ✅ GET USER BY ID
export async function GET(request, { params }) {
  try {
    const { id } =await params;

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
       FROM users
       WHERE UserID = ?`,
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows[0], { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching user", error: error.message },
      { status: 500 }
    );
  }
}


// ✅ UPDATE USER
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      Username,
      Email,
      Password,
      FullName,
      Role,
      Phone,
      IsActive
    } = body;

    // Optional password update
    let hashedPassword = null;

    if (Password) {
      hashedPassword = await bcrypt.hash(Password, 10);
    }

    // Update query
    await pool.query(
      `UPDATE users 
       SET 
         Username = ?,
         Email = ?,
         ${Password ? "PasswordHash = ?," : ""}
         FullName = ?,
         Role = ?,
         Phone = ?,
         IsActive = ?
       WHERE UserID = ?`,
      Password
        ? [
            Username,
            Email,
            hashedPassword,
            FullName,
            Role,
            Phone || null,
            IsActive ?? 1,
            id
          ]
        : [
            Username,
            Email,
            FullName,
            Role,
            Phone || null,
            IsActive ?? 1,
            id
          ]
    );

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error updating user", error: error.message },
      { status: 500 }
    );
  }
}


// ✅ DELETE USER
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [result] = await pool.query(
      "DELETE FROM users WHERE UserID = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Error deleting user", error: error.message },
      { status: 500 }
    );
  }
}
