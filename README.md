# Counterfeit Product Detection System

A system to detect counterfeit products using one-time QR codes.

## Key Features

- **One-time Use QR Codes**: Each QR code can only be used once to verify a product
- **Admin Dashboard**: For organizations to generate and manage QR codes
- **Mobile App**: For consumers to scan and verify product authenticity 
- **Regional Data Collection**: Helps organizations understand where their products are being sold
- **Secure Verification**: Prevents counterfeiting through a centralized database system

## System Architecture

The system consists of three main components:

1. **Backend Server**: Node.js + Express API with MongoDB database
2. **Mobile App**: React Native app for consumers to scan QR codes
3. **Admin Dashboard**: React web application for organizations to generate and manage QR codes

## Project Structure

The project is organized as a monorepo with three main directories:

```
counterfeit-detection-system/
├── backend/               # Express.js backend server
│   ├── controllers/       # Request handlers
│   ├── models/            # Database models 
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── .env               # Environment variables
│   ├── package.json       # Backend dependencies
│   └── server.js          # Server entry point
├── frontend/              # React Native mobile app
│   ├── assets/            # Images and resources
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   ├── services/          # API services
│   ├── App.js             # Main app component
│   └── package.json       # Frontend dependencies
├── admin-dashboard/       # React.js admin dashboard
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # Reusable components
│       ├── pages/         # Dashboard pages
│       └── services/      # API services
└── package.json           # Root package for workspaces
```

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- npm or yarn
- Expo CLI (for mobile app development)

### Installation

1. Clone the repository
```
git clone https://github.com/krishna-nishant/counterfeit-detection-system.git
cd counterfeit-detection-system
```

2. Install all dependencies
```
npm run install:all
```

### Running the System

1. Start the backend server
```
npm run dev:backend
```

2. Start the mobile app (in a new terminal)
```
npm run start:frontend
```

3. Start the admin dashboard (in a new terminal)
```
npm run start:admin
```

## How It Works

### For Organizations (Admin)

1. Log in to the admin dashboard
2. Generate QR codes by specifying the number of codes and product information
3. Download the generated QR codes as images
4. Apply these QR codes to product packaging with a scratch label covering them

### For Consumers

1. Install the mobile app
2. When purchasing a product, check if the QR code's scratch label is intact
3. Remove the scratch label and scan the QR code with the app
4. Get instant verification if the product is genuine or counterfeit

## Security Features

- Each QR code contains a unique ID and key
- QR codes can only be verified once, preventing reuse
- Location data is collected to detect unusual verification patterns
- Scratch labels prevent scanning before purchase

