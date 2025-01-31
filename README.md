# SurveySalud

**SurveySalud** is a platform where NGOs, health workers, and community leaders can conduct and manage maternal and child health surveys tailored to their community's needs. It helps users collect, monitor, and analyze data on antenatal care, postnatal follow-ups, child vaccinations, and nutrition—all centrally managed in a single, dynamic system.

## Live Demo

Visit the live SurveySalud app on Vercel:  
[**SurveySalud on Vercel**](https://surveysalud.vercel.app/)


>No local setup is required to explore SurveySalud. Simply open the link above, sign up or log in, and start reviewing the available surveys and their data!

## Technology Stack

### Frontend

- Next.js + React (App Router)
- Tailwind CSS 
- Authentication (JWT-Based) 

### Backend

- Node.js + Express 
- PostgreSQL 
- PostgreSQL via Supabase (in production) 

---

## How It Works

### User Interface & Flow

1. **Signup & Login**  
   - Users create an account or log in to access surveys and view the data dashboard.  
   - On login, the backend issues a JWT if credentials are valid.

2. **Pre-Configured Surveys**  
   - SurveySalud provides pre-built maternal and child health surveys. Clients can collaborate with the SurveySalud team to adjust these surveys—no custom survey creation is available directly in the UI at this time.

3. **Data Dashboard**  
   - A user-friendly dashboard shows key metrics, charts, and statistics gathered from the survey responses, enabling better tracking and decision-making.

4. **Analytics & Reporting**  
   - Users can analyze trends and insights, and potentially export data or reports.

---

### Potential Enhancements

SurveySalud is currently a **Minimal Viable Product (MVP)**, potential features to enhance the app experience include:

1. **Fully Customizable Survey Builder**  
   Allow authorized users to create or heavily edit surveys directly via the UI.

2. **Notifications & Follow-ups**  
   Automated email or SMS reminders to participants or health workers.

3. **Advanced Analytics**  
   Enhanced reporting tools, possibly integrating with third-party analytics.

4. **Offline Data Entry**  
   Enable users to fill out surveys even without an internet connection; data would sync automatically once the user is back online.

5. **Export & Reporting Options**  
   Provide the ability to download or export survey results in various formats (e.g., CSV, PDF, Excel) for easier sharing and record-keeping.
   
---

## Data Disclaimer

SurveySalud primarily serves as a digital platform for data collection and analysis. All surveys currently included are designed for demonstration purposes. They are not guaranteed to be comprehensive clinical tools. 

---

## Contributing

Interested in contributing new features or fixes? We welcome pull requests!

1. **Fork this repository** to your own GitHub account.  
2. **Create a new branch**: `git checkout -b feature/my-improvement`.  
3. **Commit your changes**: `git commit -m "Add some improvement"`.  
4. **Push to the branch**: `git push origin feature/my-improvement`.  
5. **Open a Pull Request** describing your changes, and we’ll review it ASAP.

---

Thank you for your interest in **SurveySalud**! Together, we can help organizations and communities gather crucial maternal and child health data more effectively.