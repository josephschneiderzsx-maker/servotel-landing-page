import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Plane, User, Mail, BedDouble, Calendar, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const slides = [
    '/assets/images/hero-1.jpg', 
    '/assets/images/hero-2.jpg', 
    '/assets/images/hero-3.jpg', 
    '/assets/images/hero-4.jpg' 
];

const Hero: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { t } = useLanguage();

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        roomType: 'Standard Single',
        checkIn: '',
        checkOut: '',
        adults: '2',
        children: '0'
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, language: t('currentLang') }),
            });

            if (response.ok) {
                setIsSuccess(true);
                // Reset après 3 secondes
                setTimeout(() => setIsSuccess(false), 5000);
                setFormData({ ...formData, fullName: '', email: '' }); // Reset partiel
            } else {
                alert("Erreur lors de l'envoi.");
            }
        } catch (error) {
            console.error(error);
            alert("Erreur technique.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const getMinCheckoutDate = () => {
        if (!formData.checkIn) return undefined;
        const date = new Date(formData.checkIn);
        date.setDate(date.getDate() + 1);
        return date.toISOString().split('T')[0];
    };

    return (
        <section id="home" className="relative min-h-screen w-full overflow-hidden flex items-center pt-20 lg:pt-0">
            {/* Background Slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0 w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[currentSlide]})` }}
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/30 z-10" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 container mx-auto px-4 md:px-6 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    
                    {/* Left Column: Text */}
                    <div className="lg:col-span-7 text-white pt-10 lg:pt-0">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20 shadow-lg">
                                <Plane className="text-secondary w-4 h-4" />
                                <span className="text-sm font-medium tracking-wide">{t('hero.tagline')}</span>
                            </div>

                            <h1 className="font-serif text-4xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-2xl">
                                {t('hero.title')} <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-orange-400">{t('hero.titleSuffix')}</span>
                            </h1>

                            <p className="text-lg text-gray-200 mb-8 max-w-xl font-light leading-relaxed drop-shadow-md">
                                {t('hero.description')}
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <a href="#rooms" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-semibold transition-all flex items-center gap-2 hover:border-white/50 group">
                                    {t('hero.explore')}
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/*QB Right Column: Booking Form (Aside) */}
                    <div className="lg:col-span-5 pb-10 lg:pb-0" id="booking">
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="bg-white/10 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700 rounded-2xl p-6 md:p-8 shadow-2xl relative overflow-hidden"
                        >
                            {/* Success Overlay */}
                            <AnimatePresence>
                                {isSuccess && (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-50 bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-center text-white text-center p-6"
                                    >
                                        <CheckCircle size={64} className="mb-4 text-white animate-bounce" />
                                        <h3 className="text-2xl font-serif font-bold mb-2">{t('hero.requestSentTitle')}</h3>
                                        <p className="text-white/90">{t('hero.requestSentMsg')} <br/><span className="font-bold underline">{formData.email}</span>.</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="mb-6">
                                <h3 className="text-2xl font-serif font-bold text-white mb-1">{t('hero.checkAvail')}</h3>
                                <p className="text-gray-300 text-sm">{t('hero.confirmMsg')}</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Personal Info */}
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <User className="absolute left-3 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-secondary transition-colors" />
                                        <input 
                                            type="text" 
                                            name="fullName"
                                            required
                                            placeholder={t('hero.form.name')}
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                    <div className="relative group">
                                        <Mail className="absolute left-3 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-secondary transition-colors" />
                                        <input 
                                            type="email" 
                                            name="email"
                                            required
                                            placeholder={t('hero.form.email')}
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Room Type Selection */}
                                <div className="relative group">
                                    <BedDouble className="absolute left-3 top-3.5 text-gray-400 w-5 h-5 group-focus-within:text-secondary transition-colors z-10" />
                                    <select 
                                        name="roomType"
                                        value={formData.roomType}
                                        onChange={handleInputChange}
                                        className="w-full bg-gray-800/50 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-secondary focus:border-transparent outline-none transition-all appearance-none cursor-pointer"
                                    >
                                        <option value="Standard Single" className="text-gray-900">{t('rooms.types.stdSingle.name')}</option>
                                        <option value="Standard Double" className="text-gray-900">{t('rooms.types.stdDouble.name')}</option>
                                        <option value="Suite Single" className="text-gray-900">{t('rooms.types.steSingle.name')}</option>
                                        <option value="Suite Double" className="text-gray-900">{t('rooms.types.steDouble.name')}</option>
                                    </select>
                                    <ChevronRight className="absolute right-3 top-3.5 text-gray-400 w-5 h-5 rotate-90 pointer-events-none" />
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-1">
                                            <Calendar size={12} /> {t('hero.form.checkIn')}
                                        </label>
                                        <input 
                                            type="date" 
                                            name="checkIn"
                                            required
                                            min={new Date().toISOString().split('T')[0]}
                                            value={formData.checkIn}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none transition-all color-scheme-dark" 
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider flex items-center gap-1">
                                            <Calendar size={12} /> {t('hero.form.checkOut')}
                                        </label>
                                        <input 
                                            type="date" 
                                            name="checkOut"
                                            required
                                            min={getMinCheckoutDate()}
                                            disabled={!formData.checkIn}
                                            value={formData.checkOut}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none transition-all color-scheme-dark disabled:opacity-50 disabled:cursor-not-allowed" 
                                        />
                                    </div>
                                </div>

                                {/* Guests */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">{t('hero.form.adults')}</label>
                                        <select 
                                            name="adults"
                                            value={formData.adults}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                                        >
                                            {[1,2,3,4,5].map(num => <option key={num} value={num} className="text-gray-900">{num}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400 tracking-wider">{t('hero.form.children')}</label>
                                        <select 
                                            name="children"
                                            value={formData.children}
                                            onChange={handleInputChange}
                                            className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-3 py-2.5 text-white focus:ring-2 focus:ring-primary outline-none transition-all"
                                        >
                                            {[0,1,2,3].map(num => <option key={num} value={num} className="text-gray-900">{num}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-secondary hover:bg-orange-600 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-lg shadow-secondary/30 mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            {t('hero.sending')}
                                        </>
                                    ) : (
                                        <>
                                            {t('hero.checkAvail')}
                                            <ChevronRight size={20} />
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;