import number from '../assests/11.jpeg';
import dash from '../assests/Dashboard.png';
import heart from '../assests/heart.png';
import blood from '../assests/13.png';
import job from '../assests/job.png';
import text from '../assests/texthidder.png';
import cyber from '../assests/seasonal.jpg';
import sea from '../assests/image (16).png';
import aifit from '../assests/aifit.png';


export const data = [
  {
    id: 12,
    name: "AI-Powered Healthcare Analytics Platform",
    image: heart, // Using heart image as placeholder
    github: "https://github.com/premshah06/healthcare-analytics",
    live: "https://healthcare-analytics.demo.dev",
    description: "Developed a comprehensive healthcare analytics platform using advanced ML models and LLMs. Implemented real-time patient monitoring with Apache Kafka, automated report generation with GPT-4, and predictive analytics for patient outcomes. Achieved 92% accuracy in early disease detection and reduced diagnostic time by 65%.",
    skills: ["Python", "TensorFlow", "LangChain", "Apache Kafka", "FastAPI", "AWS", "React", "PostgreSQL"],
    type: "Full Stack ML",
    views: "1.2K",
    stars: "156"
  },
  {
    id: 0,
    name: "AI-Powered Document Intelligence Platform",
    image: aifit, // Placeholder image
    github: "https://github.com/premshah06/doc-intelligence",
    live: "https://doc-intelligence.demo.dev",
    description: "Built an enterprise-grade document processing platform using LangChain and GPT-4. Implemented RAG (Retrieval-Augmented Generation) with Pinecone for semantic search across millions of documents. Achieved 95% accuracy in information extraction and reduced processing time by 80%.",
    skills: ["LangChain", "OpenAI", "Vector DB", "FastAPI", "React", "MLOps"],
    type: "Full Stack AI"
  },
  {
    id: 10,
    name: "Real-time Data Analytics Pipeline with Modern Data Stack",
    image: dash,
    github: "https://github.com/premshah06/modern-data-stack",
    live: "https://analytics.demo.dev",
    description: "Architected a modern data stack using Airbyte, dbt, Snowflake, and Preset. Implemented stream processing with Apache Kafka and Flink for real-time analytics. Reduced data latency by 90% and improved data quality using Great Expectations.",
    skills: ["Airbyte", "dbt", "Snowflake", "Apache Flink", "Kafka", "Data Quality"],
    type: "Data Engineering"
  },
  {
    id: 1,
    name: "Seasonal Variation in Aging-Associated Health Measures",
    image: sea, // Add image for the seasonal project
    github: "https://github.com/premshah06/Seasonal-Variation-in-Aging-Associated-Health-Measures-Alzheimers-and-Mental-Health-Patterns", // Add link to GitHub repository
    description:
      "Built a data pipeline integrating CDC and Census datasets, optimizing ETL efficiency by 60% with 99.9% accuracy. Developed dashboards to track aging health trends, enhancing insight by 40% for data-driven healthcare decisions.",
    skills: ["Python", "Tableau", "AWS", "ETL"],
  },
  {
    id: 2,
    name: "Optimized Cyber Attack Analysis and Network Defense",
    image: cyber, // Add image for the cyber attack project
    github: "https://github.com/premshah06/Optimized-Cyber-Attack-Analysis-and-Network-Defense-using-ETL", // Add link to GitHub repository
    description:
      "Designed and deployed efficient ETL workflows in Amazon Redshift and Neo4j using Apache NiFi. Integrated Kafka with Cassandra to handle high-velocity, real-time data ingestion, supporting immediate threat detection.",
    skills: ["AWS Redshift", "Neo4J", "Cassandra", "Apache NiFi", "Kafka"],
  },
  {
    id: 3,
    name: "AirBnB Dashboard",
    image: dash,
    github: "https://github.com/premshah06/AirBnB-Dashboard",
    description:
      "Developed an interactive Tableau dashboard for Airbnb data, visualizing key metrics such as average prices, booking trends, and revenue by zip code. This project helps investors make informed property decisions using rich data insights and visualizations.",
    skills: ["Tableau", "Python", "SQL"],
  },
  {
    id: 4,
    name: "Job Details Analyzer",
    image: job,
    github: "https://github.com/premshah06/Job-Detail-Analyzer",
    description:
      "Implemented an advanced ETL pipeline in Python for extracting and analyzing job market data. Features custom heatmaps, multi-index pivot tables, and trend analysis to uncover actionable insights on employment trends and salary distributions.",
    skills: ["Python", "Colab", "SQL", "NumPy", "Seaborn"],
  },
  {
    id: 5,
    name: "AI Fit - Fitness App",
    image: aifit,
    github: "https://github.com/premshah06/AI-Fit-App",
    description:
      "Fit-AI-Coach is a cutting-edge web application designed to deliver personalized fitness and diet plans using Google's Gemini Pro Model. With its user-friendly interface and intelligent recommendations, Fit-AI-Coach is perfect for anyone aiming to achieve specific fitness goals, enhance their health, or maintain a healthy lifestyle.",
    skills: ["Python", "Gen AI", "Streamlit", "Google Cloud"],
  },
  {
    id: 6,
    name: "Number Plate Detection System",
    image: number,
    github: "https://github.com/premshah06/Number-Plate-Recognition-System",
    description:
      "Enhanced traffic security by developing a system using OCR and OpenCV to detect and recognize license plates from user-uploaded images. The application facilitates efficient law enforcement and road safety compliance.",
    skills: ["Python", "OpenCV", "Streamlit"],
  },
  {
    id: 7,
    name: "Heart and Diabetes Detection System",
    image: heart,
    github: "https://github.com/premshah06/apps",
    description:
      "Built a predictive machine learning model for detecting heart disease and diabetes. Utilized patient data to provide healthcare providers with actionable insights, empowering them to identify at-risk individuals early.",
    skills: ["Python", "Jupyter", "Power BI", "Streamlit"],
  },
  {
    id: 8,
    name: "Blood Donation Application",
    image: blood,
    github: "https://github.com/premshah06/Blood-Donation-App",
    description:
      "Created a Java-based Android app to connect donors and recipients efficiently. Features include user profile creation, blood group filtering, and Firebase integration for real-time communication and database management.",
    skills: ["Android", "Java", "Firebase"],
  },
  {
    id: 9,
    name: "TextHidder",
    image: text,
    github: "https://github.com/premshah06/Texthidder",
    description:
      "Developed an image steganography project with AES encryption. The GUI-based application allows users to securely hide and retrieve sensitive data within images, providing a practical implementation of cryptographic principles.",
    skills: ["Python", "Tkinter", "Encryption"],
  },
 
];
