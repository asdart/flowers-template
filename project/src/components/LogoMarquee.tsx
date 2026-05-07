import React from 'react';

export default function LogoMarquee() {
  const logos = [
    { src: 'https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/voiceflow-logo-svg-150px.svg', alt: 'Voiceflow' },
    { src: 'https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/zendesk-logo-svg-150px.svg', alt: 'Zendesk' },
    { src: 'https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/pendo-logo-svg-150px.svg', alt: 'Pendo' },
    { src: 'https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/glide-logo-svg-150px.svg', alt: 'Glide' },
    { src: 'https://raw.githubusercontent.com/dsMagnatov/Acreage-landing-assets/refs/heads/main/canva-logo-svg-150px.svg', alt: 'Canva' },
  ];

  return (
    <div className="w-full bg-black py-6 overflow-hidden relative border-t border-b border-white/10">
      
      {/* Градієнти по краях для плавного зникнення */}
      <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      {/* Контейнер для біжучої строки */}
      <div className="flex w-max animate-marquee">
        {/* Перший набір логотипів */}
        <div className="flex gap-12 pr-12">
          {logos.map((logo, index) => (
            <div 
              key={index}
              className="logo-item h-[32px] flex items-center justify-center px-4"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-full w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 filter invert brightness-0"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
        {/* Другий набір логотипів (дублікат для безшовного циклу) */}
        <div className="flex gap-12 pr-12">
          {logos.map((logo, index) => (
            <div 
              key={`dup1-${index}`}
              className="logo-item h-[32px] flex items-center justify-center px-4"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-full w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 filter invert brightness-0"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
        {/* Третій набір логотипів (дублікат для дуже широких екранів) */}
        <div className="flex gap-12 pr-12">
          {logos.map((logo, index) => (
            <div 
              key={`dup2-${index}`}
              className="logo-item h-[32px] flex items-center justify-center px-4"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-full w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 filter invert brightness-0"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
        {/* Четвертий набір логотипів */}
        <div className="flex gap-12 pr-12">
          {logos.map((logo, index) => (
            <div 
              key={`dup3-${index}`}
              className="logo-item h-[32px] flex items-center justify-center px-4"
            >
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-full w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 filter invert brightness-0"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Вбудований CSS для кастомної анімації */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { 
            transform: translateX(0); 
          }
          100% { 
            /* Зсув рівно на 50% ширини батьківського контейнера, 
               який містить 4 однакових блоки. 50% означає зсув на 2 блоки, що дає ідеальний цикл */
            transform: translateX(-50%); 
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}} />
    </div>
  );
}
