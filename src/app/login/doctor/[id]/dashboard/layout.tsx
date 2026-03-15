import LogoutButton from "@/components/logoutbutton";
import Link from "next/link";
import { FaUserMd, FaUsers, FaPills, FaNotesMedical, FaSignOutAlt } from "react-icons/fa";

export default async function DoctorLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {

  const { id: doctorId } = await params;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-100">

      {/* Sidebar */}
      <aside className="w-72 bg-white/80 backdrop-blur-lg border-r shadow-lg">

        {/* Logo */}
        <div className="p-6 border-b">
          <h1 className="text-2xl font-bold text-indigo-600">
            OPD System
          </h1>
          <p className="text-xs text-gray-500">
            Doctor Panel
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col p-4 gap-3 text-gray-700">

          <Link
            href={`/login/doctor/${doctorId}/dashboard`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition"
          >
            <FaUserMd />
            Profile
          </Link>

          <Link
            href={`/login/doctor/${doctorId}/dashboard/doctorpatient`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition"
          >
            <FaUsers />
            Patients
          </Link>

          <Link
            href={`/login/doctor/${doctorId}/dashboard/treatments`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition"
          >
            <FaPills />
            Treatments
          </Link>

          <Link
            href={`/login/doctor/${doctorId}/dashboard/subTreatments`}
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-100 hover:text-indigo-600 transition"
          >
            <FaNotesMedical />
            Sub Treatments
          </Link>

          {/* Logout */}
          {/* <Link
            href="/"
            onClick={(e) => {
              if (!confirm("Are you sure you want to logout?")) {
                e.preventDefault();
              }
            }}
            className="flex items-center text-red-300 gap-3 px-4 py-3 rounded-lg hover:bg-red-100 hover:text-red-600 transition"
          >
            <FaSignOutAlt />
            Logout
          </Link> */}
          <LogoutButton/>

        </nav>

      </aside>

      {/* Page Content */}
      <main className="flex-1 p-10">
        {children}
      </main>

    </div>
  );
}