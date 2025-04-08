// import { useRef, useState } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import html2canvas from 'html2canvas';
// import { jsPDF } from 'jspdf';

// const Dashboard = () => {
//   const reportRef = useRef();

//   // Generate random health data
//   const generateRandomHealthData = () => ({
//     patient: {
//       name: "Mahendra Singh Dhoni",
//       age: 43,
//       gender: "Male",
//       id: "PT-78945612",
//       // lastCheckup: new Date().toISOString().split('T')[0]
//       lastCheckup: new Date().toLocaleDateString()
//     },
//     vitals: {
//       heartRate: Math.floor(Math.random() * 41) + 60, // 60-100 bpm
//       oxygen: Math.floor(Math.random() * 6) + 95, // 95-100%
//       temperature: (Math.random() * 0.5 + 98.4).toFixed(1) // 97-99°F
//     },
//     trends: {
//       heartRate: ["stable", "improving", "slightly elevated"][Math.floor(Math.random() * 3)],
//       oxygen: ["stable", "normal", "excellent"][Math.floor(Math.random() * 3)],
//       temperature: ["normal", "stable", "slightly elevated"][Math.floor(Math.random() * 3)]
//     },
//     recommendations: [
//       "Continue current medication regimen",
//       "Increase physical activity to 30 minutes daily",
//       "Follow up in 3 months for blood work"
//     ]
//   });

//   const [healthData, setHealthData] = useState(generateRandomHealthData());

//   // Refresh health data
//   const handleRefresh = () => setHealthData(generateRandomHealthData());

//   // Print functionality
//   const handlePrint = useReactToPrint({
//     content: () => reportRef.current,
//     pageStyle: `
//       @page { size: A4; margin: 20mm; }
//       @media print { body { -webkit-print-color-adjust: exact; } }
//     `
//   });

//   const handleDownloadPDF = async () => {
//     try {
//       const pdf = new jsPDF('p', 'mm', 'a4');
      
//       // Set document properties
//       pdf.setProperties({
//         title: 'Health Report',
//         subject: 'Patient Health Data',
//         author: 'Sri Krishna Health Center'
//       });
  
//       // Add logo (make sure the path is correct)
//       const logoUrl = '/logo.png'; // Update with your actual logo path
//       const logoWidth = 18; // mm
//       const logoHeight = 18; // mm
      
//       try {
//         // Add logo image (only if available)
//         const logoImg = new Image();
//         logoImg.src = logoUrl;
//         await new Promise((resolve) => {
//           logoImg.onload = resolve;
//           logoImg.onerror = resolve; // Continue even if logo fails
//         });
        
//         if (logoImg.complete && logoImg.naturalWidth !== 0) {
//           const canvas = document.createElement('canvas');
//           canvas.width = logoImg.naturalWidth;
//           canvas.height = logoImg.naturalHeight;
//           const ctx = canvas.getContext('2d');
//           ctx.drawImage(logoImg, 0, 0);
//           const logoData = canvas.toDataURL('image/png');
//           pdf.addImage(logoData, 'PNG', 15, 10, logoWidth, logoHeight);
//         }
//       } catch (logoError) {
//         console.log('Logo not loaded, continuing without it');
//       }
  
//       // Add header
//       pdf.setFontSize(18);
//       pdf.setTextColor(40, 40, 40);
//       pdf.text('Sri Krishna Health Center - Health Report', 105, 25, { align: 'center' });
      
//       // Horizontal line
//       pdf.setDrawColor(200, 200, 200);
//       pdf.setLineWidth(0.5);
//       pdf.line(15, 30, 195, 30);
      
//       // Add patient information section
//       pdf.setFontSize(14);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text('PATIENT INFORMATION', 15, 45);
      
//       pdf.setFontSize(12);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text(`Name: ${healthData.patient.name}`, 15, 55);
//       pdf.text(`Age/Gender: ${healthData.patient.age}/${healthData.patient.gender}`, 15, 65);
//       pdf.text(`Patient ID: ${healthData.patient.id}`, 15, 75);
//       pdf.text(`Last Checkup: ${healthData.patient.lastCheckup}`, 15, 85);
      
//       // Add vital signs section with colored indicators
//       pdf.setFontSize(14);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text('VITAL SIGNS', 15, 105);
      
//       // Heart Rate
//       pdf.setFontSize(12);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text('Heart Rate:', 15, 115);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text(`${healthData.vitals.heartRate} bpm`, 45, 115);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text('(Normal: 60-100 bpm)', 70, 115);
      
//       // Oxygen
//       pdf.text('Blood Oxygen:', 15, 125);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text(`${healthData.vitals.oxygen}%`, 45, 125);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text('(Normal: 95-100%)', 70, 125);
      
//       // Temperature
//       pdf.text('Temperature:', 15, 135);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text(`${healthData.vitals.temperature}°F`, 45, 135);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text('(Normal: 97-99°F)', 70, 135);
      
//       // Add recommendations section
//       pdf.setFontSize(14);
//       pdf.setTextColor(0, 0, 0);
//       pdf.text('RECOMMENDATIONS', 15, 155);
      
//       pdf.setFontSize(12);
//       pdf.setTextColor(50, 50, 50);
//       healthData.recommendations.forEach((item, index) => {
//         pdf.text(`• ${item}`, 20, 165 + (index * 10));
//       });
      
//       // Add footer with signature
//       pdf.setFontSize(10);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text('Physician Signature:', 15, 250);
//       pdf.line(45, 250, 100, 250);
      
//       pdf.text('Date:', 15, 260);
//       pdf.text(new Date().toLocaleDateString(), 30, 260);
      
//       // Footer note
//       pdf.text('This is an electronically generated report - No signature required', 105, 280, { align: 'center' });
//       pdf.text('Sri Krishna Health Center • BK Pudur, Coimbatore • (555) 123-4567', 105, 285, { align: 'center' });
      
//       // Save the PDF
//       pdf.save('health-report.pdf');
      
//     } catch (error) {
//       console.error('PDF Generation Error:', error);
//       alert('Failed to generate PDF. Please try again or contact support.');
//     }
//   };
//   // ... rest of your component JSX remains the same ...
//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Health Dashboard</h1>
//           <div className="flex space-x-3">
//             <button 
//               onClick={handlePrint}
//               className="flex items-center bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg transition"
//             >
//               Print Report
//             </button>
//             <button 
//               onClick={handleDownloadPDF}
//               className="flex items-center bg-white border border-primary text-primary hover:bg-gray-50 px-4 py-2 rounded-lg transition"
//             >
//               Download PDF
//             </button>
//           </div>
//         </div>
        
//         {/* Interactive Dashboard View - Only 3 metrics now */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {/* Heart Rate Card */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-red-50 text-red-500 mr-4">
//                 {/* Heart icon would go here */}
//               </div>
//               <div>
//                 <h3 className="text-gray-500">Heart Rate</h3>
//                 <p className="text-2xl font-bold">{healthData.vitals.heartRate} <span className="text-sm font-normal">bpm</span></p>
//               </div>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm ${healthData.trends.heartRate === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//               {healthData.trends.heartRate}
//             </div>
//           </div>

//           {/* Blood Oxygen Card */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-blue-50 text-blue-500 mr-4">
//                 {/* Oxygen icon would go here */}
//               </div>
//               <div>
//                 <h3 className="text-gray-500">Blood Oxygen</h3>
//                 <p className="text-2xl font-bold">{healthData.vitals.oxygen}%</p>
//               </div>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm ${healthData.trends.oxygen === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//               {healthData.trends.oxygen}
//             </div>
//           </div>

//           {/* Temperature Card */}
//           <div className="bg-white p-6 rounded-xl shadow">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-purple-50 text-purple-500 mr-4">
//                 {/* Temperature icon would go here */}
//               </div>
//               <div>
//                 <h3 className="text-gray-500">Temperature</h3>
//                 <p className="text-2xl font-bold">{healthData.vitals.temperature}°F</p>
//               </div>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm ${healthData.trends.temperature === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//               {healthData.trends.temperature}
//             </div>
//           </div>
//         </div>

//         {/* Printable Report Section */}
//         <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//           <div ref={reportRef} className="p-8 print:p-0">
//             {/* Report Header */}
//             <div className="flex justify-between items-start mb-8 print:flex print:justify-between">
//               <div>
//                 <div className="flex items-center mb-4">
//                   <img 
//                     src="/logo.png" 
//                     alt="Hospital Logo" 
//                     className="h-16 w-16 mr-4 print:h-14 print:w-14"
//                   />
//                   <div>
//                     <h1 className="text-2xl font-bold text-gray-800">Sri Krishna Health Center</h1>
//                     <p className="text-gray-600">BK Pudur, Kuniyamuthur, Coimbatore, Tamil Nadu 641008</p>
//                   </div>
//                 </div>
//                 <div className="bg-primary text-white p-4 rounded-lg print:bg-primary print:text-white">
//                   <h2 className="text-xl font-bold">Medical Health Report</h2>
//                   <p className="text-sm">Generated on: {new Date().toLocaleDateString()}</p>
//                 </div>
//               </div>
              
//               <div className="bg-gray-100 p-4 rounded-lg print:hidden">
//                 <h3 className="font-semibold mb-2">Report Controls</h3>
//                 <p className="text-sm text-gray-600 mb-3">Click refresh to generate new readings</p>
//                 <button 
//                   onClick={handleRefresh}
//                   className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
//                 >
//                   Refresh Readings
//                 </button>
//               </div>
//             </div>

//             {/* Patient Information */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Patient Information</h3>
//               <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//                 <div>
//                   <p className="text-gray-500 text-sm">Full Name</p>
//                   <p className="font-medium">{healthData.patient.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm">Age/Gender</p>
//                   <p className="font-medium">{healthData.patient.age} / {healthData.patient.gender}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm">Patient ID</p>
//                   <p className="font-medium">{healthData.patient.id}</p>
//                 </div>
//                 <div>
//                   <p className="text-gray-500 text-sm">Last Checkup</p>
//                   <p className="font-medium">{healthData.patient.lastCheckup}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Vital Signs - Only 3 metrics now */}
//             <div className="mb-8">
//               <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Vital Signs</h3>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full divide-y divide-gray-200">
//                   <thead className="bg-gray-50">
//                     <tr>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Normal Range</th>
//                       <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
//                     </tr>
//                   </thead>
//                   <tbody className="bg-white divide-y divide-gray-200">
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">Heart Rate</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.heartRate} bpm</td>
//                       <td className="px-6 py-4 whitespace-nowrap">60-100 bpm</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 rounded-full text-xs ${healthData.vitals.heartRate > 100 || healthData.vitals.heartRate < 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
//                           {healthData.vitals.heartRate > 100 ? 'High' : healthData.vitals.heartRate < 60 ? 'Low' : 'Normal'}
//                         </span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">Blood Oxygen</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.oxygen}%</td>
//                       <td className="px-6 py-4 whitespace-nowrap">95-100%</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 rounded-full text-xs ${healthData.vitals.oxygen < 95 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
//                           {healthData.vitals.oxygen < 95 ? 'Low' : 'Normal'}
//                         </span>
//                       </td>
//                     </tr>
//                     <tr>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">Temperature</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.temperature}°F</td>
//                       <td className="px-6 py-4 whitespace-nowrap">97-99°F</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 rounded-full text-xs ${parseFloat(healthData.vitals.temperature) > 99 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
//                           {parseFloat(healthData.vitals.temperature) > 99 ? 'Elevated' : 'Normal'}
//                         </span>
//                       </td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* Trends and Recommendations */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//               <div>
//                 <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Health Trends</h3>
//                 <ul className="space-y-3">
//                   <li className="flex items-start">
//                     <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.heartRate === 'stable' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//                     <div>
//                       <p className="font-medium">Heart Rate is {healthData.trends.heartRate}</p>
//                       <p className="text-sm text-gray-600">Compared to last checkup</p>
//                     </div>
//                   </li>
//                   <li className="flex items-start">
//                     <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.oxygen === 'stable' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//                     <div>
//                       <p className="font-medium">Blood Oxygen is {healthData.trends.oxygen}</p>
//                       <p className="text-sm text-gray-600">Maintaining good levels</p>
//                     </div>
//                   </li>
//                   <li className="flex items-start">
//                     <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.temperature === 'stable' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//                     <div>
//                       <p className="font-medium">Temperature is {healthData.trends.temperature}</p>
//                       <p className="text-sm text-gray-600">Within normal range</p>
//                     </div>
//                   </li>
//                 </ul>
//               </div>
//               <div>
//                 <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Medical Recommendations</h3>
//                 <ol className="list-decimal pl-5 space-y-2">
//                   {healthData.recommendations.map((rec, index) => (
//                     <li key={index} className="text-gray-700">
//                       {rec}
//                     </li>
//                   ))}
//                 </ol>
//               </div>
//             </div>

//             {/* Doctor's Notes and Signature */}
//             <div className="mt-12 pt-8 border-t border-gray-200">
//               <h3 className="text-lg font-semibold mb-4">Physician's Notes</h3>
//               <div className="bg-gray-50 p-4 rounded-lg mb-6">
//                 <p className="text-gray-700 italic">
//                   "Patient is showing good progress with current treatment plan. Vital signs are 
//                   within normal ranges. Recommend continuing current medications and lifestyle 
//                   modifications. Schedule follow-up in 3 months for reevaluation."
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <div className="text-right">
//                   <p className="font-medium">Dr. Pal, MBBS, MPH</p>
//                   <p className="text-gray-600">Cardiology Specialist</p>
//                   <p className="text-gray-600">License #: MED12345678</p>
//                   <div className="mt-4 pt-4 border-t border-gray-200">
//                     <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Report Footer */}
//             <div className="mt-12 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
//               <p>This is an electronically generated report - No signature required</p>
//               <p className="mt-1">City General Hospital • 123 Medical Center Drive • (555) 123-4567</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import { useRef, useState, useEffect, useCallback } from 'react';
import { useReactToPrint } from 'react-to-print';
import { jsPDF } from 'jspdf';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

// Initialize Firebase with your config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "health-monitoring-37c29.firebaseapp.com",
  databaseURL: "https://health-monitoring-37c29-default-rtdb.firebaseio.com",
  projectId: "health-monitoring-37c29",
  storageBucket: "health-monitoring-37c29.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const Dashboard = () => {
  const reportRef = useRef();
  const [healthData, setHealthData] = useState({
    patient: {
      name: "Mahendra Singh Dhoni",
      age: 43,
      gender: "Male",
      id: "PT-78945612",
      lastCheckup: new Date().toLocaleDateString()
    },
    vitals: {
      heartRate: 0,
      oxygen: 0,
      temperature: 0,
      timestamp: new Date().toLocaleTimeString()
    },
    trends: {
      heartRate: "fetching from database...",
      oxygen: "fetching from database...",
      temperature: "fetching from database..."
    },
    recommendations: [
      "Continue current medication regimen",
      "Increase physical activity to 30 minutes daily",
      "Follow up in 3 months for blood work"
    ]
  });

  // Memoized helper function to determine trend status
  const getTrendStatus = useCallback((newValue, oldValue, min, max) => {
    if (typeof oldValue !== 'number' || oldValue === 0) return "stable";
    
    const diff = newValue - oldValue;
    const absDiff = Math.abs(diff);
    const threshold = (max - min) * 0.05; // 5% of range
    
    if (absDiff < threshold) return "stable";
    if (diff > 0) return "increasing";
    return "decreasing";
  }, []);

  // Fetch data from Firebase Realtime Database
  useEffect(() => {
    const sensorRef = ref(database, 'sensorData');
    
    const unsubscribe = onValue(sensorRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setHealthData(prev => ({
          ...prev,
          vitals: {
            heartRate: Math.round(data.heartRate),
            oxygen: data.spo2,
            temperature: data.temp,
            timestamp: new Date().toLocaleTimeString()
          },
          trends: {
            heartRate: getTrendStatus(data.heartRate, prev.vitals.heartRate, 60, 100),
            oxygen: getTrendStatus(data.spo2, prev.vitals.oxygen, 95, 100),
            temperature: getTrendStatus(data.temp, prev.vitals.temperature, 97, 99)
          }
        }));
      }
    }, (error) => {
      console.error("Firebase error:", error);
      setHealthData(prev => ({
        ...prev,
        vitals: {
          ...prev.vitals,
          heartRate: "Error",
          oxygen: "Error",
          temperature: "Error"
        },
        trends: {
          ...prev.trends,
          heartRate: "connection error",
          oxygen: "connection error",
          temperature: "connection error"
        }
      }));
    });

    return () => unsubscribe();
  }, [getTrendStatus]);
// const Dashboard = () => {
//   const reportRef = useRef();
//   const [healthData, setHealthData] = useState({
//     patient: {
//       name: "Mahendra Singh Dhoni",
//       age: 43,
//       gender: "Male",
//       id: "PT-78945612",
//       lastCheckup: new Date().toLocaleDateString()
//     },
//     vitals: {
//       heartRate: 0,
//       oxygen: 0,
//       temperature: 0,
//       timestamp: new Date().toLocaleTimeString()
//     },
//     trends: {
//       heartRate: "fetching from database...",
//       oxygen: "fetching from database...",
//       temperature: "fetching from database..."
//     },
//     recommendations: [
//       "Continue current medication regimen",
//       "Increase physical activity to 30 minutes daily",
//       "Follow up in 3 months for blood work"
//     ]
//   });

//   // Fetch data from Firebase Realtime Database
//   useEffect(() => {
//     const sensorRef = ref(database, 'sensorData');
    
//     const unsubscribe = onValue(sensorRef, (snapshot) => {
//       const data = snapshot.val();
//       if (data) {
//         setHealthData(prev => ({
//           ...prev,
//           vitals: {
//             heartRate: Math.round(data.heartRate),
//             oxygen: data.spo2,
//             temperature: data.temp, // Keep existing or update if available
//             timestamp: new Date().toLocaleTimeString()
//           },
//           trends: {
//             heartRate: getTrendStatus(data.heartRate, prev.vitals.heartRate, 60, 100),
//             oxygen: getTrendStatus(data.spo2, prev.vitals.oxygen, 95, 100),
//             temperature: getTrendStatus(data.temp,prev.trends.temperature,97, 99)
//           }
//         }));
//       }
//     }, (error) => {
//       console.error("Firebase error:", error);
//       setHealthData(prev => ({
//         ...prev,
//         vitals: {
//           ...prev.vitals,
//           heartRate: "Error",
//           oxygen: "Error",
//           temp:"Error"
//         },
//         trends: {
//           ...prev.trends,
//           heartRate: "connection error",
//           oxygen: "connection error",
//           temp:"Error"
//         }
//       }));
//     });

//     return () => unsubscribe();
//   }, []);

//   // Helper function to determine trend status
//   const getTrendStatus = (newValue, oldValue, min, max) => {
//     if (!oldValue || oldValue === 0) return "Fetched";
    
//     const diff = newValue - oldValue;
//     const absDiff = Math.abs(diff);
//     const threshold = (max - min) * 0.05; // 5% of range
    
//     if (absDiff < threshold) return "stable";
//     if (diff > 0) return "increasing";
//     return "decreasing";
//   };

  // Generate random data for non-Firebase fields
 

  // Refresh non-Firebase data
  const handleRefresh = () => window.location.reload();

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  // PDF download functionality
  const handleDownloadPDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Set document properties
      pdf.setProperties({
        title: 'Health Report',
        subject: 'Patient Health Data',
        author: 'Sri Krishna Health Center'
      });
  
      // Add logo
      const logoUrl = '/logo.png';
      const logoWidth = 18;
      const logoHeight = 18;
      
      try {
        const logoImg = new Image();
        logoImg.src = logoUrl;
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve;
        });
        
        if (logoImg.complete && logoImg.naturalWidth !== 0) {
          const canvas = document.createElement('canvas');
          canvas.width = logoImg.naturalWidth;
          canvas.height = logoImg.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(logoImg, 0, 0);
          const logoData = canvas.toDataURL('image/png');
          pdf.addImage(logoData, 'PNG', 15, 10, logoWidth, logoHeight);
        }
      } catch (logoError) {
        console.log('Logo not loaded, continuing without it');
      }
  
      // Add header
      pdf.setFontSize(18);
      pdf.setTextColor(40, 40, 40);
      pdf.text('Sri Krishna Health Center - Health Report', 105, 25, { align: 'center' });
      
      // Horizontal line
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(15, 30, 195, 30);
      
      // Add patient information
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('PATIENT INFORMATION', 15, 45);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Name: ${healthData.patient.name}`, 15, 55);
      pdf.text(`Age/Gender: ${healthData.patient.age}/${healthData.patient.gender}`, 15, 65);
      pdf.text(`Patient ID: ${healthData.patient.id}`, 15, 75);
      pdf.text(`Last Checkup: ${healthData.patient.lastCheckup}`, 15, 85);
      pdf.text(`Last Reading: ${healthData.vitals.timestamp}`, 15, 95);
      
      // Add vital signs
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('VITAL SIGNS', 15, 115);
      
      // Heart Rate
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Heart Rate:', 15, 125);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${healthData.vitals.heartRate} bpm`, 45, 125);
      pdf.setTextColor(100, 100, 100);
      pdf.text('(Normal: 60-100 bpm)', 70, 125);
      
      // Oxygen
      pdf.text('Blood Oxygen:', 15, 135);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${healthData.vitals.oxygen}%`, 45, 135);
      pdf.setTextColor(100, 100, 100);
      pdf.text('(Normal: 95-100%)', 70, 135);
      
      // Temperature
      pdf.text('Temperature:', 15, 145);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${healthData.vitals.temperature}°F`, 45, 145);
      pdf.setTextColor(100, 100, 100);
      pdf.text('(Normal: 97-99°F)', 70, 145);
      
      // Add recommendations
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('RECOMMENDATIONS', 15, 165);
      
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      healthData.recommendations.forEach((item, index) => {
        pdf.text(`• ${item}`, 20, 175 + (index * 10));
      });
      
      // Add footer
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Physician Signature:', 15, 250);
      pdf.line(45, 250, 100, 250);
      
      pdf.text('Date:', 15, 260);
      pdf.text(new Date().toLocaleDateString(), 30, 260);
      
      pdf.text('This is an electronically generated report - No signature required', 105, 280, { align: 'center' });
      pdf.text('Sri Krishna Health Center • BK Pudur, Coimbatore • (555) 123-4567', 105, 285, { align: 'center' });
      
      // Save the PDF
      pdf.save('health-report.pdf');
      
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again or contact support.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Health Dashboard</h1>
            <div className="flex items-center mt-1">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <span className="ml-2 text-sm text-green-600">Live data: {healthData.vitals.timestamp}</span>
            </div>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handlePrint}
              className="flex items-center bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-lg transition"
            >
              Print Report
            </button>
            <button 
              onClick={handleDownloadPDF}
              className="flex items-center bg-white border border-primary text-primary hover:bg-gray-50 px-4 py-2 rounded-lg transition"
            >
              Download PDF
            </button>
          </div>
        </div>
        
        {/* Real-time Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Heart Rate Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-red-50 text-red-500 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500">Heart Rate</h3>
                <p className="text-2xl font-bold">
                  {typeof healthData.vitals.heartRate === 'number' ? healthData.vitals.heartRate : '--'} 
                  <span className="text-sm font-normal"> bpm</span>
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              healthData.trends.heartRate === 'connection error' ? 'bg-red-100 text-red-800' :
              healthData.trends.heartRate === 'Fetched' ? 'bg-green-100 text-green-800' :
              healthData.trends.heartRate === 'stable' ? 'bg-green-100 text-green-800' : 
              'bg-yellow-100 text-yellow-800'
            }`}>
              {healthData.trends.heartRate}
            </div>
          </div>

          {/* Blood Oxygen Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-50 text-blue-500 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500">Blood Oxygen</h3>
                <p className="text-2xl font-bold">
                  {typeof healthData.vitals.oxygen === 'number' ? healthData.vitals.oxygen : '--'}%
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
              healthData.trends.oxygen === 'connection error' ? 'bg-red-100 text-red-800' :
              healthData.trends.oxygen === 'Fetched' ? 'bg-green-100 text-green-800' :
              healthData.trends.oxygen === 'stable' ? 'bg-green-100 text-green-800' : 
              'bg-yellow-100 text-yellow-800'
            }`}>
              {healthData.trends.oxygen}
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-50 text-purple-500 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500">Temperature</h3>
                <p className="text-2xl font-bold">
                  {healthData.vitals.temperature || '--'}°F
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${
               healthData.trends.oxygen === 'connection error' ? 'bg-red-100 text-red-800' :
               healthData.trends.oxygen === 'Fetched' ? 'bg-green-100 text-green-800' :
               healthData.trends.oxygen === 'stable' ? 'bg-green-100 text-green-800' : 
               'bg-yellow-100 text-yellow-800'
            }`}>
              {healthData.trends.temperature}
            </div>
          </div>
        </div>

        {/* Printable Report Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div ref={reportRef} className="p-8 print:p-0">
            {/* Report Header */}
            <div className="flex justify-between items-start mb-8 print:flex print:justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <img 
                    src="/logo.png" 
                    alt="Hospital Logo" 
                    className="h-16 w-16 mr-4 print:h-14 print:w-14"
                  />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-800">Sri Krishna Health Center</h1>
                    <p className="text-gray-600">BK Pudur, Kuniyamuthur, Coimbatore, Tamil Nadu 641008</p>
                  </div>
                </div>
                <div className="bg-primary text-white p-4 rounded-lg print:bg-primary print:text-white">
                  <h2 className="text-xl font-bold">Medical Health Report</h2>
                  <p className="text-sm">Last updated: {healthData.vitals.timestamp}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg print:hidden">
                <h3 className="font-semibold mb-2">Report Controls</h3>
                <p className="text-sm text-gray-600 mb-3">Heart rate and SpO2 update automatically</p>
                <button 
                  onClick={handleRefresh}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                >
                  Sync Data
                </button>
              </div>
            </div>

            {/* Patient Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Patient Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>
                  <p className="font-medium">{healthData.patient.name}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Age/Gender</p>
                  <p className="font-medium">{healthData.patient.age} / {healthData.patient.gender}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Patient ID</p>
                  <p className="font-medium">{healthData.patient.id}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Last Reading</p>
                  <p className="font-medium">{healthData.vitals.timestamp}</p>
                </div>
              </div>
            </div>

            {/* Vital Signs */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Vital Signs</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Parameter</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Normal Range</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">Heart Rate</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {typeof healthData.vitals.heartRate === 'number' ? healthData.vitals.heartRate : '--'} bpm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">60-100 bpm</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          healthData.trends.heartRate === 'connection error' ? 'bg-red-100 text-red-800' :
                          healthData.trends.heartRate === 'initial reading' ? 'bg-blue-100 text-blue-800' :
                          healthData.trends.heartRate === 'stable' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {healthData.trends.heartRate}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">Blood Oxygen</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {typeof healthData.vitals.oxygen === 'number' ? healthData.vitals.oxygen : '--'}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">95-100%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          healthData.trends.oxygen === 'connection error' ? 'bg-red-100 text-red-800' :
                          healthData.trends.oxygen === 'initial reading' ? 'bg-blue-100 text-blue-800' :
                          healthData.trends.oxygen === 'stable' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {healthData.trends.oxygen}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">Temperature</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {healthData.vitals.temperature || '--'}°F
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">97-99°F</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          healthData.trends.temperature === 'stable' ? 'bg-green-100 text-green-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {healthData.trends.temperature}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Trends and Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Health Trends</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${
                      healthData.trends.heartRate === 'connection error' ? 'bg-red-500' :
                      healthData.trends.heartRate === 'initial reading' ? 'bg-blue-500' :
                      healthData.trends.heartRate === 'stable' ? 'bg-green-500' : 
                      'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">Heart Rate is {healthData.trends.heartRate}</p>
                      <p className="text-sm text-gray-600">Current: {typeof healthData.vitals.heartRate === 'number' ? healthData.vitals.heartRate : '--'} bpm</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${
                      healthData.trends.oxygen === 'connection error' ? 'bg-red-500' :
                      healthData.trends.oxygen === 'initial reading' ? 'bg-blue-500' :
                      healthData.trends.oxygen === 'stable' ? 'bg-green-500' : 
                      'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">Blood Oxygen is {healthData.trends.oxygen}</p>
                      <p className="text-sm text-gray-600">Current: {typeof healthData.vitals.oxygen === 'number' ? healthData.vitals.oxygen : '--'}%</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${
                      healthData.trends.temperature === 'stable' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <div>
                      <p className="font-medium">Temperature is {healthData.trends.temperature}</p>
                      <p className="text-sm text-gray-600">Current: {healthData.vitals.temperature || '--'}°F</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4">Medical Recommendations</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  {healthData.recommendations.map((rec, index) => (
                    <li key={index} className="text-gray-700">
                      {rec}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* Doctor's Notes and Signature */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Physician's Notes</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-gray-700 italic">
                  "Patient is showing good progress with current treatment plan. Vital signs are 
                  within normal ranges. Recommend continuing current medications and lifestyle 
                  modifications. Schedule follow-up in 3 months for reevaluation."
                </p>
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <p className="font-medium">Dr. Pal, MBBS, MPH</p>
                  <p className="text-gray-600">Cardiology Specialist</p>
                  <p className="text-gray-600">License #: MED12345678</p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Footer */}
            <div className="mt-12 pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
              <p>This is an electronically generated report - No signature required</p>
              <p className="mt-1">Sri Krishna Health Center • BK Pudur, Coimbatore • (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;