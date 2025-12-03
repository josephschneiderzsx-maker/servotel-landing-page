export const HotelNotificationTemplate = ({
    fullName,
    email,
    roomType,
    checkIn,
    checkOut,
    adults,
    children,
    language,
    confirmUrl,
    denyUrl,
  }) => {
      const translations = {
          fr: {
              subject: `Nouvelle Demande : ${roomType}`,
              title: "Nouvelle Demande de Réservation",
              subtitle: "Une nouvelle demande nécessite votre attention.",
              name: "Nom du client",
              emailLabel: "Email",
              room: "Type de chambre",
              dates: "Dates du séjour",
              guests: "Occupants",
              adults: "Adultes",
              children: "Enfants",
              action: "Action requise :",
              confirm: "Confirmer la Disponibilité",
              deny: "Refuser la Demande"
          },
          en: {
              subject: `New Request: ${roomType}`,
              title: "New Booking Request",
              subtitle: "A new booking request requires your attention.",
              name: "Guest Name",
              emailLabel: "Email",
              room: "Room Type",
              dates: "Stay Dates",
              guests: "Occupants",
              adults: "Adults",
              children: "Children",
              action: "Action Required:",
              confirm: "Confirm Availability",
              deny: "Deny Request"
          },
          es: {
              subject: `Nueva Solicitud: ${roomType}`,
              title: "Nueva Solicitud de Reserva",
              subtitle: "Una nueva solicitud requiere su atención.",
              name: "Nombre del cliente",
              emailLabel: "Correo",
              room: "Tipo de habitación",
              dates: "Fechas",
              guests: "Huéspedes",
              adults: "Adultos",
              children: "Niños",
              action: "Acción requerida:",
              confirm: "Confirmar Disponibilidad",
              deny: "Denegar Solicitud"
          },
          ht: {
              subject: `Nouvo Demann: ${roomType}`,
              title: "Nouvo Demann Rezèvasyon",
              subtitle: "Yon nouvo demann bezwen atansyon ou.",
              name: "Non Kliyan an",
              emailLabel: "Imel",
              room: "Kalite Chanm",
              dates: "Dat Sejou",
              guests: "Moun",
              adults: "Granmoun",
              children: "Timoun",
              action: "Aksyon obligatwa:",
              confirm: "Konfime Disponibilite",
              deny: "Refize Demann"
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
          .content { padding: 30px; }
          .h1 { font-family: 'Playfair Display', serif; color: #1f2937; font-size: 28px; margin-top: 0; margin-bottom: 10px; text-align: center; }
          .subtitle { color: #6b7280; text-align: center; margin-bottom: 30px; font-size: 16px; }
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: #f9fafb; border-radius: 8px; overflow: hidden; border: 1px solid #e5e7eb; }
          .data-row td { padding: 15px; border-bottom: 1px solid #e5e7eb; color: #374151; font-size: 14px; }
          .data-row:last-child td { border-bottom: none; }
          .data-label { font-weight: 600; color: #4b5563; width: 40%; }
          .data-value { color: #1f2937; font-weight: 500; }
          .actions { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;}
          .btn { display: inline-block; padding: 14px 28px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 16px; margin: 5px; transition: all 0.2s; border: 1px solid transparent; }
          .btn-confirm { background-color: #10B981; color: white; }
          .btn-deny { background-color: #fee2e2; color: #EF4444; }
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
                          <p class="subtitle">${t.subtitle}</p>
                          <table class="data-table">
                              <tr class="data-row">
                                  <td class="data-label">${t.name}</td>
                                  <td class="data-value">${fullName}</td>
                              </tr>
                              <tr class="data-row">
                                  <td class="data-label">${t.emailLabel}</td>
                                  <td class="data-value"><a href="mailto:${email}" style="color: #1d4ed8; text-decoration: none;">${email}</a></td>
                              </tr>
                              <tr class="data-row">
                                  <td class="data-label">${t.room}</td>
                                  <td class="data-value" style="color: #059669; font-weight: bold;">${roomType}</td>
                              </tr>
                              <tr class="data-row">
                                  <td class="data-label">${t.dates}</td>
                                  <td class="data-value">${checkIn} — ${checkOut}</td>
                              </tr>
                              <tr class="data-row">
                                  <td class="data-label">${t.guests}</td>
                                  <td class="data-value">${adults} ${t.adults}, ${children} ${t.children}</td>
                              </tr>
                          </table>
  
                          <div class="actions">
                              <p style="margin-bottom: 20px; font-size: 14px; font-weight: 600; color: #4b5563;">${t.action}</p>
                              <a href="${confirmUrl}" class="btn btn-confirm">${t.confirm}</a>
                              <a href="${denyUrl}" class="btn btn-deny">${t.deny}</a>
                          </div>
                      </div>
                      <div class="footer">
                          <p>Internal System Notification</p>
                      </div>
                  </div>
              </td>
          </tr>
      </table>
  </body>
  </html>
      `;
  };