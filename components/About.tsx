import React from 'react';
import { ShieldCheck, Bed, Plane, Headset } from 'lucide-react';
import { Feature } from '../types';
import { useLanguage } from '../context/LanguageContext';

const About: React.FC = () => {
    const { t } = useLanguage();

    const features: (Feature & { key: string })[] = [
        {
            key: "seismic",
            title: "", // filled by translation
            description: "",
            icon: ShieldCheck
        },
        {
            key: "rooms",
            title: "",
            description: "",
            icon: Bed
        },
        {
            key: "airport",
            title: "",
            description: "",
            icon: Plane
        },
        {
            key: "assistance",
            title: "",
            description: "",
            icon: Headset
        }
    ];

    return (
        <section id="about" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="relative z-10 order-2 lg:order-1">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('about.label')}</span>
                        <h2 className="font-serif text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            {t('about.title')} <span className="text-secondary italic">{t('about.titleSuffix')}</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
                            {t('about.description')}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-primary shrink-0 border border-gray-100 dark:border-gray-700">
                                        <feature.icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-1">{t(`about.features.${feature.key}.title`)}</h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{t(`about.features.${feature.key}.desc`)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Grid */}
                    <div className="relative order-1 lg:order-2">
                        <div className="grid grid-cols-2 gap-4">
                            <img 
                                src="/assets/images/about-1.jpg" 
                                alt="Hotel Interior" 
                                className="rounded-2xl shadow-xl w-full h-64 object-cover transform translate-y-8 border-4 border-white dark:border-gray-800 transition-all"
                            />
                            <img 
                                src="/assets/images/about-2.jpg" 
                                alt="Hotel Pool" 
                                className="rounded-2xl shadow-xl w-full h-64 object-cover border-4 border-white dark:border-gray-800 transition-all"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-radial from-green-100/50 dark:from-green-900/20 to-transparent opacity-70 pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;