# **App Name**: GeoNova Landslide Guardian

## Core Features:

- User Authentication: Secure login system with email/password authentication and demo credentials.
- Dashboard Overview: Display system status, key statistics (High-Risk Zones, Alerts Sent, NDVI Trend, Monitored Areas), charts (NDVI Trend, Recent Rainfall, Slope Distribution), and a list of recent alerts.
- Interactive Susceptibility Map: Visualize landslide susceptibility risk levels on an interactive map with filtering and download options for Uttarakhand region.
- Landslide Report Submission: Enable users to submit new landslide observations with file uploads, location picker, description, and severity selection. Location data will be retrieved from the Geonova service account associated with your Google Earth Engine account to make use of the live location.
- Early Warning System: Display active and historical warnings, and provide an interface for admins to create new warnings and manage notification settings.
- Real-time Landslide Risk Prediction: Uses the GEE Code that the user has written for analyzing the live landslide risks from current locations, which incorporates NDVI Trend, Recent Rainfall, Historical Alerts, and risk from given location, based on machine learning and real-time satellite data and serves it as a tool within the app.
- Settings and Profile Management: Allow users to manage their profiles, system preferences, and notification settings; include data export options.

## Style Guidelines:

- Primary color: Emerald (#10b981) to Teal (#14b8a6) gradient for a vibrant, natural feel.
- Background color: Light gray (#f9fafb) for a clean and unobtrusive backdrop.
- Accent color: Blue (#3b82f6) for interactive elements and important alerts, providing a sense of trust and stability.
- Headings: 'Space Grotesk' (sans-serif) for a techy and scientific feel, making information clear and modern.
- Body: 'Inter' (sans-serif) for readability and a neutral tone.
- Lucide React icons will be used. The icons should be clear, modern, and intuitive, aiding in quick recognition of features and alerts.
- Subtle animations such as slide-in page loads, hover effects on stat cards, and animated chart rendering to enhance user experience without being distracting.