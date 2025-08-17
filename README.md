# Greenalytics – Cloud-Native Environmental Dashboard

Greenalytics is a real-time, cloud-native environmental dashboard that visualizes and tracks sustainability metrics such as carbon emissions, waste output, and energy consumption. Built to support eco-conscious initiatives, this project is designed with AWS cloud services, GitHub Actions CI/CD, Infrastructure as Code, and modern frontend/backend frameworks.

---

## 🚀 Purpose

The goal of Greenalytics is to:

- Educate users and organizations about their environmental impact
- Provide actionable insights into emissions, energy usage, and sustainability trends
- Demonstrate DevOps practices, Infrastructure as Code, and AI integration for cloud-native deployment

---

## ⚡ Tech Stack

### Cloud & Infrastructure

- **AWS S3** – Static site hosting
- **AWS CloudFront** – CDN with HTTPS via ACM
- **AWS IAM** – Permissions and access control
- **GitHub Actions** – CI/CD automation for frontend deployment
- **Terraform / AWS CDK** – Infrastructure as Code

### Frontend

- **React** + **Vite** + **Chakra UI**
- Real-time visualization (static/mock data for now)
- Hosted on S3 via automated pipeline

### Backend _(Planned)_

- Node.js / Express API
- MongoDB / DynamoDB for metrics storage
- Future integration with real environmental APIs (e.g. AirNow, OpenAQ)

### DevOps Practices

- CI/CD pipelines with GitHub Actions
- Linting, build, and deploy automation
- Version-controlled infrastructure with Terraform/CDK
- SSL/TLS setup via AWS ACM

### AI Integration _(Planned)_

- **AI-powered environmental insights generator**
  - Pipeline: data ingestion → AI model (AWS SageMaker / OpenAI API) → dashboard summaries & recommendations
  - Demonstrates deploying and integrating AI workloads into cloud infrastructure

---

## 📅 Project Timeline

| Phase   | Focus                            | Status         |
| ------- | -------------------------------- | -------------- |
| Phase 1 | Frontend setup + static hosting  | ✅ Complete    |
| Phase 2 | Real-time data integration + API | ⏳ In Progress |
| Phase 3 | Terraform IaC automation         | ⏳ Planned     |
| Phase 4 | AI-powered insights integration  | ⏳ Planned     |

---

## 📊 Sample Metrics

- Carbon Emissions by category (travel, food, home)
- Weekly/Monthly waste output trends
- Energy usage heatmaps
- AI-generated optimization suggestions

---

## 🎓 Learning Goals

- Strengthen AWS experience (S3, IAM, CloudFront, Lambda)
- Improve DevOps proficiency (CI/CD, GitOps, logging)
- Apply Infrastructure as Code (Terraform/CDK)
- Integrate AI into cloud-native workloads
- Build scalable, production-ready dashboards

---

## 🏢 Future Roadmap

- [ ] Integrate real APIs (NASA, AirNow)
- [ ] Backend API + DB persistence
- [ ] User profiles + metric uploads
- [ ] Full Terraform IaC automation
- [ ] Monitoring with CloudWatch/Grafana
- [ ] AI-powered recommendations
- [ ] Cost optimization best practices

---

## 🚧 Deployment (Manual)

1. Clone the repo:
   ```bash
   git clone https://github.com/<your-username>/greenalytics.git
   ```
2. Install dependencies & run locally:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
3. Build & deploy to S3:
   ```bash
   npm run build
   aws s3 sync dist/ s3://your-bucket-name
   ```

---

## 🚀 CI/CD via GitHub Actions

On every push to `main`, the site is built and deployed automatically to S3.

---

## ✉ Contact

Made with ❤️ by **Umar Zaman**  
[LinkedIn](https://www.linkedin.com/in/umarzaman2018/) | [Portfolio](https://umarzaman.ca)  
For DevOps/Cloud consulting: [Tekict.com](https://tekict.com)

---

> “Green tech isn’t just a buzzword. It’s a responsibility. This project reflects my commitment to sustainability, modern cloud engineering, and AI integration.”
