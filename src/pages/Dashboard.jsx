import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Dashboard = () => {
  const reportRef = useRef();

  // Generate random health data
  const generateRandomHealthData = () => ({
    patient: {
      name: "Mahendra Singh Dhoni",
      age: 43,
      gender: "Male",
      id: "PT-78945612",
      // lastCheckup: new Date().toISOString().split('T')[0]
      lastCheckup: new Date().toLocaleDateString()
    },
    vitals: {
      heartRate: Math.floor(Math.random() * 41) + 60, // 60-100 bpm
      oxygen: Math.floor(Math.random() * 6) + 95, // 95-100%
      temperature: (Math.random() * 2 + 97).toFixed(1) // 97-99°F
    },
    trends: {
      heartRate: ["stable", "improving", "slightly elevated"][Math.floor(Math.random() * 3)],
      oxygen: ["stable", "normal", "excellent"][Math.floor(Math.random() * 3)],
      temperature: ["normal", "stable", "slightly elevated"][Math.floor(Math.random() * 3)]
    },
    recommendations: [
      "Continue current medication regimen",
      "Increase physical activity to 30 minutes daily",
      "Follow up in 3 months for blood work"
    ]
  });

  const [healthData, setHealthData] = useState(generateRandomHealthData());

  // Refresh health data
  const handleRefresh = () => setHealthData(generateRandomHealthData());

  // Print functionality
  const handlePrint = useReactToPrint({
    content: () => reportRef.current,
    pageStyle: `
      @page { size: A4; margin: 20mm; }
      @media print { body { -webkit-print-color-adjust: exact; } }
    `
  });

  const handleDownloadPDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Set document properties
      pdf.setProperties({
        title: 'Health Report',
        subject: 'Patient Health Data',
        author: 'Sri Krishna Health Center'
      });
  
      // Add logo (make sure the path is correct)
      const logoUrl = '/logo.png'; // Update with your actual logo path
      const logoWidth = 18; // mm
      const logoHeight = 18; // mm
      
      try {
        // Add logo image (only if available)
        const logoImg = new Image();
        logoImg.src = logoUrl;
        await new Promise((resolve) => {
          logoImg.onload = resolve;
          logoImg.onerror = resolve; // Continue even if logo fails
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
      
      // Add patient information section
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('PATIENT INFORMATION', 15, 45);
      
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Name: ${healthData.patient.name}`, 15, 55);
      pdf.text(`Age/Gender: ${healthData.patient.age}/${healthData.patient.gender}`, 15, 65);
      pdf.text(`Patient ID: ${healthData.patient.id}`, 15, 75);
      pdf.text(`Last Checkup: ${healthData.patient.lastCheckup}`, 15, 85);
      
      // Add vital signs section with colored indicators
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('VITAL SIGNS', 15, 105);
      
      // Heart Rate
      pdf.setFontSize(12);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Heart Rate:', 15, 115);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${healthData.vitals.heartRate} bpm`, 45, 115);
      pdf.setTextColor(100, 100, 100);
      pdf.text('(Normal: 60-100 bpm)', 70, 115);
      
      // Oxygen
      pdf.text('Blood Oxygen:', 15, 125);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${healthData.vitals.oxygen}%`, 45, 125);
      pdf.setTextColor(100, 100, 100);
      pdf.text('(Normal: 95-100%)', 70, 125);
      
      // Temperature
      pdf.text('Temperature:', 15, 135);
      pdf.setTextColor(0, 0, 0);
      pdf.text(`${healthData.vitals.temperature}°F`, 45, 135);
      pdf.setTextColor(100, 100, 100);
      pdf.text('(Normal: 97-99°F)', 70, 135);
      
      // Add recommendations section
      pdf.setFontSize(14);
      pdf.setTextColor(0, 0, 0);
      pdf.text('RECOMMENDATIONS', 15, 155);
      
      pdf.setFontSize(12);
      pdf.setTextColor(50, 50, 50);
      healthData.recommendations.forEach((item, index) => {
        pdf.text(`• ${item}`, 20, 165 + (index * 10));
      });
      
      // Add footer with signature
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text('Physician Signature:', 15, 250);
      pdf.line(45, 250, 100, 250);
      
      pdf.text('Date:', 15, 260);
      pdf.text(new Date().toLocaleDateString(), 30, 260);
      
      // Footer note
      pdf.text('This is an electronically generated report - No signature required', 105, 280, { align: 'center' });
      pdf.text('Sri Krishna Health Center • BK Pudur, Coimbatore • (555) 123-4567', 105, 285, { align: 'center' });
      
      // Save the PDF
      pdf.save('health-report.pdf');
      
    } catch (error) {
      console.error('PDF Generation Error:', error);
      alert('Failed to generate PDF. Please try again or contact support.');
    }
  };
  // ... rest of your component JSX remains the same ...
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Health Dashboard</h1>
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
        
        {/* Interactive Dashboard View - Only 3 metrics now */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Heart Rate Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-red-50 text-red-500 mr-4">
                {/* Heart icon would go here */}
              </div>
              <div>
                <h3 className="text-gray-500">Heart Rate</h3>
                <p className="text-2xl font-bold">{healthData.vitals.heartRate} <span className="text-sm font-normal">bpm</span></p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${healthData.trends.heartRate === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {healthData.trends.heartRate}
            </div>
          </div>

          {/* Blood Oxygen Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-blue-50 text-blue-500 mr-4">
                {/* Oxygen icon would go here */}
              </div>
              <div>
                <h3 className="text-gray-500">Blood Oxygen</h3>
                <p className="text-2xl font-bold">{healthData.vitals.oxygen}%</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${healthData.trends.oxygen === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {healthData.trends.oxygen}
            </div>
          </div>

          {/* Temperature Card */}
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-full bg-purple-50 text-purple-500 mr-4">
                {/* Temperature icon would go here */}
              </div>
              <div>
                <h3 className="text-gray-500">Temperature</h3>
                <p className="text-2xl font-bold">{healthData.vitals.temperature}°F</p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-sm ${healthData.trends.temperature === 'stable' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
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
                  <p className="text-sm">Generated on: {new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="bg-gray-100 p-4 rounded-lg print:hidden">
                <h3 className="font-semibold mb-2">Report Controls</h3>
                <p className="text-sm text-gray-600 mb-3">Click refresh to generate new readings</p>
                <button 
                  onClick={handleRefresh}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm"
                >
                  Refresh Readings
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
                  <p className="text-gray-500 text-sm">Last Checkup</p>
                  <p className="font-medium">{healthData.patient.lastCheckup}</p>
                </div>
              </div>
            </div>

            {/* Vital Signs - Only 3 metrics now */}
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
                      <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.heartRate} bpm</td>
                      <td className="px-6 py-4 whitespace-nowrap">60-100 bpm</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${healthData.vitals.heartRate > 100 || healthData.vitals.heartRate < 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {healthData.vitals.heartRate > 100 ? 'High' : healthData.vitals.heartRate < 60 ? 'Low' : 'Normal'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">Blood Oxygen</td>
                      <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.oxygen}%</td>
                      <td className="px-6 py-4 whitespace-nowrap">95-100%</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${healthData.vitals.oxygen < 95 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {healthData.vitals.oxygen < 95 ? 'Low' : 'Normal'}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap font-medium">Temperature</td>
                      <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.temperature}°F</td>
                      <td className="px-6 py-4 whitespace-nowrap">97-99°F</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs ${parseFloat(healthData.vitals.temperature) > 99 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {parseFloat(healthData.vitals.temperature) > 99 ? 'Elevated' : 'Normal'}
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
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.heartRate === 'stable' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="font-medium">Heart Rate is {healthData.trends.heartRate}</p>
                      <p className="text-sm text-gray-600">Compared to last checkup</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.oxygen === 'stable' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="font-medium">Blood Oxygen is {healthData.trends.oxygen}</p>
                      <p className="text-sm text-gray-600">Maintaining good levels</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.temperature === 'stable' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                    <div>
                      <p className="font-medium">Temperature is {healthData.trends.temperature}</p>
                      <p className="text-sm text-gray-600">Within normal range</p>
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
              <p className="mt-1">City General Hospital • 123 Medical Center Drive • (555) 123-4567</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


// import { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';

// const Dashboard = () => {
//   const reportRef = useRef();

//   // Print functionality
//   const handlePrint = useReactToPrint({
//     content: () => reportRef.current,
//     pageStyle: `
//       @page {
//         size: A4;
//         margin: 20mm;
//       }
//       @media print {
//         body {
//           -webkit-print-color-adjust: exact;
//         }
//       }
//     `
//   });

//   // PDF download functionality
//   const handleDownloadPDF = () => {
//     const input = reportRef.current;
    
//     html2canvas(input, {
//       scale: 2, // Higher quality
//       logging: false,
//       useCORS: true,
//       allowTaint: true
//     }).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4');
//       const imgWidth = 210; // A4 width in mm
//       const pageHeight = 295; // A4 height in mm
//       const imgHeight = canvas.height * imgWidth / canvas.width;
//       let heightLeft = imgHeight;
//       let position = 0;

//       pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//       heightLeft -= pageHeight;

//       while (heightLeft >= 0) {
//         position = heightLeft - imgHeight;
//         pdf.addPage();
//         pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
//         heightLeft -= pageHeight;
//       }

//       pdf.save('health-report.pdf');
//     });
//   };

//   // Sample health data
//   const healthData = {
//     patient: {
//       name: "John Doe",
//       age: 42,
//       gender: "Male",
//       id: "PT-78945612",
//       lastCheckup: "2023-05-15"
//     },
//     vitals: {
//       heartRate: 72,
//       bloodPressure: "120/80",
//       oxygen: 98,
//       temperature: 98.6,
//       glucose: 92
//     },
//     trends: {
//       heartRate: "stable",
//       bloodPressure: "improving",
//       oxygen: "stable",
//       glucose: "slightly high"
//     },
//     recommendations: [
//       "Continue current medication regimen",
//       "Increase physical activity to 30 minutes daily",
//       "Follow up in 3 months for blood work",
//       "Monitor glucose levels before meals"
//     ]
//   };

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
//         {/* Interactive Dashboard View */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white p-6 rounded-xl shadow">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-red-50 text-red-500 mr-4">
//                 {/* <FiHeart size={24} /> */}
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

//           <div className="bg-white p-6 rounded-xl shadow">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-blue-50 text-blue-500 mr-4">
//                 {/* <FiActivity size={24} /> */}
//               </div>
//               <div>
//                 <h3 className="text-gray-500">Temperature</h3>
//                 <p className="text-2xl font-bold">{healthData.vitals.temperature} <span className="font-normal">°F</span></p>
//               </div>
//             </div>
//             <div className={`px-3 py-1 rounded-full text-sm ${healthData.trends.bloodPressure === 'improving' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
//               {healthData.trends.bloodPressure}
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-xl shadow">
//             <div className="flex items-center mb-4">
//               <div className="p-3 rounded-full bg-purple-50 text-purple-500 mr-4">
//                 {/* <FiDroplet size={24} /> */}
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
//                 <p className="text-sm text-gray-600 mb-3">Use buttons above to print or download this report</p>
//                 <button 
//                   onClick={handlePrint}
//                   className="w-full bg-primary hover:bg-primaryDark text-white py-2 rounded-lg text-sm"
//                 >
//                   Generate Report
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

//             {/* Vital Signs */}
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
//                     {/* <tr>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">Blood Pressure</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.bloodPressure} mmHg</td>
//                       <td className="px-6 py-4 whitespace-nowrap">90/60 - 120/80 mmHg</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 rounded-full text-xs ${healthData.vitals.bloodPressure.split('/')[0] > 120 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
//                           {healthData.vitals.bloodPressure.split('/')[0] > 120 ? 'Elevated' : 'Normal'}
//                         </span>
//                       </td>
//                     </tr> */}
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
//                         <span className={`px-2 py-1 rounded-full text-xs ${healthData.vitals.temperature > 99 ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
//                           {healthData.vitals.temperature > 99 ? 'Elevated' : 'Normal'}
//                         </span>
//                       </td>
//                     </tr>
//                     {/* <tr>
//                       <td className="px-6 py-4 whitespace-nowrap font-medium">Glucose Level</td>
//                       <td className="px-6 py-4 whitespace-nowrap">{healthData.vitals.glucose} mg/dL</td>
//                       <td className="px-6 py-4 whitespace-nowrap">70-99 mg/dL</td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`px-2 py-1 rounded-full text-xs ${healthData.vitals.glucose > 99 ? 'bg-yellow-100 text-yellow-800' : healthData.vitals.glucose < 70 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
//                           {healthData.vitals.glucose > 99 ? 'High' : healthData.vitals.glucose < 70 ? 'Low' : 'Normal'}
//                         </span>
//                       </td>
//                     </tr> */}
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
//                     <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.bloodPressure === 'improving' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
//                     <div>
//                       <p className="font-medium">Blood Pressure is {healthData.trends.bloodPressure}</p>
//                       <p className="text-sm text-gray-600">Significant improvement from last month</p>
//                     </div>
//                   </li>
//                   <li className="flex items-start">
//                     <div className={`flex-shrink-0 h-5 w-5 rounded-full mt-1 mr-3 ${healthData.trends.glucose === 'slightly high' ? 'bg-yellow-500' : 'bg-green-500'}`}></div>
//                     <div>
//                       <p className="font-medium">Glucose levels are {healthData.trends.glucose}</p>
//                       <p className="text-sm text-gray-600">Monitor carbohydrate intake</p>
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
//                   "Patient is showing good progress with current treatment plan. Blood pressure has improved 
//                   significantly since last visit. Recommend continuing current medications and lifestyle 
//                   modifications. Schedule follow-up in 3 months for reevaluation."
//                 </p>
//               </div>
//               <div className="flex justify-end">
//                 <div className="text-right">
//                   <p className="font-medium">Dr. Sarah Williams, MD</p>
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