// import React from 'react';

// const Modal = ({ isOpen, onClose, title, children }) => {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm overflow-y-auto">
//             <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-2xl mx-4 my-8 p-6 relative">
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center border-b pb-4 mb-4">
//                     <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
//                     <button
//                         type="button"
//                         onClick={onClose}
//                         className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
//                     >
//                         <svg
//                             className="w-4 h-4"
//                             xmlns="http://www.w3.org/2000/svg"
//                             fill="none"
//                             viewBox="0 0 14 14"
//                         >
//                             <path
//                                 stroke="currentColor"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                             />
//                         </svg>
//                     </button>
//                 </div>

//                 {/* Modal Body */}
//                 <div className="space-y-4">
//                     {children}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Modal;







import React, { Children } from 'react'

const Modal = ({isOpen, onClose, title, children}) => {

    if(!isOpen) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50 '>
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/* Modal content */}
            <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
                
                {/* Modal header */}
                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
                    <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>

                    <button
                        type="button"
                        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                        onClick={onClose}
                    >
                        <svg
                            className='w-3 h-3'
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"

                            />
                        </svg>
                    </button>
                </div>

                {/* Modal Body */}
                <div className='p-4 md:p-5 space-y-4'>
                    {children}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modal

























// const Modal = ({ isOpen, onClose, title, children }) => {
//   if (!isOpen) return null;

//   return (
//     <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-black/20 overflow-y-auto'>
//       <div className='relative p-4 w-full max-w-2xl'>
//         <div className='relative bg-white rounded-lg shadow-sm dark:bg-gray-700'>
//           <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200'>
//             <h3 className='text-lg font-medium text-gray-900 dark:text-white'>{title}</h3>
//             <button
//               type="button"
//               className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
//               onClick={onClose}
//             >
//               <svg
//                 className='w-3 h-3'
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 14 14"
//               >
//                 <path
//                   stroke="currentColor"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
//                 />
//               </svg>
//             </button>
//           </div>

//           <div className='p-4 md:p-5 space-y-4'>
//             {children}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Modal
