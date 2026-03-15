'use server'

import { redirect } from 'next/navigation'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

async function createSession(role: string, username: string, redirectPath: string) {

  const token = jwt.sign(
    { role, username },
    process.env.JWT_SECRET!,
    { expiresIn: '1d' }
  )

  const cookieStore = await cookies()

  cookieStore.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  redirect(redirectPath)
}

export async function loginAdmin(prevState:any, formData:FormData) {

  const username = formData.get('username')?.toString().toLowerCase()
  const password = formData.get('password')?.toString()

  if(username === 'admin@hospital.in' && password === 'admin123'){
    await createSession('admin', username!, '/login/admin')
  }

  return { error: 'Invalid admin credentials' }
}

export async function loginBillStaff(prevState:any, formData:FormData) {

  const username = formData.get('username')?.toString().toLowerCase()
  const password = formData.get('password')?.toString()

  if(username === 'billstaff@hospital.in' && password === 'billstaff123'){
    await createSession('billstaff', username!, '/login/billingstaff')
  }

  return { error: 'Invalid billing staff credentials' }
}

export async function loginDoctor(prevState:any, formData:FormData) {

  const username = formData.get('username')?.toString().toLowerCase()
  const password = formData.get('password')?.toString()

  if(username === 'doctor@hospital.in' && password === 'doctor123'){
    await createSession('doctor', username!, '/login/doctor')
  }

  return { error: 'Invalid doctor credentials' }
}

export async function loginReceptionist(prevState:any, formData:FormData) {

  const username = formData.get('username')?.toString().toLowerCase()
  const password = formData.get('password')?.toString()

  if(username === 'receptionist@hospital.in' && password === 'receptionist123'){
    await createSession('receptionist', username!, '/login/receptionist')
  }

  return { error: 'Invalid receptionist credentials' }
}

export async function loginPatient(prevState:any, formData:FormData) {

  const username = formData.get('username')?.toString().toLowerCase()
  const password = formData.get('password')?.toString()

  if(username === 'patient@hospital.in' && password === 'patient123'){
    await createSession('patient', username!, '/login/patient')
  }

  return { error: 'Invalid patient credentials' }
}