export const CustomerConfirmationTemplate = ({
    fullName,
    roomType,
    checkIn,
    checkOut,
    language,
  }) => {
      const translations = {
          fr: {
              subject: "✔ Confirmation de votre réservation à Servotel",
              title: "Réservation Confirmée",
              greeting: `Cher(e) ${fullName},`,
              body: "Excellente nouvelle ! Nous avons le plaisir de confirmer la disponibilité pour votre demande. Votre séjour est maintenant officiellement confirmé.",
              details: "Récapitulatif de réservation :",
              room: "Chambre",
              dates: "Dates",
              next_steps: "Nous sommes impatients de vous accueillir. Si vous avez des questions avant votre arrivée, n'hésitez pas à nous contacter.",
              closing: "Cordialement,",
              team: "L'équipe Servotel"
          },
          en: {
              subject: "✔ Your Servotel Booking is Confirmed",
              title: "Booking Confirmed",
              greeting: `Dear ${fullName},`,
              body: "Great news! We are pleased to confirm availability for your request. Your stay is now officially confirmed.",
              details: "Booking Summary:",
              room: "Room",
              dates: "Dates",
              next_steps: "We look forward to welcoming you. If you have any questions before your arrival, please feel free to contact us.",
              closing: "Sincerely,",
              team: "The Servotel Team"
          },
          es: {
              subject: "✔ Su reserva en Servotel está confirmada",
              title: "Reserva Confirmada",
              greeting: `Estimado/a ${fullName},`,
              body: "¡Excelentes noticias! Nos complace confirmar la disponibilidad para su solicitud. Su estancia está ahora oficialmente confirmada.",
              details: "Resumen de reserva:",
              room: "Habitación",
              dates: "Fechas",
              next_steps: "Esperamos darle la bienvenida. Si tiene alguna pregunta antes de su llegada, no dude en contactarnos.",
              closing: "Atentamente,",
              team: "El equipo de Servotel"
          },
          ht: {
              subject: "✔ Rezèvasyon Servotel Ou Konfime",
              title: "Rezèvasyon Konfime",
              greeting: `Chè ${fullName},`,
              body: "Bon nouvèl! Nou kontan konfime disponiblite pou demann ou an. Sejou ou a kounye a konfime ofisyèlman.",
              details: "Rezime Rezèvasyon:",
              room: "Chanm",
              dates: "Dat yo",
              next_steps: "N ap tann ou ak enpasyans. Si ou gen kesyon anvan ou rive, pa ezite kontakte nou.",
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
          .header { background-color: #10B981; padding: 40px 20px; text-align: center; }
          .logo { height: 50px; width: auto; }
          .content { padding: 40px 30px; }
          .h1 { font-family: 'Playfair Display', serif; color: #ffffff; font-size: 32px; margin-top: 0; margin-bottom: 20px; text-align: center; }
          .text { font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px; }
          .details-box { background-color: #f3f4f6; border-left: 4px solid #10B981; border-radius: 4px; padding: 25px; margin: 30px 0; }
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
                          <img src="https://servotel.itxpress.net/assets/images/servotel-logo.png" alt="Servotel" class="logo" style="filter: brightness(0) invert(1);" />
                          <h1 class="h1" style="margin-top: 20px;">${t.title}</h1>
                      </div>
                      <div class="content">
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
  
                          <p class="text">${t.next_steps}</p>
                          <p class="text">
                              ${t.closing}<br>
                              <span style="color: #059669; font-weight: bold;">${t.team}</span>
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