// 'use client'

// import React from 'react'
// import { useActionState } from 'react'
// import { CardBody, CardContainer, CardItem } from '../3d-card'
// import { loginAdmin } from '@/actions/auth'   // adjust path if needed

// interface ThreeDLoginCardProps {
//   selectedRole: string
//   onBack: () => void
// }

// export function ThreeDLoginCard({ selectedRole, onBack }: ThreeDLoginCardProps) {
//   const roleLabel = selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)
//   const isAdmin = selectedRole.toLowerCase() === 'admin'

//   const gradientMap = {
//     admin: 'from-indigo-600 to-purple-600',
//     doctor: 'from-emerald-600 to-teal-600',
//     receptionist: 'from-blue-600 to-cyan-600',
//     billingsStaff: 'from-amber-600 to-orange-600',
//     patient: 'from-red-600 to-red-600',
//   }

//   const gradient = gradientMap[selectedRole as keyof typeof gradientMap] || 'from-gray-600 to-slate-600'

//   // Select action — real only for admin, placeholder for others
//   const loginAction = isAdmin 
//     ? loginAdmin 
//     : async (prevState: any, formData: FormData) => {
//         return { error: `${roleLabel} login not implemented yet` }
//       }

//   const initialState = { error: undefined as string | undefined }
//   const [state, formAction, isPending] = useActionState(loginAction, initialState)

//   return (
//     <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto space-y-4">

//       {/* Error message outside the card - same as before */}
//       {state?.error && (
//         <div className="
//           mt-10 mb-1
//           bg-red-900/40 border border-red-600/50 
//           text-red-200 text-sm sm:text-base 
//           px-5 py-2.5 rounded-lg 
//           text-center font-medium
//           shadow-sm
//         ">
//           {state.error}
//         </div>
//       )}

//       <CardContainer className="inter-var w-full">

//         <CardBody
//           className="
//             relative group/card
//             bg-white/8 backdrop-blur-xl
//             border border-white/15 rounded-2xl sm:rounded-3xl
//             px-6 sm:px-8 md:px-10 lg:px-12
//             py-8 sm:py-10 md:py-12
//             shadow-2xl
//             min-h-[460px] sm:min-h-[500px] md:min-h-[540px]
//             flex flex-col
//           "
//         >

//           {/* Header: Back + Avatar - exact same classes */}
//           <CardItem
//             translateZ={50}
//             className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10"
//           >
//             <button
//               onClick={onBack}
//               className="
//                 flex items-center gap-2 sm:gap-2.5
//                 text-white/80 hover:text-white
//                 text-sm sm:text-base
//                 font-medium
//                 transition-colors duration-200
//               "
//             >
//               ← Back
//             </button>

//             <CardItem translateZ={80}>
//               <div
//                 className={`
//                   flex h-12 w-12 ms-40 sm:h-14 sm:w-14 md:h-16 md:w-16
//                   items-center justify-center rounded-xl sm:rounded-2xl
//                   bg-gradient-to-br ${gradient}
//                   text-white text-2xl sm:text-3xl md:text-4xl font-bold
//                   shadow-lg ring-1 ring-white/25
//                 `}
//               >
//                 {roleLabel.charAt(0)}
//               </div>
//             </CardItem>
//           </CardItem>

//           {/* Title + Description - kept original classes */}
//           <div className="text-center mb-2 sm:mb-3 md:mb-4 space-y-1 sm:space-y-1">
//             <CardItem
//               translateZ={75}
//               className="
//                text-xl sm:text-2xs md:text-3xs lg:text-4xs font-bold text-white tracking-tight
//               "
//             >
//               {roleLabel} Login
//             </CardItem>

//             <CardItem
//               translateZ={45}
//               className="text-xs sm:text-xs md:text-base lg:text-xs text-white/45 font-medium tracking-tight"
//             >
//               Sign in to access {isAdmin ? 'admin' : roleLabel.toLowerCase()} dashboard
//             </CardItem>
//           </div>

//           {/* Form - same structure & classes */}
//           <form action={formAction} className="flex-1 flex flex-col">

//             {/* Hidden role field */}
//             <input type="hidden" name="role" value={selectedRole.toLowerCase()} />

//             <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-4">

//               <CardItem translateZ={35}>
//                 <label className="block text-white/90 text-sm sm:text-base mb-0.5 md:mb-1 font-medium">
//                   Username / Email
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   placeholder={`${selectedRole}@hospital.in`}
//                   title=" "
//                   className="
//                     w-full px-4 py-3 sm:py-3.5 md:py-4
//                     rounded-xl
//                     bg-white/10 border border-white/20
//                     text-white placeholder-white/50
//                     focus:outline-none focus:border-white/50 focus:bg-white/15
//                     transition-all duration-200
//                   "
//                 />
//               </CardItem>

//               <CardItem translateZ={35}>
//                 <label className="block text-white/90 text-sm sm:text-base mb-1.5 md:mb-2 font-medium">
//                   Password
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   placeholder="••••••••••••"
//                   title=" "
//                   className="
//                     w-full px-4 py-3 sm:py-3.5 md:py-4
//                     rounded-xl
//                     bg-white/10 border border-white/20
//                     text-white placeholder-white/50
//                     focus:outline-none focus:border-white/50 focus:bg-white/15
//                     transition-all duration-200
//                   "
//                 />
//               </CardItem>

//             </div>

//             {/* Button - same classes */}
//             <div className="mt-6 sm:mt-8 md:mt-10">
//               <CardItem translateZ={60}>
//                 <button
//                   type="submit"
//                   disabled={isPending}
//                   className={`
//                     w-full py-3.5 sm:py-4 md:py-4.5
//                     rounded-xl font-semibold text-base sm:text-lg
//                     bg-gradient-to-r ${gradient}
//                     hover:brightness-110 hover:shadow-2xl hover:shadow-indigo-500/30
//                     text-white transition-all duration-300 active:scale-[0.98]
//                     disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
//                   `}
//                 >
//                   {isPending ? 'Signing in...' : `Sign in as ${roleLabel}`}
//                 </button>
//               </CardItem>
//             </div>

//           </form>

//         </CardBody>
//       </CardContainer>
//     </div>
//   )
// }





'use client'

import React from 'react'
import { useActionState } from 'react'
import { CardBody, CardContainer, CardItem } from '../3d-card'

import {
  loginAdmin,
  loginBillStaff,
  loginDoctor,
  loginReceptionist,
  loginPatient
} from '@/actions/auth'

interface ThreeDLoginCardProps {
  selectedRole: string
  onBack: () => void
}

export function ThreeDLoginCard({ selectedRole, onBack }: ThreeDLoginCardProps) {

  const roleLabel =
    selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)

  const gradientMap = {
    admin: 'from-indigo-600 to-purple-600',
    doctor: 'from-emerald-600 to-teal-600',
    receptionist: 'from-blue-600 to-cyan-600',
    billstaff: 'from-amber-600 to-orange-600',
    patient: 'from-red-600 to-red-600',
  }

  const gradient =
    gradientMap[selectedRole.toLowerCase() as keyof typeof gradientMap] ||
    'from-gray-600 to-slate-600'

  // Map role → login action
  const actionMap = {
    admin: loginAdmin,
    billstaff: loginBillStaff,
    doctor: loginDoctor,
    receptionist: loginReceptionist,
    patient: loginPatient
  }

  const loginAction =
    actionMap[selectedRole.toLowerCase() as keyof typeof actionMap] ||
    (async () => ({ error: `${roleLabel} login not implemented yet` }))

  const initialState = { error: undefined as string | undefined }

  const [state, formAction, isPending] =
    useActionState(loginAction, initialState)

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto space-y-4">

      {state?.error && (
        <div className="
          mt-10 mb-1
          bg-red-900/40 border border-red-600/50 
          text-red-200 text-sm sm:text-base 
          px-5 py-2.5 rounded-lg 
          text-center font-medium
          shadow-sm
        ">
          {state.error}
        </div>
      )}

      <CardContainer className="inter-var w-full">

        <CardBody
          className="
            relative group/card
            bg-white/8 backdrop-blur-xl
            border border-white/15 rounded-2xl sm:rounded-3xl
            px-6 sm:px-8 md:px-10 lg:px-12
            py-8 sm:py-10 md:py-12
            shadow-2xl
            min-h-[460px] sm:min-h-[500px] md:min-h-[540px]
            flex flex-col
          "
        >

          <CardItem
            translateZ={50}
            className="flex items-center justify-between mb-6 sm:mb-8 md:mb-10"
          >

            <button
              onClick={onBack}
              className="
                flex items-center gap-2 sm:gap-2.5
                text-white/80 hover:text-white
                text-sm sm:text-base
                font-medium
                transition-colors duration-200
              "
            >
              ← Back
            </button>

            <CardItem translateZ={80}>
              <div
                className={`
                  flex h-12 w-12 ms-40 sm:h-14 sm:w-14 md:h-16 md:w-16
                  items-center justify-center rounded-xl sm:rounded-2xl
                  bg-gradient-to-br ${gradient}
                  text-white text-2xl sm:text-3xl md:text-4xl font-bold
                  shadow-lg ring-1 ring-white/25
                `}
              >
                {roleLabel.charAt(0)}
              </div>
            </CardItem>

          </CardItem>

          <div className="text-center mb-2 sm:mb-3 md:mb-4 space-y-1 sm:space-y-1">

            <CardItem
              translateZ={75}
              className="
               text-xl sm:text-2xs md:text-3xs lg:text-4xs font-bold text-white tracking-tight
              "
            >
              {roleLabel} Login
            </CardItem>

            <CardItem
              translateZ={45}
              className="text-xs sm:text-xs md:text-base lg:text-xs text-white/45 font-medium tracking-tight"
            >
              Sign in to access {roleLabel.toLowerCase()} dashboard
            </CardItem>

          </div>

          <form action={formAction} className="flex-1 flex flex-col">

            <input
              type="hidden"
              name="role"
              value={selectedRole.toLowerCase()}
            />

            <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-4">

              <CardItem translateZ={35}>
                <label className="block text-white/90 text-sm sm:text-base mb-0.5 md:mb-1 font-medium">
                  Username / Email
                </label>

                <input
                  type="text"
                  name="username"
                  placeholder={`${selectedRole}@hospital.in`}
                  title=" "
                  className="
                    w-full px-4 py-3 sm:py-3.5 md:py-4
                    rounded-xl
                    bg-white/10 border border-white/20
                    text-white placeholder-white/50
                    focus:outline-none focus:border-white/50 focus:bg-white/15
                    transition-all duration-200
                  "
                />

              </CardItem>

              <CardItem translateZ={35}>

                <label className="block text-white/90 text-sm sm:text-base mb-1.5 md:mb-2 font-medium">
                  Password
                </label>

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••••••"
                  title=" "
                  className="
                    w-full px-4 py-3 sm:py-3.5 md:py-4
                    rounded-xl
                    bg-white/10 border border-white/20
                    text-white placeholder-white/50
                    focus:outline-none focus:border-white/50 focus:bg-white/15
                    transition-all duration-200
                  "
                />

              </CardItem>

            </div>

            <div className="mt-6 sm:mt-8 md:mt-10">

              <CardItem translateZ={60}>

                <button
                  type="submit"
                  disabled={isPending}
                  className={`
                    w-full py-3.5 sm:py-4 md:py-4.5
                    rounded-xl font-semibold text-base sm:text-lg
                    bg-gradient-to-r ${gradient}
                    hover:brightness-110 hover:shadow-2xl hover:shadow-indigo-500/30
                    text-white transition-all duration-300 active:scale-[0.98]
                    disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100
                  `}
                >
                  {isPending
                    ? 'Signing in...'
                    : `Sign in as ${roleLabel}`}
                </button>

              </CardItem>

            </div>

          </form>

        </CardBody>

      </CardContainer>

    </div>
  )
}