
import React from 'react';
import { Room } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Rooms: React.FC = () => {
    const { t } = useLanguage();
    const { openModal } = useModal();

    const rooms: Room[] = [
        {
            id: 'stdSingle',
            name: '', 
            description: '',
            price: 160,
            rating: 4.8,
            image: '/assets/images/room-1.jpg',
            amenities: ['queen', 'wifi', 'breakfast'],
            tag: 'popular'
        },
        {
            id: 'stdDouble',
            name: '',
            description: '',
            price: 182,
            rating: 4.8,
            image: '/assets/images/room-2.jpg',
            amenities: ['twoDouble', 'wifi', 'service']
        },
        {
            id: 'steSingle',
            name: '',
            description: '',
            price: 205,
            rating: 5.0,
            image: '/assets/images/room-3.jpg',
            amenities: ['lounge', 'bar', 'safe'],
            tag: 'luxury'
        },
        {
            id: 'steDouble',
            name: '',
            description: '',
            price: 223,
            rating: 5.0,
            image: '/assets/images/room-4.jpg',
            amenities: ['twoDouble', 'pool', 'shuttle']
        }
    ];

    return (
        <section id="rooms" className="py-20 bg-white dark:bg-gray-950 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">{t('rooms.label')}</span>
                    <h2 className="font-serif text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('rooms.title')}</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                        {t('rooms.description')}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                        <div key={room.id} className="group bg-white dark:bg-gray-800/40 dark:backdrop-blur-lg rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full">
                            <div className="relative h-48 overflow-hidden">
                                <img 
                                    src={room.image} 
                                    alt={t(`rooms.types.${room.id}.name`)} 
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-3 right-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary dark:text-primary-light shadow-lg">
                                    ${room.price}<span className="text-xs font-normal text-gray-600 dark:text-gray-400">{t('rooms.night')}</span>
                                </div>
                                {room.tag && (
                                    <div className="absolute top-3 left-3 bg-secondary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-lg">
                                        {t(`rooms.tags.${room.tag}`)}
                                    </div>
                                )}
                            </div>
                            
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-1 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(room.rating) ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({room.rating})</span>
                                </div>

                                <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-white mb-2">{t(`rooms.types.${room.id}.name`)}</h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-3">{t(`rooms.types.${room.id}.desc`)}</p>
                                
                                <div className="mt-auto">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {room.amenities.map((amenityKey,MZ) => (
                                            <span key={MZ} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-md font-medium">
                                                {t(`rooms.amenities.${amenityKey}`)}
                                            </span>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => openModal('room_details', room)}
                                        className="w-full border border-primary text-primary hover:bg-primary hover:text-white dark:text-primary-dark dark:border-primary-dark dark:hover:bg-primary-dark dark:hover:text-white font-semibold py-2 rounded-lg transition-colors"
                                    >
                                        {t('rooms.viewDetails')}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Rooms;
