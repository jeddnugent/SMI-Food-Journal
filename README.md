# **SMI Food Journal**

SMI Food Journal is a full stack project created for [Successful Minds Institute](https://successfulminds.com.au). 
The purpose of the journal is to allow clients of SMI to track each meal they eat over the course of a week where they will
answer a series of prompts regarding their mood and the enviroment around the meal which then will be accessed by practitioners on a subsequent consultation.
The information gained by these surveys will then help inform futher advice and treatment as this program will aid the first step for weight loss clients.
This information allows practitioners to best help their journies through hypnotic laparoscopic banding.

---

### **Features**
- CRUD operations on journal entries (create, read, update, delete)
- Responsive and modern UI built with React (TypeScript)
- Backend API built with Express.js
- Data stored in PostgreSQL
- Use of `axios` for API communication between the frontend and backend
- Real-time validation and feedback

---

### **Tech Stack**

- [**Frontend**](https://github.com/jeddnugent/SMI-Food-Journal/tree/main/client):
  - React (with TypeScript)
  - React-Router (Client side page routing)
  - Vite (Dev tooling)
  - Axios (for API requests)
  - Material UI and TailwindCSS (Styling Frameworks and some pre-built elements)
  - CSS (general styling)
  
- [**Backend**](https://github.com/jeddnugent/SMI-Food-Journal/tree/main/server):
  - Express.js (Node.js framework)
  - Passport.js (For Authentication Stratergy)
  - bcrypt (For Password Hashing and Salting)
  - PostgreSQL (relational database)
	- [Schema found here](https://github.com/jeddnugent/SMI-Food-Journal/tree/main/server/sql)
  - `pg` (node-postgres for connecting to and interacting with PostgreSQL)

- **Tools**:
  - Postman (for API testing)

---

### **How to run solution locally**
If you want to fully explore the functionality of this solution you can by following these steps:
- Clone this repo
- run `npm i` to install all the neccasary packages in both `/client` and `/server` folders
- set up your postgres database through the sql schema and populate it with the provided SQL test data
- create .env for client side secrets which needs to store the server API
- then create a .env file or replace the db configuration in the server.ts file in the `/server` folder
- after this you are all set up to run the solution with `npm run dev` for the server side which is designed to locally deploy to port 4000
- and use `npm run dev` for the client side which is designed to be locally deployed on port 3000
