// --- Imports ---
import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';

// Email Templates
import { HotelNotificationTemplate } from './components/HotelNotificationTemplate.js';
import { CustomerRequestTemplate } from './components/CustomerRequestTemplate.js';
import { CustomerConfirmationTemplate } from './components/CustomerConfirmationTemplate.js';
import { CustomerDenialTemplate } from './components/CustomerDenialTemplate.js';

// --- Basic Setup & Environment Variables ---
const app = express();
const port = process.env.PORT || 3001;
const isProduction = process.env.NODE_ENV === 'production';

// Fallback values are for development only. In production, these should be set in the .env file.
const API_BASE_URL = process.env.API_BASE_URL || `http://localhost:${port}`;
const HOTEL_EMAIL = process.env.HOTEL_EMAIL || 'hotel@example.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'Servotel <no-reply@yourdomain.com>';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || 'http://localhost:5173';

// Since __dirname is not available in ES modules, we create it
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --- Email Service Initialization ---
// The Resend API key is fetched from environment variables.
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Security Middleware ---

// 1. Helmet: Adds various security-related HTTP headers to protect against common vulnerabilities.
app.use(helmet());

// 2. CORS (Cross-Origin Resource Sharing): Restricts requests to a specific domain in production.
const corsOptions = {
  origin: isProduction ? ALLOWED_ORIGIN : '*', // Allow only your frontend domain in production
};
app.use(cors(corsOptions));

// 3. Rate Limiting: Prevents abuse by limiting the number of requests per IP address.
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per window
	standardHeaders: true,
	legacyHeaders: false, 
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply the rate limiter to all API routes
app.use('/api/', apiLimiter);

// 4. Body Parser: Middleware to parse incoming JSON request bodies.
app.use(express.json());


// --- Utility Functions ---

/**
 * A helper function to get the translated email subject based on the template and language.
 * @param {string} template - The name of the email template (e.g., 'customerRequest').
 * @param {string} lang - The language code (e.g., 'en', 'fr').
 * @param {object} data - Optional data to include in the subject (e.g., { roomType }).
 * @returns {string} The translated subject line.
 */
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


// --- API Routes ---

/**
 * @route   POST /api/send
 * @desc    Handles the initial booking request from the user.
 *          It sends an acknowledgment email to the customer and a notification to the hotel.
 */
app.post('/api/send', async (req, res) => {
    try {
        const { fullName, email, roomType, checkIn, checkOut, adults, children, language } = req.body;
        const lang = language || 'en';

        // Generate confirmation and denial links for the hotel's email
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

        // 2. Send notification email to the hotel with action links
        const { data, error } = await resend.emails.send({
            from: FROM_EMAIL,
            to: HOTEL_EMAIL,
            subject: getSubject('hotelNotification', lang, { roomType }),
            html: HotelNotificationTemplate({
                fullName, email, roomType, checkIn, checkOut, adults, children, language: lang, confirmUrl, denyUrl
            }),
        });

        if (error) {
            console.error('Error sending hotel notification:', { error });
            return res.status(500).json({ error: 'Error sending email' });
        }

        res.status(200).json({ message: 'Booking request processed successfully.' });
    } catch (error) {
        console.error('Server error on /api/send:', { error });
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/**
 * @route   GET /api/confirm
 * @desc    Handles the CONFIRM action from the hotel's email.
 *          Sends a confirmation email to the customer.
 */
app.get('/api/confirm', async (req, res) => {
    try {
        const { fullName, email, roomType, checkIn, checkOut, lang } = req.query;

        // Send confirmation email to the customer
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

/**
 * @route   GET /api/deny
 * @desc    Handles the DENY action from the hotel's email.
 *          Sends a denial/cancellation email to the customer.
 */
app.get('/api/deny', async (req, res) => {
    try {
        const { fullName, email, roomType, checkIn, checkOut, lang } = req.query;
        
        // Send denial email to the customer
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


// --- Serve Frontend ---
// This section should only be active in a production environment where Node.js serves the frontend.

// Serve the static files (HTML, CSS, JS) from the React build directory
app.use(express.static(__dirname));

// For any GET request that doesn't match an API route or a static file,
// send back the main index.html file. This is crucial for single-page applications (SPAs) like React.
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// --- Start Server ---
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
