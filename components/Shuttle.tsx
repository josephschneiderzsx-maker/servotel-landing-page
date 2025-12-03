import React from 'react';
import { PlaneLanding, Ticket, Clock, Briefcase, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Shuttle: React.FC = () => {
    const { t } = useLanguage();
    const { openModal } = useModal();

    return (
        <section id="shuttle" className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Shuttle Info */}
                    <div>
                        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 text-primary mb-6">
                            <PlaneLanding size={24} />
                        </span>
                        <h2 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            {t('shuttle.title')}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                            {t('shuttle.description')}
                        </p>

                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="mt-1 text-secondary"><Ticket size={24} /></div>
                                <div>
                                    <h5 className="font-bold text-gray-900 dark:text-white">{t('shuttle.boarding.title')}</h5>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('shuttle.boarding.desc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="mt-1 text-secondary"><Clock size={24} /></div>
                                <div>
                                    <h5 className="font-bold text-gray-900 dark:text-white">{t('shuttle.coordination.title')}</h5>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">{t('shuttle.coordination.desc')}</p>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => openModal('shuttle')}
                            className="mt-10 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium inline-flex items-center gap-2 transition-all"
                        >
                            {t('shuttle.btnDetails')} <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* Right: Meetings Promo */}
                    <div className="bg-gray-900 dark:bg-gray-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden group border border-transparent dark:border-white/10">
                        {/* Background Image Overlay */}
                        <div className="absolute inset-0 opacity-20 bg-[url('/assets/images/shuttle.jpg')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
                        
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                                <Briefcase className="text-secondary" size={28} />
                            </div>
                            <h3 className="font-serif text-3xl font-bold mb-4">{t('shuttle.meetingsTitle')}</h3>
                            <p className="text-gray-300 mb-8 leading-relaxed">
                                {t('shuttle.meetingsDesc')}
                            </p>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                    <span className="text-sm text-gray-200">{t('shuttle.catering')}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                                    <span className="text-sm text-gray-200">{t('shuttle.tech')}</span>
                                </div>
                            </div>

                            <a href="tel:+50928127500" className="text-white font-bold border-b border-secondary pb-1 hover:text-secondary transition-colors inline-flex items-center gap-2">
                                {t('shuttle.callSales')} <ArrowRight size={16} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Shuttle;