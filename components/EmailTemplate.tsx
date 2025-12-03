import * as React from 'react';

interface EmailTemplateProps {
  fullName: string;
  email: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  language: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  fullName,
  email,
  roomType,
  checkIn,
  checkOut,
  adults,
  children,
  language
}) => {
    const translations = {
        fr: {
            subject: "Nouvelle demande de réservation !",
            from: "De :",
            details: "Détails du séjour :",
            roomTypeLabel: "Type de chambre :",
            checkInLabel: "Arrivée :",
            checkOutLabel: "Départ :",
            adultsLabel: "Adultes :",
            childrenLabel: "Enfants :",
        },
        en: {
            subject: "New Booking Request!",
            from: "From :",
            details: "Stay Details :",
            roomTypeLabel: "Room Type :",
            checkInLabel: "Check-in :",
            checkOutLabel: "Check-out :",
            adultsLabel: "Adults :",
            childrenLabel: "Children :",
        }
    }

    const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div style={{ fontFamily: 'sans-serif', color: '#333' }}>
      <h1>{t.subject}</h1>
      <p><strong>{t.from}</strong> {fullName} ({email})</p>
      <hr />
      <h2>{t.details}</h2>
      <ul>
        <li><strong>{t.roomTypeLabel}</strong> {roomType}</li>
        <li><strong>{t.checkInLabel}</strong> {checkIn}</li>
        <li><strong>{t.checkOutLabel}</strong> {checkOut}</li>
        <li><strong>{t.adultsLabel}</strong> {adults}</li>
        <li><strong>{t.childrenLabel}</strong> {children}</li>
      </ul>
    </div>
  );
};
