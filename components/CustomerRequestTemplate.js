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
      <meta name="color-scheme" content="light only">
      <meta name="supported-color-schemes" content="light only">
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
      <style>
          :root {
            color-scheme: light only;
            supported-color-schemes: light only;
          }
          body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #f3f4f6; color: #374151; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
          .header { background-color: #f9fafb; padding: 30px 20px; text-align: center; border-bottom: 1px solid #e5e7eb; }
          .logo { height: 50px; width: auto; }
          .content { padding: 40px 30px; }
          .h1 { font-family: 'Playfair Display', serif; color: #1f2937; font-size: 32px; margin-top: 0; margin-bottom: 20px; text-align: center; }
          .text { font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px; }
          .details-box { background-color: #f3f4f6; border-left: 4px solid #F59E0B; border-radius: 4px; padding: 25px; margin: 30px 0; }
          .details-title { font-family: 'Playfair Display', serif; color: #1f2937; font-size: 20px; margin-top: 0; margin-bottom: 15px; }
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #e5e7eb; }
      </style>
  </head>
  <body style="background-color: #f3f4f6;">
      <!--[if gte mso 9]>
      <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
        <v:fill type="tile" src="https://servotel.itxpress.net/assets/images/room-blurred.jpg" color="#f3f4f6"/>
      </v:background>
      <![endif]-->
      <table height="100%" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f3f4f6;" background="https://servotel.itxpress.net/assets/images/room-blurred.jpg">
          <tr>
              <td valign="top" align="center" style="padding: 40px 0;">
                  <div class="container">
                      <div class="header">
                          <img src="https://servotel.itxpress.net/assets/images/servotel-logo.png" alt="Servotel" class="logo" />
                      </div>
                      <div class="content">
                          <h1 class="h1">${t.title}</h1>
                          <p class="text">${t.greeting}</p>
                          <p class="text">${t.body}</p>
                          
                          <div class="details-box">
                              <h2 class="details-title">${t.details}</h2>
                              <p class="text" style="margin-bottom: 10px;">
                                  <strong>${t.room}:</strong> <span style="color:#1f2937">${roomType}</span>
                              </p>
                              <p class="text" style="margin-bottom: 0;">
                                  <strong>${t.dates}:</strong> <span style="color:#1f2937">${checkIn} — ${checkOut}</span>
                              </p>
                          </div>
  
                          <p class="text">
                              ${t.closing}<br>
                              <span style="color: #4b5563; font-weight: bold;">${t.team}</span>
                          </p>
                      </div>
                      <div class="footer">
                          <p>&copy; ${new Date().getFullYear()} Servotel Haiti. All rights reserved.</p>
                      </div>
                  </div>
              </td>
          </tr>
      </table>
  </body>
  </html>
      `;
  };