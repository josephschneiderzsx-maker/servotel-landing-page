export const CustomerRequestTemplate = ({
    fullName,
    roomType,
    checkIn,
    checkOut,
    language,
  }) => {
      const translations = {
          fr: {
              subject: "Votre demande de réservation à Servotel",
              title: "Demande Reçue",
              greeting: `Cher(e) ${fullName},`,
              body: "Nous avons bien reçu votre demande de réservation. Notre équipe vérifie actuellement la disponibilité pour les dates sélectionnées et vous répondra dans les plus brefs délais.",
              details: "Détails de votre demande :",
              room: "Chambre",
              dates: "Dates",
              closing: "Cordialement,",
              team: "L'équipe Servotel"
          },
          en: {
              subject: "Your Servotel Booking Request",
              title: "Request Received",
              greeting: `Dear ${fullName},`,
              body: "We have successfully received your booking request. Our team is currently checking availability for your selected dates and will get back to you shortly.",
              details: "Your Request Details:",
              room: "Room",
              dates: "Dates",
              closing: "Sincerely,",
              team: "The Servotel Team"
          },
          es: {
              subject: "Su solicitud de reserva en Servotel",
              title: "Solicitud Recibida",
              greeting: `Estimado/a ${fullName},`,
              body: "Hemos recibido su solicitud de reserva. Nuestro equipo está verificando la disponibilidad para las fechas seleccionadas y le responderá en breve.",
              details: "Detalles de su solicitud:",
              room: "Habitación",
              dates: "Fechas",
              closing: "Atentamente,",
              team: "El equipo de Servotel"
          },
          ht: {
              subject: "Demann Rezèvasyon Servotel Ou",
              title: "Demann Resevwa",
              greeting: `Chè ${fullName},`,
              body: "Nou byen resevwa demann rezèvasyon ou an. Ekip nou an ap verifye disponiblite pou dat ou chwazi yo epi n ap reponn ou talè konsa.",
              details: "Detay demann ou an:",
              room: "Chanm",
              dates: "Dat yo",
              closing: "Sensèman,",
              team: "Ekip Servotel"
          }
      };
  
      const t = translations[language] || translations.en;
  
      return `
  <!DOCTYPE html>
  <html>
  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
      <style>
          body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #111827; color: #e5e7eb; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1f2937; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
          .header { background-color: #1f2937; padding: 40px 20px; text-align: center; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .logo { height: 60px; width: auto; }
          .content { padding: 40px 30px; }
          .h1 { font-family: 'Playfair Display', serif; color: #f59e0b; font-size: 28px; margin-top: 0; margin-bottom: 20px; text-align: center; }
          .text { font-size: 16px; line-height: 1.6; color: #d1d5db; margin-bottom: 20px; }
          .details-box { background-color: rgba(22, 115, 71, 0.1); border: 1px solid rgba(22, 115, 71, 0.3); border-radius: 12px; padding: 25px; margin: 30px 0; }
          .details-title { font-family: 'Playfair Display', serif; color: #ffffff; font-size: 20px; margin-top: 0; margin-bottom: 15px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; }
          .detail-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid rgba(255,255,255,0.05); padding-bottom: 5px; }
          .detail-label { font-weight: 600; color: #f59e0b; }
          .detail-value { color: #ffffff; }
          .footer { background-color: #111827; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid rgba(255,255,255,0.05); }
          .highlight { color: #167347; font-weight: bold; }
      </style>
  </head>
  <body>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #111827; padding: 40px 0;">
          <tr>
              <td align="center">
                  <div class="container">
                      <div class="header">
                          <!-- Placeholder for Logo - ensure this path is absolute in production -->
                          <img src="/public/assets/images/servotel-logo.png" alt="Servotel" class="logo" style="filter: brightness(0) invert(1);" />
                      </div>
                      <div class="content">
                          <h1 class="h1">${t.title}</h1>
                          <p class="text">${t.greeting}</p>
                          <p class="text">${t.body}</p>
                          
                          <div class="details-box">
                              <h2 class="details-title">${t.details}</h2>
                              <div class="text">
                                  <strong>${t.room}:</strong> <span style="color:white">${roomType}</span><br>
                                  <strong>${t.dates}:</strong> <span style="color:white">${checkIn} — ${checkOut}</span>
                              </div>
                          </div>
  
                          <p class="text">
                              ${t.closing}<br>
                              <span class="highlight">${t.team}</span>
                          </p>
                      </div>
                      <div class="footer">
                          <p>&copy; ${new Date().getFullYear()} Servotel Haiti. All rights reserved.</p>
                          <p>Route de l'Aéroport, Zone Cargo, Tabarre, Haiti</p>
                      </div>
                  </div>
              </td>
          </tr>
      </table>
  </body>
  </html>
      `;
  };