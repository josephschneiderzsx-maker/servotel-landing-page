export const CustomerDenialTemplate = ({
    fullName,
    roomType,
    checkIn,
    checkOut,
    language,
  }) => {
      const translations = {
          fr: {
              subject: "Mise à jour concernant votre demande à Servotel",
              title: "Non-Disponibilité",
              greeting: `Cher(e) ${fullName},`,
              body: "Merci pour votre demande de réservation. Malheureusement, la chambre sélectionnée n'est plus disponible pour les dates que vous avez demandées.",
              details: "Détails de la demande :",
              room: "Chambre",
              dates: "Dates",
              next_steps: "Nous nous excusons pour ce désagrément. N'hésitez pas à essayer d'autres dates ou à nous contacter directement pour explorer d'autres options d'hébergement.",
              closing: "Cordialement,",
              team: "L'équipe Servotel"
          },
          en: {
              subject: "Update on your Servotel Booking Request",
              title: "Unavailable",
              greeting: `Dear ${fullName},`,
              body: "Thank you for your booking request. Unfortunately, the room you selected is no longer available for the dates you requested.",
              details: "Request Details:",
              room: "Room",
              dates: "Dates",
              next_steps: "We apologize for any inconvenience. Please feel free to try alternative dates or contact us directly to explore other accommodation options.",
              closing: "Sincerely,",
              team: "The Servotel Team"
          },
          es: {
              subject: "Actualización sobre su solicitud de reserva en Servotel",
              title: "No Disponible",
              greeting: `Estimado/a ${fullName},`,
              body: "Gracias por su solicitud de reserva. Desafortunadamente, la habitación seleccionada ya no está disponible para las fechas solicitadas.",
              details: "Detalles de la solicitud:",
              room: "Habitación",
              dates: "Fechas",
              next_steps: "Lamentamos cualquier inconveniente. No dude en probar otras fechas o contactarnos directamente para explorar otras opciones.",
              closing: "Atentamente,",
              team: "El equipo de Servotel"
          },
          ht: {
              subject: "Mizajou sou Demann Rezèvasyon Servotel Ou",
              title: "Pa Disponib",
              greeting: `Chè ${fullName},`,
              body: "Mèsi pou demann rezèvasyon ou. Malerezman, chanm ou chwazi a pa disponib ankò pou dat ou mande yo.",
              details: "Detay demann lan:",
              room: "Chanm",
              dates: "Dat yo",
              next_steps: "Nou eskize nou pou nenpòt deranjman. Pa ezite eseye lòt dat oswa kontakte nou dirèkteman pou eksplore lòt opsyon.",
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
          .header { background-color: #EF4444; padding: 40px 20px; text-align: center; }
          .logo { height: 50px; width: auto; }
          .content { padding: 40px 30px; }
          .h1 { font-family: 'Playfair Display', serif; color: #ffffff; font-size: 32px; margin-top: 0; margin-bottom: 20px; text-align: center; }
          .text { font-size: 16px; line-height: 1.6; color: #374151; margin-bottom: 20px; }
          .details-box { background-color: #fee2e2; border-left: 4px solid #EF4444; border-radius: 4px; padding: 25px; margin: 30px 0; }
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