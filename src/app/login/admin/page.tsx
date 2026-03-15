// import { FaHospital, FaUserMd, FaUsers, FaFileInvoice } from "react-icons/fa";

// export default function AdminPage() {
//   return (
//     <div>

//       <h1 className="text-3xl font-bold text-gray-800">
//         Dashboard
//       </h1>

//       <p className="text-gray-500 mt-2">
//         Welcome to OPD Management System Admin Panel
//       </p>

//       {/* Cards */}
//       <div className="grid md:grid-cols-4 gap-6 mt-8">

//         <DashboardCard
//           title="Hospitals"
//           value="3"
//           icon={<FaHospital size={26} />}
//         />

//         <DashboardCard
//           title="Doctors"
//           value="12"
//           icon={<FaUserMd size={26} />}
//         />

//         <DashboardCard
//           title="Patients"
//           value="120"
//           icon={<FaUsers size={26} />}
//         />

//         <DashboardCard
//           title="Receipts"
//           value="85"
//           icon={<FaFileInvoice size={26} />}
//         />

//       </div>

//     </div>
//   );
// }

// function DashboardCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: string;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">

//       <div>
//         <h3 className="text-gray-500 text-sm">{title}</h3>
//         <p className="text-2xl font-bold mt-1">{value}</p>
//       </div>

//       <div className="text-blue-500">
//         {icon}
//       </div>

//     </div>
//   );
// }



// app/admin/page.tsx   (or wherever your admin dashboard lives)

import { Suspense } from 'react';
import { FaHospital, FaUserMd, FaUsers, FaFileInvoice } from 'react-icons/fa';

// Reusable card (same as yours)
function DashboardCard({
  title,
  value,
  icon,
  loading = false,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  loading?: boolean;
}) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex items-center justify-between">
      <div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
        <p className="text-2xl font-bold mt-1">
          {loading ? '...' : value}
        </p>
      </div>
      <div className="text-blue-500">{icon}</div>
    </div>
  );
}

// Async component that fetches all counts (can be wrapped in Suspense)
async function DashboardCounts() {
  // Fetch in parallel → fastest possible
  const [hospitalsRes, doctorsRes, patientsRes, receiptsRes] = await Promise.all([
    fetch('http://localhost:3000/api/Hospitals', { cache: 'no-store' }),     // or your production URL
    fetch('http://localhost:3000/api/Doctors', { cache: 'no-store' }),
    fetch('http://localhost:3000/api/Patients', { cache: 'no-store' }),
    fetch('http://localhost:3000/api/Receipts', { cache: 'no-store' }),     // adjust endpoint name if needed
  ]);

  // Handle responses (assuming JSON with { count: number } or array)
  const hospitals = await hospitalsRes.json();
  const doctors = await doctorsRes.json();
  const patients = await patientsRes.json();
  const receipts = await receiptsRes.json();

  const getCount = (data: any) =>
    typeof data === 'object' && data !== null
      ? data.count ?? data.length ?? 0
      : 0;

  return (
    <>
      <DashboardCard title="Hospitals" value={getCount(hospitals).toString()} icon={<FaHospital size={26} />} />
      <DashboardCard title="Doctors"    value={getCount(doctors).toString()}    icon={<FaUserMd size={26} />} />
      <DashboardCard title="Patients"   value={getCount(patients).toString()}   icon={<FaUsers size={26} />} />
      <DashboardCard title="Receipts"   value={getCount(receipts).toString()}   icon={<FaFileInvoice size={26} />} />
    </>
  );
}

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>

      <p className="text-gray-500 mt-2">
        Welcome to OPD Management System Admin Panel
      </p>

      {/* Cards with Suspense + fallback skeleton */}
      <div className="grid md:grid-cols-4 gap-6 mt-8 text-white">
        <Suspense
          fallback={
            <>
              <DashboardCard title="Hospitals" value="..." icon={<FaHospital size={26} />} loading />
              <DashboardCard title="Doctors" value="..." icon={<FaUserMd size={26} />} loading />
              <DashboardCard title="Patients" value="..." icon={<FaUsers size={26} />} loading />
              <DashboardCard title="Receipts" value="..." icon={<FaFileInvoice size={26} />} loading />
            </>
          }
        >
          <DashboardCounts />
        </Suspense>
      </div>
    </div>
  );
}