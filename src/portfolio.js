/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Shui Song Luar's Portfolio",
  description:
    "Fueling innovation at the intersection of machine intelligence and real-world challenges. I ❤️ engineering intelligent solutions for making the world a better place.",
  og: {
    title: "Shui Song Luar's Portfolio",
    type: "website",
    url: "http://luarss.github.io/",
  },
};

//Home Page
const greeting = {
  title: "Shui Song Luar",
  logo_name: "luarss",
  // nickname: "layman_brother",
  subTitle:
    "Fueling innovation at the intersection of machine intelligence and real-world challenges. I ❤️ engineering intelligent solutions for making the world a better place.",
  resumeLink: "/Song_Resume.pdf",
  portfolio_repository: "https://github.com/luarss/luarss.github.io",
  githubProfile: "https://github.com/luarss",
};

const socialMediaLinks = [
  {
    name: "Github",
    link: "https://github.com/luarss",
    fontAwesomeIcon: "fa-github", // Reference https://fontawesome.com/icons/github?style=brands
    backgroundColor: "#181717", // Reference https://simpleicons.org/?q=github
  },
  {
    name: "LinkedIn",
    link: "https://www.linkedin.com/in/song-luar/",
    fontAwesomeIcon: "fa-linkedin-in", // Reference https://fontawesome.com/icons/linkedin-in?style=brands
    backgroundColor: "#0077B5", // Reference https://simpleicons.org/?q=linkedin
  },
  // {
  //   name: "YouTube",
  //   link: "https://youtube.com/c/DevSense19",
  //   fontAwesomeIcon: "fa-youtube", // Reference https://fontawesome.com/icons/youtube?style=brands
  //   backgroundColor: "#FF0000", // Reference https://simpleicons.org/?q=youtube
  // },
  {
    name: "Gmail",
    link: "mailto:espsluar@gmail.com",
    fontAwesomeIcon: "fa-google", // Reference https://fontawesome.com/icons/google?style=brands
    backgroundColor: "#D14836", // Reference https://simpleicons.org/?q=gmail
  },
  // {
  //   name: "X-Twitter",
  //   link: "https://twitter.com/ashutosh_1919",
  //   fontAwesomeIcon: "fa-x-twitter", // Reference https://fontawesome.com/icons/x-twitter?f=brands&s=solid
  //   backgroundColor: "#000000", // Reference https://simpleicons.org/?q=x
  // },
  // {
  //   name: "Facebook",
  //   link: "https://www.facebook.com/laymanbrother.19/",
  //   fontAwesomeIcon: "fa-facebook-f", // Reference https://fontawesome.com/icons/facebook-f?style=brands
  //   backgroundColor: "#1877F2", // Reference https://simpleicons.org/?q=facebook
  // },
  // {
  //   name: "Instagram",
  //   link: "https://www.instagram.com/layman_brother/",
  //   fontAwesomeIcon: "fa-instagram", // Reference https://fontawesome.com/icons/instagram?style=brands
  //   backgroundColor: "#E4405F", // Reference https://simpleicons.org/?q=instagram
  // },
];

const skills = {
  data: [
    {
      title: "Production AI & LLM Systems",
      fileName: "DataScienceImg",
      skills: [
        "• Building production-ready RAG systems with hybrid retrieval architectures using vector databases",
        "• Designing multi-agent systems that orchestrate specialized LLM agents for complex research and analysis tasks",
        "• Implementing ML evaluation frameworks for systematic testing and continuous model improvement",
        "• Developing custom conversational AI assistants for domain-specific applications",
      ],
      softwareSkills: [
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "logos-pytorch",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
      ],
    },
    {
      title: "Cloud Infrastructure & DevOps",
      fileName: "CloudInfraImg",
      skills: [
        "• Building and managing cloud infrastructure on AWS and GCP with infrastructure-as-code practices",
        "• Automating deployment pipelines and CI/CD workflows using GitHub Actions and modern DevOps tools",
        "• Orchestrating containerized workloads with Docker, Kubernetes, and Nomad for scalable distributed systems",
        "• Configuration management and provisioning automation using Ansible and Terraform",
      ],
      softwareSkills: [
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "Terraform",
          fontAwesomeClassname: "simple-icons:terraform",
          style: {
            color: "#7B42BC",
          },
        },
        {
          skillName: "Ansible",
          fontAwesomeClassname: "simple-icons:ansible",
          style: {
            color: "#EE0000",
          },
        },
        {
          skillName: "Docker",
          fontAwesomeClassname: "simple-icons:docker",
          style: {
            color: "#1488C6",
          },
        },
        {
          skillName: "Kubernetes",
          fontAwesomeClassname: "simple-icons:kubernetes",
          style: {
            color: "#326CE5",
          },
        },
        {
          skillName: "GitHub Actions",
          fontAwesomeClassname: "simple-icons:githubactions",
          style: {
            color: "#2088FF",
          },
        },
        {
          skillName: "Nomad",
          fontAwesomeClassname: "simple-icons:nomad",
          style: {
            color: "#00CA8E",
          },
        },
      ],
    },
    {
      title: "Full Stack AI Development",
      fileName: "FullStackImg",
      skills: [
        "• Building end-to-end AI-powered web applications with modern frontend and backend frameworks",
        "• Developing RESTful APIs and real-time services for ML model deployment and inference",
        "• Creating interactive user interfaces with React and TypeScript for AI-driven applications",
        "• Integrating ML models with production web services using FastAPI and scalable backend architectures",
      ],
      softwareSkills: [
        {
          skillName: "React",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "TypeScript",
          fontAwesomeClassname: "simple-icons:typescript",
          style: {
            color: "#3178C6",
          },
        },
        {
          skillName: "FastAPI",
          fontAwesomeClassname: "simple-icons:fastapi",
          style: {
            color: "#009688",
          },
        },
        {
          skillName: "PostgreSQL",
          fontAwesomeClassname: "simple-icons:postgresql",
          style: {
            color: "#336791",
          },
        },
        {
          skillName: "Redis",
          fontAwesomeClassname: "simple-icons:redis",
          style: {
            color: "#DC382D",
          },
        },
      ],
    },
    {
      title: "Robotics & Deep Reinforcement Learning",
      fileName: "RoboticsImg",
      skills: [
        "• Applying deep reinforcement learning to real-world robotic applications and control systems",
        "• Developing classification and prediction models for high-dimensional time-series sensor data",
        "• Research in tactile perception, vibration sensing, and sensor fusion for robotic systems",
        "• Experience with vision-based manipulation, computer vision, and ROS-based robotic frameworks",
      ],
      softwareSkills: [
        {
          skillName: "PyTorch",
          fontAwesomeClassname: "logos-pytorch",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "TensorFlow",
          fontAwesomeClassname: "logos-tensorflow",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "OpenCV",
          fontAwesomeClassname: "simple-icons:opencv",
          style: {
            color: "#5C3EE8",
          },
        },
        {
          skillName: "Python",
          fontAwesomeClassname: "ion-logo-python",
          style: {
            backgroundColor: "transparent",
            color: "#3776AB",
          },
        },
      ],
    },
  ],
};

// Education Page
const competitiveSites = {
  competitiveSites: [
    // {
    //   siteName: "LeetCode",
    //   iconifyClassname: "simple-icons:leetcode",
    //   style: {
    //     color: "#F79F1B",
    //   },
    //   profileLink: "https://leetcode.com/layman_brother/",
    // },
    // {
    //   siteName: "HackerRank",
    //   iconifyClassname: "simple-icons:hackerrank",
    //   style: {
    //     color: "#2EC866",
    //   },
    //   profileLink: "https://www.hackerrank.com/layman_brother",
    // },
    // {
    //   siteName: "Codechef",
    //   iconifyClassname: "simple-icons:codechef",
    //   style: {
    //     color: "#5B4638",
    //   },
    //   profileLink: "https://www.codechef.com/users/ashutosh_1919",
    // },
    // {
    //   siteName: "Codeforces",
    //   iconifyClassname: "simple-icons:codeforces",
    //   style: {
    //     color: "#1F8ACB",
    //   },
    //   profileLink: "http://codeforces.com/profile/layman_brother",
    // },
    // {
    //   siteName: "Hackerearth",
    //   iconifyClassname: "simple-icons:hackerearth",
    //   style: {
    //     color: "#323754",
    //   },
    //   profileLink: "https://www.hackerearth.com/@ashutosh391",
    // },
    // {
    //   siteName: "Kaggle",
    //   iconifyClassname: "simple-icons:kaggle",
    //   style: {
    //     color: "#20BEFF",
    //   },
    //   profileLink: "https://www.kaggle.com/laymanbrother",
    // },
  ],
};

const degrees = {
  degrees: [
    {
      title: "National University of Singapore",
      subtitle: "Master of Science in Computer Science",
      logo_path: "nus_logo.png",
      alt_name: "National University of Singapore",
      duration: "Aug. 2020 - Oct. 2022",
      descriptions: [
        "• Focused on Machine Learning, Deep Learning, and Artificial Intelligence coursework",
        "• Worked as Graduate Research Assistant applying deep reinforcement learning to real-world robotic applications",
        "• Published paper in IROS 2021 that achieved the Best Paper Award",
        "• Developed high accuracy classification models and performed feature engineering on high-dimensional time-series tactile sensor data",
      ],
      website_link: "https://www.nus.edu.sg/",
    },
    {
      title: "Nanyang Technological University",
      subtitle:
        "Bachelor of Engineering in Electrical & Electronic Engineering",
      logo_path: "ntu_logo.png",
      alt_name: "Nanyang Technological University",
      duration: "Aug. 2016 - Aug. 2020",
      descriptions: [
        "• Graduated with cGPA: 4.78/5.00",
        "• Studied core engineering subjects including Signal Processing, Control Systems, and Embedded Systems",
        "• Completed projects in Semantic Segmentation using PyTorch and Emotion Analysis in Schizophrenia using MATLAB",
        "• Gained internship experience at Dyson, designing automation tests and working with IoT protocols",
      ],
      website_link: "https://www.ntu.edu.sg/",
    },
  ],
};

const certifications = {
  certifications: [],
};

// Experience Page
const experience = {
  title: "Experience",
  subtitle: "Work and Research Experience",
  description:
    "I have experience building production AI systems, working with cutting-edge ML technologies, and contributing to open source projects. My work spans from stealth startups to established tech companies, focusing on practical applications of machine learning and AI.",
  header_image_path: "experience.svg",
  sections: [
    {
      title: "Work",
      work: true,
      experiences: [
        {
          title: "Founding Engineer",
          company: "SoraNova",
          company_url: "#",
          logo_path: "soranova_logo.svg",
          duration: "Jun. 2024 - Present",
          location: "Singapore",
          description: [
            "• Architected and built entire AI knowledge platform from ground up - 159k net lines across 1,272 commits to FastAPI backend, multi-agent AI workflows, and React frontend; contributed 774 commits to multi-cloud infrastructure (GCP/AWS) managing GPU-accelerated ML workloads with Terraform, Nomad, and Consul",
            "• Engineered production RAG system with hybrid retrieval (PostgreSQL pgvector + keyword), improving answer relevance 25% through semantic search and query caching; optimized backend performance eliminating N+1 queries (90% connection pool reduction) and implemented 20+ Alembic migrations for schema evolution",
            "• Designed multi-agent research system orchestrating 5 specialized LLM agents (factual, technical, market, team, risk) with iterative gap analysis and automatic refinement, generating comprehensive VC investment research reports; built knowledge graph with entity extraction (15+ types) and two-tier citation provenance tracking",
            "• Implemented ML evaluation framework with DeepEval integration - 15+ metrics across completeness, accuracy, relevance, quality - enabling systematic A/B testing and adaptive improvement loops that drove multiple successful model enhancements",
            "• Owned complete DevOps pipeline: GitHub Actions CI/CD with automated testing and deployment, Docker multi-stage builds, Packer workflows for GPU AMI creation (T4/L4/A100), Ansible configuration management, and Harbor container registry - enabling multiple daily deployments across distributed infrastructure",
          ],
          color: "#000000",
        },
        {
          title: "AI Engineer",
          company: "Espressif Systems",
          company_url: "https://www.espressif.com/",
          logo_path: "espressif_logo.png",
          duration: "Sep. 2022 - May. 2024",
          location: "Singapore",
          description: [
            "• Implemented ML algorithms (Graph Neural Networks, Reinforcement Learning, Bayesian Optimization, Simulated Annealing) for chip design, saving 20% time compared to manual baseline",
            "• Developed AI evaluation framework for chip design agents: implemented iterative refinement system with automated error feedback across 175+ Verilog benchmarks (VerilogEval, VeriGen), using Pass@K, BLEU, and Levenshtein metrics",
            "• Managed distributed RL training infrastructure with 8x NVIDIA GPUs and parallel collect agents for deep RL experiments",
          ],
          color: "#0879bf",
        },
        {
          title: "Graduate Research Assistant",
          company: "National University of Singapore",
          company_url: "https://www.nus.edu.sg/",
          logo_path: "nus_logo.png",
          duration: "Aug. 2020 - Aug. 2022",
          location: "Singapore",
          description: [
            "• Applied deep reinforcement learning to real-world robotic applications outperforming classical control baselines",
            "• Translated high-dimensional time-series tactile sensor data to useful insights via feature engineering",
            "• Implemented high accuracy classification models using machine learning",
            "• Published paper in IROS 2021 that achieved the Best Paper Award",
          ],
          color: "#4285F4",
        },
      ],
    },
    {
      title: "Internships",
      experiences: [
        {
          title: "Systems Engineering Intern",
          company: "RoviSys",
          company_url: "https://www.rovisys.com/",
          logo_path: "rovisys_logo.png",
          duration: "Jul. 2018 - Dec. 2018",
          location: "Singapore",
          description: [
            "• Designed and implemented software automation to optimize work processes using Python, reducing cognitive load and time by 66%",
            "• Maintained Human-Machine Interface (HMI) Graphics and verified Programmable Logic Controller (PLC) code via software bench tests",
            "• Oversaw commissioning process for software and hardware integration for over 1000 monitoring points and 100 instruments",
          ],
          color: "#0071C5",
        },
        {
          title: "Research, Design and Development Intern",
          company: "Dyson",
          company_url: "https://www.dyson.com/",
          logo_path: "dyson_logo.svg",
          duration: "May 2018 - Jul. 2018",
          location: "Singapore",
          description: [
            "• Designed automation tests for position tracking, reduced 75% time in manual monitoring",
            "• Utilized VICON with LabVIEW for 3D Pose, and the Python SDK for AWS IoT MQTT protocol",
          ],
          color: "#ee3c26",
        },
      ],
    },
    {
      title: "Research",
      experiences: [
        {
          title: "Visiting Researcher",
          company: "University of Toronto",
          company_url: "https://www.utoronto.ca/",
          logo_path: "uot_logo.png",
          duration: "Aug. 2019 - Dec. 2019",
          location: "Toronto, Canada",
          description: [
            "• Research attachment under Professor Jonathan Kelly in joint (revolute, prismatic) classification in articulated objects using computer vision",
            "• Techniques: PyTorch, fine-tuning, data augmentation",
          ],
          color: "#8C1515",
        },
        {
          title: "Undergraduate Research Fellow",
          company: "Singapore-MIT Alliance for Research & Technology",
          company_url: "https://smart.mit.edu/",
          logo_path: "smart_logo.avif",
          duration: "Jun. 2019 - Jul. 2019",
          location: "Singapore",
          description: [
            "• Research on 'Robust Route Planning for Peak Hour Congestion Management' under Dr. Malika Meghjani and Dr. Daniel Kondor",
            "• Implemented and compared various shortest path algorithms using different weights of Singapore road network",
            "• Demonstrated non-conventional weights (historical data, lagging data) closely approximate real-time data performance",
          ],
          color: "#D83B01",
        },
        {
          title: "Undergraduate Researcher",
          company: "Georgia Institute of Technology",
          company_url: "https://www.gatech.edu/",
          logo_path: "gt_logo.png",
          duration: "Jan. 2019 - May. 2019",
          location: "United States",
          description: [
            "• Research on 'Vision-based Manipulation' under Professor Patricio Antonio Vela",
            "• Implemented functionalities of a puzzle solving robotic arm with 5 joints",
            "• Developed accurate algorithms for puzzle piece segmentation and pose detection using OpenCV and ROS",
          ],
          color: "#4285F4",
        },
        {
          title: "Undergraduate Researcher",
          company: "Nanyang Technological University",
          company_url: "https://www.ntu.edu.sg/",
          logo_path: "ntu_logo.png",
          duration: "Jan. 2017 - May. 2017",
          location: "Singapore",
          description: [
            "• Research on 'Emotion analysis in schizophrenia with supervised learning' under Professor Justin Dauwels",
            "• Developed objective method for diagnosing negative schizophrenia using machine learning and emotional variables",
            "• Applied supervised learning to predict negative symptoms using emotional features from Affectiva software",
          ],
          color: "#0C9D58",
        },
      ],
    },
  ],
};

// Projects Page
const projectsHeader = {
  title: "Projects",
  description:
    "I actively contribute to open source projects, particularly in AI-assisted tools for chip design and development. My projects span from LLM chatbots to MCP servers for developer tooling.",
  avatar_image_path: "projects_image.svg",
};

const publicationsHeader = {
  title: "Publications",
  description: "Some of my published Articles, Blogs and Research.",
  avatar_image_path: "projects_image.svg",
};

const publications = {
  data: [
    {
      id: "orassistant-paper",
      name:
        "ORAssistant: A Custom RAG-based Conversational Assistant for OpenROAD",
      createdAt: "2024-10-04T00:00:00Z",
      description:
        "Paper on custom RAG-based conversational assistant for chip design automation using OpenROAD.",
      url: "https://arxiv.org/pdf/2410.03845",
    },
    {
      id: "iros-2021-paper",
      name:
        "Extended Tactile Perception: Vibration Sensing through Tools and Grasped Objects",
      createdAt: "2021-06-01T00:00:00Z",
      description:
        "IROS 2021 Best Paper Award - Machine learning classification models for high-dimensional time-series tactile sensor data to enable vibration sensing through tools and grasped objects.",
      url: "https://arxiv.org/pdf/2106.00489",
    },
  ],
};

// Blog Section
const blogSection = {
  link: "https://dev.to/luarss",
};

// Contact Page
const contactPageData = {
  contactSection: {
    title: "Contact Me",
    profile_image_path: "animated_ashutosh.png",
    description:
      "I am available on almost every social media. You can message me, I will reply within 24 hours. I can help you with ML, AI, React, Android, Cloud and Opensource Development.",
  },
  blogSection: {
    title: "Blogs",
    subtitle:
      "I like to document some of my experiences in professional career journey as well as some technical knowledge sharing.",
    link: "https://blogs.ashutoshhathidara.com/",
    avatar_image_path: "blogs_image.svg",
  },
  addressSection: {
    title: "Address",
    subtitle: "Saratoga Ave, San Jose, CA, USA 95129",
    locality: "San Jose",
    country: "USA",
    region: "California",
    postalCode: "95129",
    streetAddress: "Saratoga Avenue",
    avatar_image_path: "address_image.svg",
    location_map_link: "https://maps.app.goo.gl/NvYZqa34Wye4tpS17",
  },
  phoneSection: {
    title: "",
    subtitle: "",
  },
};

export {
  settings,
  seo,
  greeting,
  socialMediaLinks,
  skills,
  competitiveSites,
  degrees,
  certifications,
  experience,
  projectsHeader,
  publicationsHeader,
  publications,
  blogSection,
  contactPageData,
};
