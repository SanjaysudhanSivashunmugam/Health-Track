const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Diabetes Patient',
      content: 'HealthTrack has helped me manage my blood sugar levels effectively. The alerts keep me informed when my levels are too high or low.',
      avatar: 'dp.png'
    },
    {
      name: 'Michael Chen',
      role: 'Cardiac Patient',
      content: 'As someone with heart conditions, the real-time monitoring gives me peace of mind. My doctor loves having access to all my data.',
      avatar: 'dp.png'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Cardiologist',
      content: 'This system provides valuable data that helps me make better treatment decisions for my patients. The interface is physician-friendly.',
      avatar: 'dp.png'
    }
  ];
  
  const Testimonials = () => {
    return (
      <section className="py-16 bg-gray-50 mx-auto px-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
              >
                <p className="text-gray-600 italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Testimonials;