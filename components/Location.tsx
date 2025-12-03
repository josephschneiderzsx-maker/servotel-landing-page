import React from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Location: React.FC = () => {
    const { t } = useLanguage();
    return (
        <section id="location" className="py-24 bg-white dark:bg-gray-950 relative transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Text Content */}
                    <div className="lg:col-span-4">
                        <span className="text-primary font-bold tracking-wider uppercase text-xs mb-2 block">{t('location.label')}</span>
                        <h2 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {t('location.title')}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            {t('location.description')}
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4 group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                                    <MapPin size={20} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-wide">{t('location.addressTitle')}</h4>
                                    <p className="text-gray-500 dark:text-gray-400">Route de l'Aéroport, Zone Cargo,<br/>Tabarre, Haiti</p>
                                </div>
                            </div>

                             <a 
                                href="https://www.google.com/maps/dir//Servotel,+Route+de+l'A%C3%A9roport,+Zone+Cargo,+Tabarre/@18.5747294,-72.288133,17z" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 bg-dark dark:bg-white dark:text-dark text-white px-6 py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg shadow-gray-200 dark:shadow-none"
                            >
                                <Navigation size={18} />
                                {t('location.getDirections')}
                            </a>
                        </div>
                    </div>

                    {/* Map */}
                    <div className="lg:col-span-8 h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 ring-1 ring-gray-100 dark:ring-gray-800 relative group">
                         <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.9846805381308!2d-72.28813302496074!3d18.574729382529306!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eb9e7018a1c99e7%3A0xf7b16cd2997b6e6f!2sServotel!5e0!3m2!1sfr!2sht!4v1763662481643!5m2!1sfr!2sht" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;