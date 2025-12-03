
import React from 'react';
import { useModal } from '../context/ModalContext';
import Modal from './Modal';
import { useLanguage } from '../context/LanguageContext';
import { Utensils, Plane, UserCheck, Briefcase, Calendar, Shield, FileText, Bus, Check } from 'lucide-react';

const ModalManager: React.FC = () => {
    const { activeModal, modalData, closeModal } = useModal();
    const { t } = useLanguage();

    const renderContent = () => {
        switch (activeModal) {
            case 'room_details':
                if (!modalData) return null;
                const features = t(`rooms.types.${modalData.id}.features`) || [];
                return (
                    <div className="space-y-6">
                        <div className="relative h-56 md:h-72 w-full rounded-xl overflow-hidden mb-6">
                            <img 
                                src={modalData.image} 
                                alt={t(`rooms.types.${modalData.id}.name`)} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                                <h4 className="text-2xl font-serif font-bold mb-1">{t(`rooms.types.${modalData.id}.name`)}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-secondary font-bold text-lg">${modalData.price}</span>
                                    <span className="text-sm opacity-90">{t('rooms.night')}</span>
                                </div>
                            </div>
                        </div>

                        <p className="text-base leading-relaxed text-gray-600 dark:text-gray-300">
                            {t(`rooms.types.${modalData.id}.desc`)}
                        </p>

                        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
                            <h5 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                {t('rooms.featuresLabel')}
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {features.map((feature: string, idx: number) => (
                                    <div key={idx} className="flex items-start gap-2">
                                        <div className="mt-1 text-primary shrink-0">
                                            <Check size={16} />
                                        </div>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end pt-4">
                            <a 
                                href="#booking" 
                                onClick={closeModal}
                                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-primary/40 inline-flex items-center justify-center w-full sm:w-auto"
                            >
                                {t('rooms.bookRoom')}
                            </a>
                        </div>
                    </div>
                );
            case 'dining':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-lg">
                            <Utensils size={32} />
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('modals.dining.name')}</h4>
                                <p className="text-sm">{t('modals.dining.subtitle')}</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <h5 className="font-bold mb-2 text-gray-900 dark:text-white">{t('modals.dining.hoursTitle')}</h5>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex justify-between"><span>{t('modals.dining.hours.breakfast.label')}</span> <span className="font-medium">{t('modals.dining.hours.breakfast.time')}</span></li>
                                    <li className="flex justify-between"><span>{t('modals.dining.hours.lunch.label')}</span> <span className="font-medium">{t('modals.dining.hours.lunch.time')}</span></li>
                                    <li className="flex justify-between"><span>{t('modals.dining.hours.dinner.label')}</span> <span className="font-medium">{t('modals.dining.hours.dinner.time')}</span></li>
                                </ul>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                                <h5 className="font-bold mb-2 text-gray-900 dark:text-white">{t('modals.dining.featuresTitle')}</h5>
                                <ul className="list-disc list-inside space-y-1 text-sm">
                                    {t('modals.dining.features').map((feature: string, index: number) => (
                                        <li key={index}>{feature}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p className="leading-relaxed text-sm">{t('modals.dining.description')}</p>
                    </div>
                );
            case 'transfer':
            case 'shuttle':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-lg">
                            {activeModal === 'shuttle' ? <Bus size={32} /> : <Plane size={32} />}
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('modals.shuttle.name')}</h4>
                                <p className="text-sm">{t('modals.shuttle.subtitle')}</p>
                            </div>
                        </div>
                        <div className="prose dark:prose-invert max-w-none text-sm">
                            <p>{t('modals.shuttle.description')}</p>
                            <div className="grid md:grid-cols-2 gap-4 my-4">
                                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                                    <h5 className="font-bold text-secondary mb-2">{t('modals.shuttle.arrivals.title')}</h5>
                                    <p>{t('modals.shuttle.arrivals.desc')}</p>
                                </div>
                                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                                    <h5 className="font-bold text-secondary mb-2">{t('modals.shuttle.departures.title')}</h5>
                                    <p>{t('modals.shuttle.departures.desc')}</p>
                                </div>
                            </div>
                            <p className="font-bold">{t('modals.shuttle.distance.label')} <span className="font-normal">{t('modals.shuttle.distance.val')}</span></p>
                        </div>
                    </div>
                );
            case 'concierge':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-lg">
                            <UserCheck size={32} />
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('modals.concierge.name')}</h4>
                                <p className="text-sm">{t('modals.concierge.subtitle')}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                             {t('modals.concierge.items').map((item: string, i: number) => (
                                 <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                     <div className="w-2 h-2 bg-secondary rounded-full"></div>
                                     <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{item}</span>
                                 </div>
                             ))}
                        </div>
                    </div>
                );
            case 'business':
                return (
                    <div className="space-y-6">
                         <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-lg">
                            <Briefcase size={32} />
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('modals.business.name')}</h4>
                                <p className="text-sm">{t('modals.business.subtitle')}</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed">{t('modals.business.description')}</p>
                         <ul className="space-y-3">
                            <li className="flex items-center gap-3">
                                <span className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full"><UserCheck size={16} /></span>
                                <span className="text-sm">{t('modals.business.items')[0]}</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <span className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full"><FileText size={16} /></span>
                                <span className="text-sm">{t('modals.business.items')[1]}</span>
                            </li>
                             <li className="flex items-center gap-3">
                                <span className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full"><Briefcase size={16} /></span>
                                <span className="text-sm">{t('modals.business.items')[2]}</span>
                            </li>
                        </ul>
                    </div>
                );
            case 'events':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-lg">
                            <Calendar size={32} />
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('modals.events.name')}</h4>
                                <p className="text-sm">{t('modals.events.subtitle')}</p>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed">{t('modals.events.description')}</p>
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
                                    <tr>
                                        <th className="p-3">{t('modals.events.table.venue')}</th>
                                        <th className="p-3">{t('modals.events.table.capacity')}</th>
                                        <th className="p-3">{t('modals.events.table.type')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {t('modals.events.table.rows').map((row: any, idx: number) => (
                                        <tr key={idx}>
                                            <td className="p-3">{row.venue}</td>
                                            <td className="p-3">{row.capacity}</td>
                                            <td className="p-3">{row.type}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'privacy':
                return (
                     <div className="space-y-4 text-sm leading-relaxed">
                        <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-lg mb-6">
                            <Shield size={32} />
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('modals.privacy.title')}</h4>
                                <p className="text-sm">{t('modals.privacy.subtitle')}</p>
                            </div>
                        </div>
                        {t('modals.privacy.content').map((section: any, idx: number) => (
                            <div key={idx}>
                                <h5 className="font-bold text-gray-900 dark:text-white">{section.title}</h5>
                                <p>{section.text}</p>
                            </div>
                        ))}
                    </div>
                );
            case 'terms':
                return (
                    <div className="space-y-4 text-sm leading-relaxed">
                        <div className="flex items-center gap-4 text-primary bg-primary/10 p-4 rounded-lg mb-6">
                            <FileText size={32} />
                            <div>
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white">{t('modals.terms.title')}</h4>
                                <p className="text-sm">{t('modals.terms.subtitle')}</p>
                            </div>
                        </div>
                        {t('modals.terms.content').map((section: any, idx: number) => (
                            <div key={idx}>
                                <h5 className="font-bold text-gray-900 dark:text-white">{section.title}</h5>
                                <p>{section.text}</p>
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };

    const getTitle = () => {
        switch (activeModal) {
            case 'dining': return t('modals.dining.title');
            case 'transfer': return t('modals.shuttle.title');
            case 'concierge': return t('modals.concierge.title');
            case 'business': return t('modals.business.title');
            case 'events': return t('modals.events.title');
            case 'privacy': return t('modals.privacy.title');
            case 'terms': return t('modals.terms.title');
            case 'shuttle': return t('modals.shuttle.title');
            case 'room_details': return t('rooms.viewDetails');
            default: return '';
        }
    };

    if (!activeModal) return null;

    return (
        <Modal isOpen={!!activeModal} onClose={closeModal} title={getTitle()}>
            {renderContent()}
        </Modal>
    );
};

export default ModalManager;
