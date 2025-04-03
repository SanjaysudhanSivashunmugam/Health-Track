import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ECGPage = () => {
  const navigate = useNavigate();
  const ecgCanvasRef = useRef(null);
  const reportRef = useRef(null);
  const [ecgData, setEcgData] = useState([]);
  const [measurements, setMeasurements] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Generate realistic ECG data with measurements
  useEffect(() => {
    const generateEcgData = () => {
      const data = [];
      let lastValue = 0;
      const heartRate = 72; // bpm
      const samplesPerSecond = 250;
      const durationSeconds = 10;
      
      // Generate 10 seconds of ECG data
      for (let i = 0; i < samplesPerSecond * durationSeconds; i++) {
        const time = i / samplesPerSecond;
        const beatPosition = (time * heartRate / 60) % 1;
        
        let value = 0;
        
        // P wave (atrial depolarization)
        if (beatPosition < 0.15) {
          value = Math.sin(beatPosition * 20) * 0.3;
        } 
        // PR segment (delay at AV node)
        else if (beatPosition < 0.2) {
          value = 0;
        }
        // QRS complex (ventricular depolarization)
        else if (beatPosition < 0.25) {
          value = Math.sin((beatPosition - 0.2) * 80) * 2.5;
        }
        // ST segment (ventricular repolarization starts)
        else if (beatPosition < 0.3) {
          value = -0.2;
        }
        // T wave (ventricular repolarization)
        else if (beatPosition < 0.4) {
          value = Math.sin((beatPosition - 0.3) * 10) * 0.8;
        }
        // Baseline
        else {
          value = 0;
        }
        
        // Add some noise and smoothing
        value += (Math.random() - 0.5) * 0.1;
        value = lastValue * 0.9 + value * 0.1;
        lastValue = value;
        
        data.push(value);
      }
      
      // Calculate measurements
      const measurements = {
        heartRate: heartRate + Math.floor(Math.random() * 5) - 2, // 70-74 bpm
        prInterval: (0.18 + Math.random() * 0.02).toFixed(2), // 180-200ms
        qrsDuration: (0.08 + Math.random() * 0.01).toFixed(2), // 80-90ms
        qtInterval: (0.36 + Math.random() * 0.02).toFixed(2), // 360-380ms
        axis: "Normal",
        interpretation: "Normal sinus rhythm"
      };
      
      return { data, measurements };
    };

    const { data, measurements } = generateEcgData();
    setEcgData(data);
    setMeasurements(measurements);
    setIsLoading(false);
  }, []);

  // Draw ECG on canvas
  useEffect(() => {
    if (!ecgCanvasRef.current || !ecgData.length) return;

    const canvas = ecgCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Draw grid (1mm squares at 5mm major lines)
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    // Minor grid lines (1mm)
    for (let x = 0; x < width; x += 25) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 25) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
    
    // Major grid lines (5mm)
    ctx.strokeStyle = '#b0b0b0';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 125) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 125) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw ECG trace
    ctx.strokeStyle = '#e74c3c';
    ctx.lineWidth = 2;
    ctx.beginPath();

    const samplesPerSecond = 250;
    const pixelsPerSecond = 250; // 25mm/s * 10px/mm
    const scaleY = height / 4; // 1mV = 10mm = 100px
    
    // Draw 10 seconds of data
    for (let i = 0; i < ecgData.length; i++) {
      const x = (i / samplesPerSecond) * pixelsPerSecond;
      const y = height/2 - ecgData[i] * scaleY;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    
    ctx.stroke();
    
    // Add lead marker
    ctx.fillStyle = '#3498db';
    ctx.font = '16px Arial';
    ctx.fillText('Lead II', 20, 30);
    
    // Add scale markers
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    // 1mV calibration pulse
    ctx.beginPath();
    ctx.moveTo(50, 50);
    ctx.lineTo(50, 50 - scaleY);
    ctx.lineTo(150, 50 - scaleY);
    ctx.lineTo(150, 50);
    ctx.stroke();
    ctx.fillText('1 mV', 160, 50);
  }, [ecgData]);

  const handleDownloadPDF = async () => {
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Add header
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('ELECTROCARDIOGRAM REPORT', 105, 15, { align: 'center' });
      
      // Add ECG graph
      const canvas = await html2canvas(ecgCanvasRef.current, {
        scale: 2,
        logging: false,
        useCORS: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 180; // mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 15, 25, imgWidth, imgHeight);
      
      // Add measurements
      pdf.setFontSize(12);
      pdf.text('ECG Measurements:', 20, imgHeight + 35);
      pdf.text(`Heart Rate: ${measurements.heartRate} bpm`, 20, imgHeight + 45);
      pdf.text(`PR Interval: ${measurements.prInterval} sec`, 20, imgHeight + 55);
      pdf.text(`QRS Duration: ${measurements.qrsDuration} sec`, 20, imgHeight + 65);
      pdf.text(`QT Interval: ${measurements.qtInterval} sec`, 20, imgHeight + 75);
      
      // Add interpretation
      pdf.text('Interpretation:', 20, imgHeight + 90);
      pdf.setFontSize(14);
      pdf.setTextColor(0, 100, 0);
      pdf.text(measurements.interpretation, 20, imgHeight + 100);
      
      pdf.save('ecg_report.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Electrocardiogram (ECG)</h1>
        <button 
          onClick={() => navigate(-1)}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          Back to Dashboard
        </button>
      </div>

      <div ref={reportRef} className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2">Patient Information</h3>
            <p className="text-gray-700">Name: Mahendra Singh Dhoni</p>
            <p className="text-gray-700">Age: 43</p>
            <p className="text-gray-700">ID: PT-78945612</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">ECG Measurements</h3>
            <p className="text-gray-700">Heart Rate: {measurements.heartRate} bpm</p>
            <p className="text-gray-700">PR Interval: {measurements.prInterval} s</p>
            <p className="text-gray-700">QRS: {measurements.qrsDuration} s</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-medium text-purple-800 mb-2">Interpretation</h3>
            <p className="text-gray-700">{measurements.interpretation}</p>
            <p className="text-gray-700">Normal axis</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-white">
          <div className="overflow-x-auto">
            <canvas
              ref={ecgCanvasRef}
              width={2500} // 10 seconds at 250px/sec
              height={500} // 5mV at 100px/mV
              className="w-full h-64 bg-white border border-gray-300"
            />
          </div>
          
          <div className="mt-4 text-sm text-gray-600">
            <p>Scale: 25mm/s, 10mm/mV</p>
            <p>Lead II rhythm strip</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ECGPage;