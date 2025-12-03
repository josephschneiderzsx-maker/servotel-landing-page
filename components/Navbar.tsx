import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarCheck, Moon, Sun, Globe } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

const Navbar: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isDark, setIsDark] = useState(false);
    const { language, setLanguage, t } = useLanguage();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        const applyTheme = () => {
            const isSystemDark = mediaQuery.matches;
            const storedTheme = localStorage.theme;
            
            if (storedTheme === 'dark' || (!storedTheme && isSystemDark)) {
                document.documentElement.classList.add('dark');
                setIsDark(true);
            } else {
                document.documentElement.classList.remove('dark');
                setIsDark(false);
            }
        };

        applyTheme();

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (!localStorage.theme) {
                if (e.matches) {
                    document.documentElement.classList.add('dark');
                    setIsDark(true);
                } else {
                    document.documentElement.classList.remove('dark');
                    setIsDark(false);
                }
            }
        };

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            mediaQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
            setIsDark(true);
        }
    };

    const navLinks = [
        { name: t('nav.home'), href: '#home' },
        { name: t('nav.about'), href: '#about' },
        { name: t('nav.rooms'), href: '#rooms' },
        { name: t('nav.amenities'), href: '#amenities' },
        { name: t('nav.shuttle'), href: '#shuttle' },
        { name: t('nav.location'), href: '#location' },
    ];

    const languages: { code: Language; label: string }[] = [
        { code: 'en', label: 'English' },
        { code: 'fr', label: 'Français' },
        { code: 'es', label: 'Español' },
        { code: 'ht', label: 'Kreyòl' }
    ];

    return (
        <nav 
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
                isScrolled 
                    ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-gray-200/50 dark:border-white/5 py-2' 
                    : 'bg-transparent border-transparent py-5'
            }`}
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <a href="#home" className="flex items-center gap-3 group z-50">
                        <img 
                            src="/assets/images/servotel-logo.png" 
                            alt="SERVOTEL" 
                            className={`h-10 w-auto object-contain transition-all duration-300 ${isScrolled ? 'brightness-100 dark:brightness-0 dark:invert' : 'brightness-0 invert'}`}
                        />
                    </a>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-6">
                        <div className="flex gap-6 bg-white/10 dark:bg-gray-900/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 dark:border-white/10 shadow-lg shadow-black/5">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`text-sm font-medium tracking-wide transition-colors relative group ${
                                        isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary' : 'text-white/90 hover:text-white'
                                    }`}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all group-hover:w-full`}></span>
                                </a>
                            ))}
                        </div>
                        
                        <div className="flex items-center gap-4 pl-2">
                             {/* Language Switcher */}
                             <div className="relative">
                                <button 
                                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                                    className={`flex items-center gap-1 p-2 rounded-lg transition-all ${
                                        isScrolled 
                                            ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10' 
                                            : 'text-white hover:bg-white/20'
                                    }`}
                                >
                                    <Globe size={18} />
                                    <span className="text-xs font-bold uppercase">{language}</span>
                                </button>
                                
                                {isLangMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden py-1">
                                        {languages.map((lang) => (
                                            <button
                                                key={lang.code}
                                                onClick={() => {
                                                    setLanguage(lang.code);
                                                    setIsLangMenuOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                                                    language === lang.code 
                                                        ? 'text-primary font-bold bg-gray-50 dark:bg-gray-700/50' 
                                                        : 'text-gray-700 dark:text-gray-200'
                                                }`}
                                            >
                                                {lang.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={toggleTheme}
                                className={`p-2 rounded-full transition-all ${
                                    isScrolled 
                                        ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10' 
                                        : 'text-white hover:bg-white/20'
                                }`}
                                aria-label="Toggle Dark Mode"
                            >
                                {isDark ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                             <a href="tel:+50928127500" className={`flex items-center gap-2 text-sm font-semibold transition-colors ${isScrolled ? 'text-dark dark:text-white' : 'text-white'}`}>
                                <Phone size={18} className="text-secondary" />
                                <span className="hidden xl:inline">+509 28 12 75 00</span>
                            </a>
                            <a 
                                href="#booking"
                                className="bg-primary hover:bg-primary-dark text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg hover:shadow-primary/40"
                            >
                                <CalendarCheck size={16} />
                                {t('nav.reserve')}
                            </a>
                        </div>
                    </div>

                    {/* Mobile Controls */}
                    <div className="lg:hidden flex items-center gap-2 z-50">
                        <button 
                             onClick={() => {
                                const langs: Language[] = ['en', 'fr', 'es', 'ht'];
                                const currentIndex = langs.indexOf(language);
                                const nextIndex = (currentIndex + 1) % langs.length;
                                setLanguage(langs[nextIndex]);
                             }}
                             className={`p-2 rounded-lg text-xs font-bold uppercase transition-all ${
                                 isScrolled 
                                     ? 'text-gray-600 dark:text-gray-300' 
                                     : 'text-white'
                             }`}
                        >
                            {language}
                        </button>
                        <button 
                            onClick={toggleTheme}
                            className={`p-2 rounded-full transition-all ${
                                isScrolled 
                                    ? 'text-gray-600 dark:text-gray-300' 
                                    : 'text-white'
                            }`}
                        >
                            {isDark ? <Sun size={20} /> : <Moon size={20} />}
                        </button>
                        <button 
                            className={`p-2 rounded-lg transition-colors ${
                                isScrolled ? 'text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10' : 'text-white hover:bg-white/10'
                            }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div 
                className={`lg:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl z-40 transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
                }`}
            >
                <div className="flex flex-col items-center justify-center h-full gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-2xl font-serif font-bold text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </a>
                    ))}
                    <a 
                        href="#booking"
                        className="mt-4 bg-secondary text-white px-8 py-3 rounded-full font-bold text-lg shadow-xl"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                         {t('nav.bookNow')}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;