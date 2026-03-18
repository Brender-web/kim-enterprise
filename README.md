# KIM Enterprise E-Commerce System
### Global Multi-Vendor Marketplace | React | Node.js | MongoDB | Next.js

KIM Enterprise is a high-performance, scalable e-commerce platform designed to connect buyers and sellers across Kenya and the globe. Built with a "Premium-First" design philosophy, it supports secure multi-vendor management, real-time order tracking, and local/international payment integrations.

---

## 🌟 Key Features

-   **Multi-Vendor Architecture**: Specialized roles for Customers, Sellers, and Admins.
-   **Secure Authentication**: NextAuth.js integration with JWT and bcrypt password encryption.
-   **International Payments**: Integrated support for M-Pesa (local) and PayPal (global).
-   **Dynamic Shopping Experience**: Framer Motion animations, glassmorphism UI, and real-time cart updates.
-   **Product Management**: Comprehensive system for inventory, categories, and ratings.

---

## 🚀 Getting Started

### 1. Prerequisites
-   **Node.js**: v18.x or higher
-   **MongoDB**: A running MongoDB instance (Local or Atlas)
-   **npm**: v9.x or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Brender-web/kim-enterprise.git
cd kim-enterprise
npm install
```

### 3. Setting Up MongoDB (Crucial Step)

KIM Enterprise uses MongoDB for its flexible schema and scalability. 

**Option A: MongoDB Atlas (Recommended for Production)**
1.  Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2.  Deploy a free Shared Cluster.
3.  In "Network Access," whitelist your IP address.
4.  In "Database Access," create a user with read/write permissions.
5.  Click "Connect" -> "Drivers" -> Copy the connection string.

**Option B: Local MongoDB**
1.  Install MongoDB Community Edition on your machine.
2.  Start the `mongod` service.
3.  Your default connection string will likely be: `mongodb://localhost:27017/kim_enterprise`

**Option C: Docker (Fastest Setup)**
If you have Docker installed, you can spin up a MongoDB instance instantly:
1.  Run the following command in the root directory:
    ```bash
    docker-compose up -d
    ```
2.  This will create a persistent MongoDB container running on port `27017`.
3.  Your connection string will be: `mongodb://localhost:27017/kim_enterprise`

### 4. Environment Configuration
Create a `.env` file in the root directory and add your credentials (use `.env.example` as a template):

```env
# Database (IMPORTANT: Must be a MongoDB string)
# For Docker/Local: "mongodb://localhost:27017/kim_enterprise"
# For Atlas: "mongodb+srv://<user>:<password>@cluster.mongodb.net/kim_enterprise?retryWrites=true&w=majority"
DATABASE_URL="mongodb://localhost:27017/kim_enterprise"

# Next Auth
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"

# M-Pesa (Safaricom Daraja API)
MPESA_CONSUMER_KEY=""
MPESA_CONSUMER_SECRET=""
MPESA_SHORTCODE=""
MPESA_PASSKEY=""
MPESA_ENV="sandbox"
```

### 5. Finalizing Database Setup
After configuring your `DATABASE_URL`, run the following commands to sync the schema and generate the client:

```bash
# Push the schema to MongoDB
npx prisma db push

# Generate the Prisma Client
npx prisma generate
```

### 6. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🛠 Technology Stack
-   **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS 4
-   **Backend**: Next.js API Routes, Node.js
-   **Database**: MongoDB via Prisma ORM
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Validation**: Zod

---

## 📝 Git Best Practices
We follow the **Conventional Commits** specification:
-   `feat`: A new feature
-   `fix`: A bug fix
-   `docs`: Documentation only changes
-   `refactor`: A code change that neither fixes a bug nor adds a feature
-   `chore`: Updating build tasks, package manager configs, etc.

---

## 📈 Roadmap
- [ ] PayPal REST SDK Implementation
- [ ] AWS S3 Product Image Hosting
- [ ] Real-time Chat between Seller and Buyer
- [ ] AI-powered Product Recommendations

Designed & Developed by the KIM Enterprise Team.
