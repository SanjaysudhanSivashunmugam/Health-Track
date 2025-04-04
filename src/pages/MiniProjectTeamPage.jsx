import React from 'react';

const MiniProjectTeamPage = () => {
  // Team details
  const batchNo = 7;
  const year = "2024 - 2025";
  const subject = "Design Thinking and Mini Project Lab";
  const projectStatus = "On Going";
  
  // Team members data with portrait-style images
  const teamMembers = [
    {
      photo: '/t1.png',
      name: 'Sanjaysudhan S',
      rollNo: '727722EUMC094',
      branch: 'Mechanical Engineering',
      year: '3rd Year',
      role: 'Software Developer',
      responsibilities: 'Frontend Development, Backend Development, Database Intergration',
      linkedin: "https://www.linkedin.com/in/sanjaysudhan-sivashunmugam-a5a901255/"
    },
    {
      photo: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&h=600&q=80',
      name: 'Sakthivel C',
      rollNo: '727722EUMC091',
      branch: 'Mechanical Engineering',
      year: '3rd Year',
      role: 'Team Lead',
      responsibilities: 'IOT, Hardware Intergration, Server and Database Management',
      linkedin: "https://www.linkedin.com/in/sakthivel-chermachsamy/"
    },
    {
      photo: '/t2.jpg',
      name: 'Ragul Kumar R',
      rollNo: '727723EUMC515',
      branch: 'Mechanical Engineering',
      year: '3rd Year',
      role: 'Design Engineer',
      responsibilities: 'CAD Design, 3D Printing',
      linkedin: "https://www.linkedin.com/in/ragul-kumar-r-68a845332"
    }
  ];

  // Mentor details with portrait image
  const mentor = {
    photo: '/m.jpg',
    name: 'Dr. R. Ramamoorthi',
    designation: 'Associate Professor',
    department: 'Mechanical Engineering',
    email: 'ramamoorthi@skcet.ac.in',
    phone: '9965599111'
  };

  // Project details
  const project = {
    title: 'Design & Fabrication of IOT Based Health Monitoring System',
    description: 'This project focuses on designing an IoT-based health monitoring system that tracks vital signs like temperature, heart rate, and oxygen levels. The data is uploaded to the cloud and displayed on a website, enabling real-time remote health monitoring.',
    technologies: 'React, Node.js, Express.js, Firebase, Tailwind CSS',
    duration: '3 months',
    status: projectStatus,
    githubRepo: 'https://github.com/SanjaysudhanSivashunmugam/Health-Track'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">{subject} Team</h1>
          <div className="flex justify-center space-x-6 text-gray-600 mb-4">
            <p><span className="font-medium">Team :</span> {batchNo}</p>
            <p><span className="font-medium">Academic Year:</span> {year}</p>
          </div>
          <div className="inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Project Status: {projectStatus}
          </div>
        </div>

        {/* Project Details Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Project Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <p className="text-gray-600">
                <span className="font-medium">Duration:</span> {project.duration}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Technologies:</span> {project.technologies}
              </p>
              <p className="text-gray-600 mb-4">
                <span className="font-medium">GitHub Repository:</span> 
                <a href={project.githubRepo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-2">
                  View on GitHub
                </a>
              </p>
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                {project.status}
              </div>
            </div>
          </div>
        </div>

        {/* Mentor Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Mentor Details</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-48 h-60 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
              <img 
                src={mentor.photo} 
                alt={mentor.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800">{mentor.name}</h3>
              <p className="text-gray-600">
                <span className="font-medium">Designation:</span> {mentor.designation}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Department:</span> {mentor.department}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {mentor.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {mentor.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                {/* Member Photo - Increased height and portrait style */}
                <div className="h-[450px] bg-blue-100 flex items-center justify-center overflow-hidden">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
                
                {/* Member Details */}
                <div className="p-5">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h3>
                  
                  <div className="space-y-2 text-gray-600 mb-4">
                    <p className="flex">
                      <span className="w-20 font-medium">Roll No:</span>
                      <span>{member.rollNo}</span>
                    </p>
                    <p className="flex">
                      <span className="w-20 font-medium">Branch:</span>
                      <span>{member.branch}</span>
                    </p>
                    <p className="flex">
                      <span className="w-20 font-medium">Year:</span>
                      <span>{member.year}</span>
                    </p>
                    <p className="flex">
                      <span className="w-20 font-medium">Role:</span>
                      <span className="text-blue-600 font-medium">{member.role}</span>
                    </p>
                    <a href={member.linkedin}>LinkedIn ID</a>
                  </div>

                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-500 font-medium">Responsibilities:</p>
                    <p className="text-sm text-gray-600">{member.responsibilities}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniProjectTeamPage;