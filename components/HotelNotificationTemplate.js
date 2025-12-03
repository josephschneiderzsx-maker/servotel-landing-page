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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
      <style>
          body { margin: 0; padding: 0; font-family: 'Inter', sans-serif; background-color: #111827; color: #e5e7eb; }
          .container { max-width: 600px; margin: 0 auto; background-color: #1f2937; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
          .header { background-color: #167347; padding: 30px 20px; text-align: center; }
          .logo { height: 50px; width: auto; filter: brightness(0) invert(1); }
          .content { padding: 40px 30px; }
          .h1 { font-family: 'Playfair Display', serif; color: #ffffff; font-size: 24px; margin-top: 0; margin-bottom: 10px; text-align: center; }
          .subtitle { color: #d1d5db; text-align: center; margin-bottom: 30px; font-size: 14px; opacity: 0.8; }
          .data-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: rgba(255,255,255,0.03); border-radius: 8px; overflow: hidden; }
          .data-row td { padding: 15px; border-bottom: 1px solid rgba(255,255,255,0.05); color: #d1d5db; font-size: 14px; }
          .data-row:last-child td { border-bottom: none; }
          .data-label { font-weight: 600; color: #f59e0b; width: 40%; }
          .data-value { color: #ffffff; font-weight: 500; }
          .actions { text-align: center; margin-top: 30px; }
          .btn { display: inline-block; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 14px; margin: 5px; transition: all 0.2s; }
          .btn-confirm { background-color: #167347; color: white; border: 1px solid #167347; }
          .btn-deny { background-color: transparent; color: #ef4444; border: 1px solid #ef4444; }
          .btn-deny:hover { background-color: rgba(239, 68, 68, 0.1); }
          .footer { background-color: #111827; padding: 20px; text-align: center; font-size: 11px; color: #4b5563; border-top: 1px solid rgba(255,255,255,0.05); }
      </style>
  </head>
  <body>
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color: #111827; padding: 40px 0;">
          <tr>
              <td align="center">
                  <div class="container">
                      <div class="header">
                          <img src="/public/assets/images/servotel-logo.png" alt="Servotel" class="logo" />
                          <h1 class="h1" style="margin-top: 15px;">${t.title}</h1>
                          <p class="subtitle" style="margin: 0;">${t.subtitle}</p>
                      </div>
                      <div class="content">
                          <table class="data-table">
                              <tr class="data-row">
                                  <td class="data-label">${t.name}</td>
                                  <td class="data-value">${fullName}</td>
                              </tr>
                              <tr class="data-row">
                                  <td class="data-label">${t.emailLabel}</td>
                                  <td class="data-value"><a href="mailto:${email}" style="color: #ffffff; text-decoration: none;">${email}</a></td>
                              </tr>
                              <tr class="data-row">
                                  <td class="data-label">${t.room}</td>
                                  <td class="data-value" style="color: #f59e0b;">${roomType}</td>
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
                              <p style="margin-bottom: 15px; color: #9ca3af; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">${t.action}</p>
                              <a href="${confirmUrl}" class="btn btn-confirm">${t.confirm}</a>
                              <a href="${denyUrl}" class="btn btn-deny">${t.deny}</a>
                          </div>
                      </div>
                      <div class="footer">
                          <p>Internal System Notification • Servotel Booking Engine</p>
                      </div>
                  </div>
              </td>
          </tr>
      </table>
  </body>
  </html>
      `;
  };