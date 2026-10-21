# Clean Sweep City

🧾 Project Title

Smart Waste Management System with Pickup Reminder and Real-Time Citizen Reporting using Role-Based Backend

❗ Problem Statement (Detailed)

Urban areas face serious waste management challenges due to:

Irregular or missed garbage collection

Lack of awareness about pickup schedules

No proper system for citizens to report issues

Delay in resolving complaints due to missing location details

Citizens cannot easily report waste problems with proof and exact location, while authorities lack a centralized system to track and manage complaints efficiently.

💡 Proposed Solution (Complete Explanation)

We propose a web-based smart waste management system that integrates:

✅ Pickup Reminder System

✅ Real-Time Citizen Reporting (Image + GPS Location)

✅ Role-Based Backend (User, Worker, Admin)

The system ensures:

Timely waste disposal

Accurate issue reporting

Fast resolution of complaints

🧠 System Architecture

🔹 1. Frontend

Built using:

HTML

CSS

JavaScript

Provides user interface for:

Login/Register

Reporting issues

Viewing status

🔹 2. Backend (Core Logic)

Built using:

Python (Flask / Django)

Handles:

Authentication (login system)

Data processing

Notifications

Role management

🔹 3. Database

Stores:

Users

Workers

Complaints

Pickup schedules

🔹 4. External Services

GPS API → for location detection 📍

Email/SMS API → for notifications 🔔

👤👷🖥️ Modules in Detail

👤 1. User Module (Citizen)

🔹 Features:

Register & Login

Enter location (area-based)

Receive pickup reminders 🔔

Report issues with:

📸 Image upload

📍 Auto GPS location

View complaint status

🔹 Workflow:

User logs in

Receives reminder before pickup

If issue occurs:

Uploads image

Location auto captured

Tracks status

👷 2. Worker Module (Garbage Collector)

🔹 Features:

Login

View assigned tasks

Navigate using location

Collect garbage 🚛

Update status:

Pending → Completed

Upload proof image (optional)

🔹 Workflow:

Worker logs in

Views assigned complaints

Goes to location

Resolves issue

Updates status

🖥️ 3. Admin Module (Authority)

🔹 Features:

Manage users & workers

View all complaints dashboard 📊

See:

Image proof

GPS location

Assign tasks to workers

Monitor progress

🔹 Workflow:

Admin logs in

Views complaints

Assigns worker

Tracks resolution

📸 Real-Time Reporting System (Core Innovation)

🔹 Step-by-Step:

User clicks Report Issue

Opens camera → captures image

System fetches:

Latitude

Longitude

User adds description

Data sent to backend

Stored in database

Admin sees issue instantly

🔔 Pickup Reminder System

🔹 How it works:

Admin sets area-wise schedule

Backend triggers reminders

User receives:

SMS / Email notification

👉 Example:

“Garbage collection at 8 AM tomorrow.”

🔄 Complete System Workflow

User registers

Backend stores user data

Reminder sent before pickup

Worker collects garbage

Worker updates status

User receives confirmation

👉 If problem: 7. User reports issue (image + GPS)

8. Admin assigns worker

9. Worker resolves issue

10. Status updated → user notified

🗄️ Database Design (Detailed)

📌 Users Table

id

name

email

password

location

📌 Workers Table

id

name

assigned_area

📌 Complaints Table

id

user_id

image_path

description

latitude

longitude

status (Pending/In Progress/Resolved)

timestamp

📌 Pickup Schedule Table

id

area

time

date

🔐 Security Features

Login authentication

Password encryption

Role-based access control

🎯 Key Features Summary

🔔 Pickup reminders

📸 Real-time image reporting

📍 GPS location tracking

👤👷🖥️ Role-based system

✅ Status updates

📊 Admin dashboard

🏙️ Expected Results

Cleaner environment

Faster complaint resolution

Better coordination

Smart city improvement . From above prompt making attractive and interactive website

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://city-sparkle-crew.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/bafcaf45-6b7a-415c-8b7b-c94b07b4a0dd).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
