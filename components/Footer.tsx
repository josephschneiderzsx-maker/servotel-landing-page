import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useModal } from '../context/ModalContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();
    const { openModal } = useModal();

    return (
        <footer id="contact" className="bg-dark text-white pt-20 pb-10 border-t border-gray-800">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                         <img 
                            src="/assets/images/servotel-logo.png" 
                            alt="SERVOTEL" 
                            className="h-12 w-auto mb-6 brightness-0 invert"
                        />
                        <p className="text-gray-400 leading-relaxed mb-6">
                            {t('footer.desc')}
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                                <Linkedin size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h6 className="font-bold text-lg mb-6 text-primary">{t('footer.explore')}</h6>
                        <ul className="space-y-3 text-gray-400">
                            <li><a href="#home" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
                            <li><a href="#about" className="hover:text-white transition-colors">{t('nav.about')}</a></li>
                            <li><a href="#rooms" className="hover:text-white transition-colors">{t('nav.rooms')}</a></li>
                            <li><a href="#amenities" className="hover:text-white transition-colors">{t('nav.amenities')}</a></li>
                            <li><a href="#shuttle" className="hover:text-white transition-colors">{t('nav.shuttle')}</a></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h6 className="font-bold text-lg mb-6 text-primary">{t('footer.services')}</h6>
                        <ul className="space-y-3 text-gray-400">
                            <li><button onClick={() => openModal('dining')} className="hover:text-white transition-colors text-left">{t('footer.links.dining')}</button></li>
                            <li><button onClick={() => openModal('transfer')} className="hover:text-white transition-colors text-left">{t('footer.links.transfer')}</button></li>
                            <li><button onClick={() => openModal('concierge')} className="hover:text-white transition-colors text-left">{t('footer.links.concierge')}</button></li>
                            <li><button onClick={() => openModal('business')} className="hover:text-white transition-colors text-left">{t('footer.links.business')}</button></li>
                            <li><button onClick={() => openModal('events')} className="hover:text-white transition-colors text-left">{t('footer.links.events')}</button></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h6 className="font-bold text-lg mb-6 text-primary">{t('footer.contact')}</h6>
                        <div className="space-y-4 text-gray-400">
                            <div className="flex items-start gap-3">
                                <MapPin className="mt-1 shrink-0 text-secondary" size={18} />
                                <span>Route de l'Aéroport, Zone Cargo, Tabarre, Haiti</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="shrink-0 text-secondary" size={18} />
                                <span>+509 28 12 75 00</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="shrink-0 text-secondary" size={18} />
                                <span>info@servotelhaiti.com</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-800 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Servotel. {t('footer.rights')}</p>
                    <div className="flex gap-6">
                        <button onClick={() => openModal('privacy')} className="hover:text-white transition-colors">{t('footer.privacy')}</button>
                        <button onClick={() => openModal('terms')} className="hover:text-white transition-colors">{t('footer.terms')}</button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;