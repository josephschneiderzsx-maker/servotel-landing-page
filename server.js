import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import 'dotenv/config';
import { HotelNotificationTemplate } from './components/HotelNotificationTemplate.js';
import { CustomerRequestTemplate } from './components/CustomerRequestTemplate.js';
import { CustomerConfirmationTemplate } from './components/CustomerConfirmationTemplate.js';
import { CustomerDenialTemplate } from './components/CustomerDenialTemplate.js';

const app = express();
const port = 3001;
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${port}`;
const HOTEL_EMAIL = process.env.HOTEL_EMAIL || 'hotel@example.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Servotel <no-reply@yourdomain.com>';

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(express.json());
app.use(cors());

// --- Subject Translation Helpers ---
const getSubject = (template, lang, data = {}) => {
    const subjects = {
        customerRequest: {
            en: "Your Servotel Booking Request",
            es: "Su solicitud de reserva en Servotel",
            fr: "Votre demande de réservation à Servotel",
            ht: "Demann Rezèvasyon Servotel Ou"
        },
        hotelNotification: {
            en: `New Booking Request: ${data.roomType}`,
            es: `Nueva Solicitud de Reserva: ${data.roomType}`,
            fr: `Nouvelle Demande de Réservation: ${data.roomType}`,
            ht: `Nouvo Demann Rezèvasyon: ${data.roomType}`
        },
        customerConfirmation: {
            en: "✔ Your Servotel Booking is Confirmed",
            es: "✔ Su reserva en Servotel está confirmada",
            fr: "✔ Confirmation de votre réservation à Servotel",
            ht: "✔ Rezèvasyon Servotel Ou Konfime"
        },
        customerDenial: {
            en: "Update on your Servotel Booking Request",
            es: "Actualización sobre su solicitud de reserva en Servotel",
            fr: "Mise à jour concernant votre demande à Servotel",
            ht: "Mizajou sou Demann Rezèvasyon Servotel Ou"
        }
    };
    return subjects[template][lang] || subjects[template]['en'];
};


// Endpoint to handle the initial booking request from the user
app.post('/api/send', async (req, res) => {
    try {
        const { fullName, email, roomType, checkIn, checkOut, adults, children, language } = req.body;
        const lang = language || 'en';

        const queryParams = new URLSearchParams({ fullName, email, roomType, checkIn, checkOut, lang }).toString();
        const confirmUrl = `${API_BASE_URL}/api/confirm?${queryParams}`;
        const denyUrl = `${API_BASE_URL}/api/deny?${queryParams}`;

        // 1. Send acknowledgment email to the customer
        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: getSubject('customerRequest', lang),
            html: CustomerRequestTemplate({ fullName, roomType, checkIn, checkOut, language: lang }),
        });
        console.log("Customer acknowledgment email sent successfully.");

        // 2. Send notification email to the hotel
        const hotelEmailPayload = {
            from: FROM_EMAIL,
            to: HOTEL_EMAIL,
            subject: getSubject('hotelNotification', lang, { roomType }),
            html: HotelNotificationTemplate({
                fullName, email, roomType, checkIn, checkOut, adults, children, language: lang, confirmUrl, denyUrl
            }),
        };

        console.log("\n--- Sending Hotel Notification ---");
        console.log("From:", hotelEmailPayload.from);
        console.log("To:", hotelEmailPayload.to);
        console.log("Subject:", hotelEmailPayload.subject);
        console.log("---------------------------------\n");
        
        const { data, error } = await resend.emails.send(hotelEmailPayload);

        if (error) {
            console.error('Error sending hotel notification:', { error });
            return res.status(500).json({ error: 'Error sending email' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('Server error on /api/send:', { error });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint to handle the CONFIRM action from the hotel's email
app.get('/api/confirm', async (req, res) => {
    try {
        const { fullName, email, roomType, checkIn, checkOut, lang } = req.query;

        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: getSubject('customerConfirmation', lang),
            html: CustomerConfirmationTemplate({ fullName, roomType, checkIn, checkOut, language: lang }),
        });

        res.send('<h1 style="color: green; text-align: center; font-family: Arial;">Booking Confirmed!</h1><p style="text-align: center; font-family: Arial;">The customer has been notified.</p>');
    } catch (error) {
        console.error('Server error on /api/confirm:', { error });
        res.status(500).send('<h1>Error processing confirmation.</h1>');
    }
});

// Endpoint to handle the DENY action from the hotel's email
app.get('/api/deny', async (req, res) => {
    try {
        const { fullName, email, roomType, checkIn, checkOut, lang } = req.query;

        await resend.emails.send({
            from: FROM_EMAIL,
            to: email,
            subject: getSubject('customerDenial', lang),
            html: CustomerDenialTemplate({ fullName, roomType, checkIn, checkOut, language: lang }),
        });

        res.send('<h1 style="color: red; text-align: center; font-family: Arial;">Booking Denied.</h1><p style="text-align: center; font-family: Arial;">The customer has been notified of the cancellation.</p>');
    } catch (error) {
        console.error('Server error on /api/deny:', { error });
        res.status(500).send('<h1>Error processing denial.</h1>');
    }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
