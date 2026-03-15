// import { WavyBackground } from "@/components/ui/wavy-background";

// export default function Home() {
//   return (
//     <WavyBackground/>
//   );
// }

// ------------------------------------------------------------------
'use client';

import { useState } from 'react';
import { WavyBackground } from "@/components/ui/wavy-background";
import { ThreeDLoginCard } from "@/components/ui/3dcard";

export default function Home() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const roles = [
    { value: 'admin', label: 'Admin', color: 'indigo' },
    { value: 'doctor', label: 'Doctor', color: 'emerald' },
    { value: 'receptionist', label: 'Reception', color: 'blue' },
    { value: 'billStaff', label: 'Billing', color: 'amber' },
    { value: 'patient', label: 'Patient', color: 'red' },
  ];

  if (!selectedRole) {
    return (
      <WavyBackground className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-10 md:mb-14">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              OPD Management System
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-white/90">
              Select your role to continue
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 md:gap-7">
            {roles.map(role => (
              <button
                key={role.value}
                onClick={() => setSelectedRole(role.value)}
                className={`
                  group relative overflow-hidden
                  bg-white/10 backdrop-blur-lg border border-white/20
                  rounded-2xl p-6 md:p-8
                  hover:bg-white/20 hover:border-white/40 hover:scale-[1.03]
                  transition-all duration-300 shadow-lg
                `}
              >
                <h3 className={`text-xl md:text-2xl font-semibold text-white mb-2 group-hover:text-${role.color}-600`}>
                  {role.label}
                </h3>
                <p className="text-white/80 text-sm md:text-base">
                  {role.value === 'admin' && 'Hospital setup, Masters, Reports'}
                  {role.value === 'doctor' && 'Consultations, Diagnoses, OPD entry'}
                  {role.value === 'receptionist' && 'Patient Registration,Queue Management'}
                  {role.value === 'billStaff' && 'Receipts, Payments, Billing Reports'}
                  {role.value === 'patient' && 'Patient Own Detail'}
                </p>
              </button>
            ))}
          </div>
        </div>
      </WavyBackground>
    );
  }

  return (
    <WavyBackground className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <ThreeDLoginCard 
        selectedRole={selectedRole} 
        onBack={() => setSelectedRole(null)}
      />
    </WavyBackground>
  );
}


