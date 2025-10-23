# GeoNova

For running this app run command :-

       git clone https://github.com/Neeraj-nehra/GeoNova.git

after run:-
        
        npm install        
or  
       
       npm install --legacy-peer-deps

after that run this command :-

       npm run dev


# GeoNova Landslide Guardian - Detailed Report

## 1. Project Overview

**GeoNova Landslide Guardian** is a comprehensive web application designed to monitor, predict, and mitigate landslide risks, with an initial focus on the vulnerable Uttarakhand region of India. By leveraging real-time satellite data, machine learning, and community-reported observations, the platform provides critical information to residents, government agencies, and researchers.

The core mission is to safeguard communities by providing an accessible, data-driven early warning system, ultimately saving lives and minimizing property damage.

---

## 2. Technical Architecture & Stack

The application is built on a modern, robust, and scalable technology stack:

- **Frontend Framework**: [Next.js](https://nextjs.org/) (with React) using the App Router for server-centric rendering and performance.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for a utility-first styling workflow.
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/) for a set of accessible, reusable, and beautifully designed components.
- **Backend & Database**: [Firebase](https://firebase.google.com/) is used for:
  - **Authentication**: Secure user login (Email/Password) with session management ("Remember Me") and password recovery.
  - **Firestore**: A NoSQL database for storing all application data, including user reports, alerts, and zones.
  - **Cloud Storage**: For storing user-uploaded files like profile avatars and photos in landslide reports.
- **Generative AI**: [Google's Genkit](https://firebase.google.com/docs/genkit) is used to power the application's AI features, including risk assessment and news generation.
- **Mapping**: [Leaflet](https://leafletjs.com/) and [React-Leaflet](https://react-leaflet.js.org/) for displaying the interactive map.
- **Charts**: [Recharts](https://recharts.org/) for data visualization on the dashboard.
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for robust and type-safe form validation.
- **Language**: [TypeScript](https://www.typescriptlang.org/) for end-to-end type safety.

---

## 3. Core Features

### 3.1. User Authentication
- **Secure Sign-in/Sign-up**: Users can create an account and log in using their email and password.
- **Password Recovery**: A "Forgot Password" flow allows users to securely reset their password via an email link.
- **Session Persistence**: The "Remember Me" feature allows users to stay logged in across browser sessions for convenience.

### 3.2. Dashboard Overview
The central hub of the application, providing an at-a-glance summary of the landslide situation.
- **System Status Alert**: Confirms that all monitoring systems are active.
- **Key Statistics Cards**: Displays vital metrics:
  - **High-Risk Zones**: Count of zones currently classified as high risk.
  - **Alerts Sent (24h)**: Number of alerts issued in the last 24 hours.
  - **NDVI Trend**: Vegetation index, a key indicator of soil stability.
  - **Monitored Areas**: Total count of distinct areas under observation.
- **Data Visualization**:
  - **NDVI Trend Chart**: A 6-month line graph showing vegetation health over time.
  - **Recent Rainfall Chart**: A line graph of daily precipitation for the last week.
  - **Slope Distribution Chart**: A bar chart showing the area distribution by slope angle.
- **Recent Alerts Table**: A live-updating table of the most recent alerts, color-coded by risk level.

### 3.3. Interactive Susceptibility Map
- **Dynamic Map Interface**: Users can explore the Uttarakhand region on an interactive map.
- **AI-Powered Risk Assessment**: Clicking any point on the map triggers a Genkit flow (`assessMapRisk`) that provides an instant, AI-generated landslide risk percentage and a brief analysis for that specific location.
- **Filtering & Navigation**: Users can filter by district and choose between default and satellite map views.

### 3.4. Landslide Report Submission
- **Community-Sourced Data**: Enables users to contribute to the system by reporting observed landslide events.
- **Geolocation**: Users can automatically capture their current GPS coordinates or enter them manually.
- **Detailed Form**: Includes fields for a description, severity level (Low, Medium, High), and an optional photo upload.
- **Firebase Integration**: Submitted reports are stored in the `landslidePoints` collection in Firestore, with photos uploaded to Cloud Storage.

### 3.5. Real-time Risk Assessment
- **AI-Powered Analysis**: The `assessLandslideRisk` Genkit flow provides a detailed risk assessment for any given coordinates.
- **Comprehensive Report**: The output includes a risk level (Low, Medium, High), a detailed description of contributing factors (NDVI, rainfall, history), and actionable safety recommendations.

### 3.6. Landslide News Feed
- **AI-Generated Content**: The `getLandslideNews` Genkit flow generates realistic, fictional news articles about landslide activity in the region to simulate a live news feed.
- **Rich Content**: Each article includes a headline, summary, full body text, source, published date, and a placeholder image.

### 3.7. Data Explorer
- **Live Database View**: Provides a read-only view of the raw data from key Firestore collections (`alerts`, `landslidePoints`, `zones`).
- **Transparency**: Allows technical users or admins to inspect the live data flowing into the system.

### 3.8. Settings & Profile Management
- **User Profile**: Users can update their display name and profile picture. Avatars are uploaded to Cloud Storage.
- **Data Export**: Users can download their submitted reports as a CSV file and a history of all system warnings as a JSON file.

---

## 4. Project Structure

The project follows a standard Next.js App Router structure. Key directories include:

- **`src/app/`**: Contains all pages and layouts of the application.
  - **`src/app/dashboard/`**: A route group for all pages that require user authentication.
  - **`src/app/api/`**: Not used; server-side logic is handled by Next.js Server Actions and Genkit flows.
- **`src/components/`**: Reusable React components.
  - **`src/components/ui/`**: Core UI components from ShadCN.
  - **`src/components/auth/`**, **`src/components/dashboard/`**: Feature-specific components.
- **`src/firebase/`**: Contains all Firebase configuration and custom hooks (`useUser`, `useCollection`, etc.) for interacting with Firebase services.
- **`src/ai/`**: Home for all Genkit-related code.
  - **`src/ai/flows/`**: Contains all the defined Genkit flows that power the AI features.
- **`src/lib/`**: Utility functions, static data, and type definitions.
- **`docs/`**: Contains the `backend.json` file, which serves as a blueprint for the app's data models and Firestore structure.

---

## 5. How to Run Locally

To set up and run this project on your local machine, follow these steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- `npm` (comes with Node.js)

### Setup Instructions

1.  **Clone or Download the Repository:**
    Get the project code onto your local machine.

2.  **Navigate to Project Directory:**
    Open your terminal or command prompt and change into the project's root folder.
    ```bash
    cd path/to/your/project
    ```

3.  **Install Dependencies:**
    Run `npm install` to download all the required packages from `package.json`.
    ```bash
    npm install
    ```

4.  **Set Up Environment Variables:**
    Your app needs to connect to your Firebase project.

    a. Create a new file named `.env.local` in the root of your project.

    b. Add the following content to it:
    ```
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    ```

    c. Find your Firebase configuration keys in the [Firebase Console](https://console.firebase.google.com/) under **Project settings > General > Your apps > Firebase SDK snippet > Config**.

    d. Copy the values and paste them into your `.env.local` file.

5.  **Run the Development Server:**
    Start the Next.js development server.
    ```bash
    npm run dev
    ```

6.  **Open the Application:**
    Open your web browser and navigate to **[http://localhost:9002](http://localhost:9002)**. You should see the application's landing page.
