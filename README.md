# InvoiceBilly - Invoice Generator Quick & Easy Invoicing Web App

Create, preview, export, and send professional invoices effortlessly with this full-stack Invoice Generator web application! Perfect for freelancers, small businesses, and developers looking to streamline invoicing.


## Features

- Create & manage invoices with client & item details
-  Choose from multiple beautiful invoice templates
-  Live invoice preview before saving or sending
-  Export invoices as PDF using jsPDF + html2canvas
-  Send invoices directly via email (SMTP Brevo)
-  Upload logos and images with Cloudinary integration
-  Secure login/signup via Clerk Authentication
-  Save, edit, reuse, and delete invoices (MongoDB backend)
-  Responsive UI with React & Bootstrap 5


##  Tech Stack

| Layer      | Technology                                        |
|------------|-------------------------------------------------|
| Frontend   | React.js, Bootstrap, jsPDF, html2canvas, Clerk  |
| Backend    | Spring Boot, Spring Framework                     |
| Database   | MongoDB                                          |
| Storage    | Cloudinary                                       |
| Email      | SMTP Relay (Brevo)                               |


##  Quick Setup

### 1. Backend (Spring Boot)

Configure your environment variables securely:

```

spring.application.name=Invoicebilly
spring.data.mongodb.uri=\${MONGO_URL}

spring.mail.host=smtp-relay.brevo.com
spring.mail.port=587
spring.mail.username=${BREVO_USERNAME}
spring.mail.password=${BREVO_PASSWORD}
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.protocol=smtp
spring.mail.properties.mail.smtp.from=\${MAIL_ID}

clerk.issuer=${CLERK_FRONTEND}
clerk.jwks.url=${CLERK_JWKS}
clerk.webhook.key=\${CLERK_WEBHOOK}

```

Run the backend:

```

./mvnw spring-boot:run

```


### 2. Frontend (React + Vite)

Create a `.env` file with:

```

VITE_BASE_URL='http://localhost:8080/api'
VITE_UPLOAD_PRESET='your_cloudinary_preset_name'
VITE_CLOUD_NAME='your_cloudinary_cloud_name'
VITE_CLERK_PUBLISHABLE_KEY='your_clerk_public_key'

```

Install dependencies and start:

```

npm install
npm run dev

```


##  Usage Flow

1. Open landing page & signup/login 
2. Create invoices with custom details 
3. Choose a template & preview live 
4. Export PDF or email invoices directly 
5. Manage saved invoices anytime 

##  Pro Tips

- Use ngrok for local backend public URLs if needed
- Keep all sensitive keys in environment variables
- Customize invoice templates easily under `/src/templates`


> Made to gear up.
