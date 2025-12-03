# SERVOTEL Landing Page

A modern, high-performance landing page for **SERVOTEL Haiti**, built with **React 19**, **Vite**, **Tailwind CSS**, and **Framer Motion**.  
This project delivers a luxury design aesthetic, dark mode support, a multi-language interface, and a responsive layout suitable for business and leisure travelers. The backend is powered by Node.js and Express, using Resend for email notifications.

---

## 🚀 Project Overview

-   **Framework**: React 19 + Vite
-   **Backend**: Node.js + Express
-   **Styling**: Tailwind CSS (utility-first, responsive design)
-   **Animations**: Framer Motion
-   **Email Service**: Resend
-   **Icons**: Lucide React

---

## 📋 Requirements

-   **Node.js** ≥ 18 (latest LTS recommended)
-   **npm** ≥ 9 (or yarn/pnpm)

---

## 🛠️ Local Development Setup

### 1. Clone the repository
```bash
git clone https://github.com/josephschneiderzsx-maker/servotel-landing-page.git
cd servotel-landing-page
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root of the project and add your development variables. You can use `.env.example` as a template. At a minimum, you'll need your `RESEND_API_KEY`.

### 4. Run the development server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`.

---

## 🚢 Deployment Guide

This guide covers deploying the application on a Linux server (e.g., Ubuntu) with Nginx as a reverse proxy.

### Step 1: Build the Frontend
On your local machine or build server, create the production-ready frontend files:
```bash
npm run build
```
This command generates a `dist` directory containing the optimized static assets.

### Step 2: Prepare the Production Server
1.  **Create a deployment directory** on your server:
    ```bash
    ssh your_user@your_server
    sudo mkdir -p /var/www/servotel
    sudo chown -R $USER:$USER /var/www/servotel
    ```

2.  **Upload your project files** to the server. You need to upload:
    -   The contents of the `dist` directory.
    -   `server.js`
    -   `package.json`
    -   `package-lock.json`
    -   The `components` directory (for email templates).

    After uploading, your `/var/www/servotel` directory should look like this:
    ```
    /var/www/servotel/
    ├── assets/         # From the 'dist' folder
    ├── components/     # For email templates
    ├── index.html      # From the 'dist' folder
    ├── package.json
    ├── package-lock.json
    └── server.js
    ```

### Step 3: Configure the Production Environment
1.  **Install Production Dependencies:**
    Navigate to your deployment directory and install only the necessary packages for the server to run.
    ```bash
    cd /var/www/servotel
    npm install --production
    ```

2.  **Create the Environment File:**
    Create a `.env` file in `/var/www/servotel` and add your production credentials.
    ```bash
    nano .env
    ```
    Paste the following content, replacing the placeholder values:
    ```dotenv
    # The port the Node.js server will run on.
    PORT=3001

    # Your Resend API key for sending emails.
    RESEND_API_KEY="your_production_resend_api_key"

    # The full public URL of your application.
    API_BASE_URL="https://servotel.itxpress.net"

    # The email address that will receive booking notifications.
    HOTEL_EMAIL="your_hotel_email@example.com"

    # The "From" address for emails sent to customers.
    FROM_EMAIL="Servotel <no-reply@yourdomain.com>"

    # The origin (frontend URL) that is allowed to make requests to the API.
    ALLOWED_ORIGIN="https://servotel.itxpress.net"
    ```

### Step 4: Run the Server with a Process Manager
Using a process manager like **PM2** is highly recommended to keep your application running continuously and enable production mode correctly.

1.  **Install PM2 globally:**
    ```bash
    sudo npm install -g pm2
    ```

2.  **Start your server for the first time:**
    Navigate to your deployment directory. Run the `start` command with the `NODE_ENV=production` flag. This is crucial to enable all security features.
    ```bash
    cd /var/www/servotel
    NODE_ENV=production pm2 start server.js --name servotel-app
    ```

3.  **Save the process list and enable startup on reboot:**
    ```bash
    pm2 save
    pm2 startup
    ```
    (Follow the on-screen instructions provided by the `startup` command).

4.  **For future updates:**
    After updating your files, use the `restart` command. The `--update-env` flag ensures that any changes to `NODE_ENV` are applied.
    ```bash
    NODE_ENV=production pm2 restart servotel-app --update-env
    ```

### Step 5: Configure Nginx as a Reverse Proxy
Create an Nginx configuration file to serve your frontend and forward API requests to your Node.js server.

1.  **Create the Nginx config file:**
    ```bash
    sudo nano /etc/nginx/sites-available/servotel.conf
    ```

2.  **Paste the following configuration:**
    *Note: The `proxy_set_header` directives are essential for passing the correct client information to your backend. This works with the `app.set('trust proxy', 1);` setting in `server.js`, allowing security features like rate limiting to function correctly.*
    ```nginx
    server {
        server_name servotel.itxpress.net;

        # Main entry point for your application
        root /var/www/servotel;
        index index.html;

        # Serve static assets directly
        location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|svg|woff2?|eot|ttf|otf)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }

        # Handle SPA routing (React Router)
        location / {
            try_files $uri /index.html;
        }

        # Forward API requests to the Node.js server
        location /api/ {
            proxy_pass http://localhost:3001; # Matches the PORT in your .env
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
        }

        # SSL Configuration (assuming you use Certbot)
        listen [::]:443 ssl ipv6only=on;
        listen 443 ssl;
        ssl_certificate /etc/letsencrypt/live/servotel.itxpress.net/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/servotel.itxpress.net/privkey.pem;
        include /etc/letsencrypt/options-ssl-nginx.conf;
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;
    }

    server {
        if ($host = servotel.itxpress.net) {
            return 301 https://$host$request_uri;
        }

        listen 80;
        listen [::]:80;
        server_name servotel.itxpress.net;
        return 404; # Managed by Certbot for http-01 challenge
    }
    ```

3.  **Enable the site and restart Nginx:**
    ```bash
    sudo ln -s /etc/nginx/sites-available/servotel.conf /etc/nginx/sites-enabled/
    sudo nginx -t # Test for syntax errors
    sudo systemctl restart nginx
    ```

Your site is now deployed and live!

---

## 📜 License
MIT © 2025 Servotel Landing Page Project