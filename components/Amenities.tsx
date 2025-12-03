import React from 'react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';

const Amenities: React.FC = () => {
    const { t } = useLanguage();

    const services: (Service & { key: string })[] = [
        { key: "restaurant", title: "", subtitle: "", image: "/assets/images/amenity-restaurant.jpg" },
        { key: "pool", title: "", subtitle: "", image: "/assets/images/amenity-pool.jpg" },
        { key: "fitness", title: "", subtitle: "", image: "/assets/images/amenity-fitness.jpg" },
        { key: "shuttle", title: "", subtitle: "", image: "/assets/images/amenity-shuttle.jpg" },
        { key: "events", title: "", subtitle: "", image: "/assets/images/amenity-events.jpg" },
        { key: "lounge", title: "", subtitle: "", image: "/assets/images/amenity-lounge.jpg" },
        { key: "support", title: "", subtitle: "", image: "/assets/images/amenity-support.jpg" },
        { key: "terrace", title: "", subtitle: "", image: "/assets/images/amenity-terrace.jpg" },
    ];

    return (
        <section id="amenities" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
             <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('amenities.label')}</span>
                    <h2 className="font-serif text-4xl font-bold text-gray-900 dark:text-white">{t('amenities.title')}</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service, idx) => (
                        <div key={idx} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer border border-transparent dark:border-white/10">
                            <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                style={{ backgroundImage: `url(${service.image})` }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
                            
                            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <h5 className="text-white font-serif text-xl font-bold mb-1">{t(`amenities.items.${service.key}.title`)}</h5>
                                <p className="text-gray-300 text-sm font-light">{t(`amenities.items.${service.key}.sub`)}</p>
                            </div>
                        </div>
                    ))}
                </div>
             </div>
        </section>
    );
};

export default Amenities;