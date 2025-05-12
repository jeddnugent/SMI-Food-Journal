# **SMI-Food-Journal**

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
  - Axios (for API requests)
  - CSS (for styling)
  
- [**Backend**](https://github.com/jeddnugent/SMI-Food-Journal/tree/main/server):
  - Express.js (Node.js framework)
  - PostgreSQL (relational database)
	- [Schema found here](https://github.com/jeddnugent/SMI-Food-Journal/tree/main/server/sql)
  - `pg` (node-postgres for connecting to and interacting with PostgreSQL)

- **Tools**:
  - Nodemon (for auto-restarting the backend during development)
  - Postman (for API testing)

---