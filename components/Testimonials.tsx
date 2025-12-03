import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Testimonial } from '../types';
import { useLanguage } from '../context/LanguageContext';

const testimonials: Testimonial[] = [
    {
        id: 1,
        text: "I'd like to thank Servotel and their team for a great experience. It usually the go to hotel when staying near the airport. The customer service was great and thank you to Ms. Tara for handling my parents' reservation and ensuring they arrived and departed safely.",
        author: "Daphne N",
        role: "Jul 2024 • Traveled with family",
        image: "/assets/images/testimonial-1.jpg",
        rating: 5
    },
    {
        id: 2,
        text: "I loved my stay there, I hope to return one of these days, by the way I love your croissants and spaghetti they are a delight, my God! Then I had a great time by your pool, it was really fantastic. Thank you very much.",
        author: "Fredeline A",
        role: "Sept 2024 • Traveled with family",
        image: "/assets/images/testimonial-2.jpg",
        rating: 5
    },
    {
        id: 3,
        text: "It’s was a Good Experience, the room was Clean, my little fridge, my strongbox. I really like it. Thank you!",
        author: "fritznelsonjeanb2024",
        role: "Aug 2024",
        image: "/assets/images/testimonial-3.jpg",
        rating: 5
    }
];

const Metrics = [
    { key: "location", score: 4.5 },
    {Key: "cleanliness", key: "cleanliness", score: 4.2 },
    { key: "sleep", score: 4.0 },
    { key: "service", score: 3.9 },
    { key: "rooms", score: 3.8 },
    { key: "value", score: 3.6 },
];

const Testimonials: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section id="reviews" className="py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-6">
                
                {/* Tripadvisor Header Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 mb-12">
                    <div className="flex flex-col lg:flex-row gap-10 items-start">
                        
                        {/* Left: Overall Rating & Logo */}
                        <div className="w-full lg:w-1/3 border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-700 pb-8 lg:pb-0 lg:pr-8">
                            <div className="flex items-center gap-3 mb-5">
                                <img 
                                    src="/assets/images/tripadvisor-icon.ico" 
                                    alt="Tripadvisor" 
                                    className="w-10 h-10 object-contain"
                                />
                                <span className="text-2xl font-serif font-bold text-gray-900 dark:text-white">{t('testimonials.tripadvisor')}</span>
                            </div>
                            
                            <div className="flex items-baseline gap-4 mb-3">
                                <span className="text-5xl font-bold text-[#00AA6C]">3.8</span>
                                <div className="flex flex-col">
                                    <div className="flex gap-1 mb-1">
                                        {/* 4 Full Green Circles, 1 Empty Circle per request */}
                                        <div className="w-4 h-4 rounded-full bg-[#00AA6C]"></div>
                                        <div className="w-4 h-4 rounded-full bg-[#00AA6C]"></div>
                                        <div className="w-4 h-4 rounded-full bg-[#00AA6C]"></div>
                                        <div className="w-4 h-4 rounded-full bg-[#00AA6C]"></div>
                                        <div className="w-4 h-4 rounded-full border-2 border-[#00AA6C] bg-transparent"></div>
                                    </div>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">235 {t('testimonials.reviews')}</span>
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">#5 of 26 hotels in Port-au-Prince</p>
                        </div>

                        {/* Middle: Metrics Grid */}
                        <div className="w-full lg:w-1/3">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-4 text-sm uppercase tracking-wider">{t('testimonials.ratingSummary')}</h4>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                                {Metrics.map((metric, idx) => (
                                    <div key={idx} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">{t(`testimonials.metrics.${metric.key}`)}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-[#00AA6C] rounded-full"
                                                    style={{ width: `${(metric.score / 5) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-xs font-bold text-gray-900 dark:text-white w-4">{metric.score}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Description */}
                        <div className="w-full lg:w-1/3 pl-0 lg:pl-8 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700 pt-8 lg:pt-0">
                            <h4 className="font-bold text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wider">{t('testimonials.aboutTitle')}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                {t('testimonials.aboutDesc')}
                            </p>
                            <a 
                                href="https://www.tripadvisor.com/Hotel_Review-g147307-d3291297-Reviews-Servotel-Port_au_Prince_Ouest_Department_Haiti.html?m=19905" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#00AA6C] hover:text-[#008f5b] text-sm font-bold inline-flex items-center gap-1 transition-colors"
                            >
                                {t('testimonials.readMore')} <ExternalLink size={14} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-12">
                    {testimonials.map((review) => (
                        <div key={review.id} className="bg-white dark:bg-gray-800/60 dark:backdrop-blur-md p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/10 flex flex-col relative group">
                            {/* Top Green Line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[#00AA6C] rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <div key={i} className={`w-4 h-4 rounded-full ${i < review.rating ? 'bg-[#00AA6C]' : 'border border-[#00AA6C]'}`}></div>
                                    ))}
                                </div>
                                <img 
                                    src="/assets/images/tripadvisor-icon.ico" 
                                    alt="Tripadvisor" 
                                    className="w-6 h-6 opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all"
                                />
                            </div>
                            
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow mb-6 italic">
                                "{review.text}"
                            </p>
                            
                            <div className="flex items-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700">
                                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                                    <img src={review.image} alt={review.author} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h6 className="font-bold text-gray-900 dark:text-white text-sm">{review.author}</h6>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">{review.role}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center">
                    <a 
                        href="https://www.tripadvisor.com/Hotel_Review-g147307-d3291297-Reviews-Servotel-Port_au_Prince_Ouest_Department_Haiti.html?m=19905" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#00AA6C] hover:bg-[#008f5b] text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-green-900/20 transform hover:-translate-y-0.5"
                    >
                        <img src="/assets/images/tripadvisor-icon.ico" className="w-5 h-5 brightness-0 invert" alt="" />
                        <span>{t('testimonials.seeOn')}</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;