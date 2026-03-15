import Link from "next/link";
import { FaNotesMedical, FaFileInvoice } from "react-icons/fa";

function DashboardCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <Link href={href}>
      <div className="bg-white shadow-md hover:shadow-lg transition-all rounded-xl p-6 flex items-center justify-between cursor-pointer">

        <div>
          <h3 className="text-lg font-semibold text-gray-200">
            {title}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {description}
          </p>
        </div>

        <div className="text-blue-500 text-3xl">
          {icon}
        </div>

      </div>
    </Link>
  );
}

export default function BillingDashboard() {
  return (
    <div>

      <h1 className="text-3xl font-bold text-gray-800">
        Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Welcome to OPD Management System Billing Panel
      </p>

      {/* Dashboard Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

        <DashboardCard
          title="OPD Entry"
          description="Create new OPD billing entries"
          icon={<FaNotesMedical />}
          href="/login/billingstaff/opdEntry"
        />

        <DashboardCard
          title="Receipt Entry"
          description="Generate and manage payment receipts"
          icon={<FaFileInvoice />}
          href="/login/billingstaff/receiptEntry"
        />

      </div>

    </div>
  );
}