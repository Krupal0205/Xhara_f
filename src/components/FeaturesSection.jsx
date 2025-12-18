import React from 'react';

const FeaturesSection = () => {
  const features = [
    { 
      title: "Pure and Authentic",
      description: "925 sterling silver, as pure as your emotions, a timeless bond you can cherish forever.",
      icon: <img src="https://www.silverlab.in/cdn/shop/files/authentic_9ff13a41-82c6-47b5-a8e9-c6c6685fe49c.png?v=1731490530&width=150" alt="Pure and Authentic" className='w-28 h-28 rounded-full' />
    },
    {
      title: "Luxurious Look",
      description: "Sterling silver retains its rich, elegant shine for generations.",
      icon: <img src="https://www.silverlab.in/cdn/shop/files/DIAMOND_7a707941-fe0e-47c4-864e-b36165b13b30.png?v=1731490737&width=150" alt="Luxurious Look" className='w-28 h-28 rounded-full' />
    },
    {
      title: "Shine that never fades",
      description: "Just like your traditions, it stays strong and beautiful through generations.",
      icon: <img src="https://www.silverlab.in/cdn/shop/files/shine_4074a086-10bc-4574-a5ab-5c3d078d4446.png?v=1731490530&width=150" alt="Shine that never fades" className='w-28 h-28 rounded-full' />
    },
    {
      title: "Hypoallergenic",
      description: "Crafted with love to suit every Indian skin.",
      icon: <img src="https://www.silverlab.in/cdn/shop/files/GENTLE_ON_SKIN_320ec5cc-30c2-4e1c-a884-961e1fc41f39.png?v=1731490530&width=150" alt="Hypoallergenic" className='w-28 h-28 rounded-full' />
    },
    {
      title: "Effortless Maintenance",
      description: "Easy to polish back to its original shine, while silver plating wears off irreversibly.",
      icon: <img src="https://www.silverlab.in/cdn/shop/files/choice_ca676afd-4648-41f8-a00f-ab32de343abd.png?v=1731490530&width=150" alt="Effortless Maintenance" className='w-28 h-28 rounded-full' />
    },
    {
      title: "Eco-friendly",
      description: "Eco-friendly and enduring, a symbol of values you can proudly pass on.",
      icon: <img src="https://www.silverlab.in/cdn/shop/files/cleaning_05d462b1-8803-4521-b303-feb2a06594e2.png?v=1731490530&width=150" alt="Eco-friendly" className='w-28 h-28 rounded-full' />
    },
  ];

  return (
    <section className="bg-black py-8 sm:py-12 md:py-20">
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 px-2">Silver That Stays, Love That Lasts</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center px-2">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">{feature.title}</h3>
              <p className="text-gray-300 text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;

