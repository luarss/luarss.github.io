/* Change this file to get your personal Porfolio */

// Website related settings
const settings = {
  isSplash: false, // Change this to false if you don't want Splash screen.
};

//SEO Related settings
const seo = {
  title: "Shui Song Luar's Portfolio",
  description:
    "Fueling innovation at the intersection of machine intelligence and real-world challenges. I ❤️ engineering intelligent solutions that redefine possibilities for making the world a better place.",
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
    "Fueling innovation at the intersection of machine intelligence and real-world challenges. I ❤️ engineering intelligent solutions that redefine possibilities for making the world a better place.",
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
    link: "mailto:ashutoshhathidara98@gmail.com",
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
      title: "Data Science & AI",
      fileName: "DataScienceImg",
      skills: [
        "⚡ Developing highly scalable production ready models for various deeplearning and statistical use cases",
        "⚡ Experience of working with Computer Vision and NLP projects",
        "⚡ Complex quantitative modelling for dynamic forecasting and time series analysis",
      ],
      softwareSkills: [
        {
          skillName: "Tensorflow",
          fontAwesomeClassname: "logos-tensorflow",
          style: {
            backgroundColor: "transparent",
          },
        },
        {
          skillName: "Keras",
          fontAwesomeClassname: "simple-icons:keras",
          style: {
            backgroundColor: "white",
            color: "#D00000",
          },
        },
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
          skillName: "Deeplearning",
          imageSrc: "deeplearning_ai_logo.png",
        },
      ],
    },
    {
      title: "Full Stack Development",
      fileName: "FullStackImg",
      skills: [
        "⚡ Building responsive website front end using React-Redux",
        "⚡ Developing mobile applications using Flutter, React Native and solo android apps using Kotlin",
        "⚡ Creating application backend in Node, Express & Flask",
      ],
      softwareSkills: [
        {
          skillName: "HTML5",
          fontAwesomeClassname: "simple-icons:html5",
          style: {
            color: "#E34F26",
          },
        },
        {
          skillName: "CSS3",
          fontAwesomeClassname: "fa-css3",
          style: {
            color: "#1572B6",
          },
        },
        {
          skillName: "Sass",
          fontAwesomeClassname: "simple-icons:sass",
          style: {
            color: "#CC6699",
          },
        },
        {
          skillName: "JavaScript",
          fontAwesomeClassname: "simple-icons:javascript",
          style: {
            backgroundColor: "#000000",
            color: "#F7DF1E",
          },
        },
        {
          skillName: "ReactJS",
          fontAwesomeClassname: "simple-icons:react",
          style: {
            color: "#61DAFB",
          },
        },
        {
          skillName: "NodeJS",
          fontAwesomeClassname: "devicon-plain:nodejs-wordmark",
          style: {
            color: "#339933",
          },
        },
        {
          skillName: "NPM",
          fontAwesomeClassname: "simple-icons:npm",
          style: {
            color: "#CB3837",
          },
        },
        {
          skillName: "Yarn",
          fontAwesomeClassname: "simple-icons:yarn",
          style: {
            color: "#2C8EBB",
          },
        },
        {
          skillName: "Gatsby",
          fontAwesomeClassname: "simple-icons:gatsby",
          style: {
            color: "#663399",
          },
        },
        {
          skillName: "Flutter",
          fontAwesomeClassname: "simple-icons:flutter",
          style: {
            color: "#02569B",
          },
        },
      ],
    },
    {
      title: "Cloud Infra-Architecture",
      fileName: "CloudInfraImg",
      skills: [
        "⚡ Experience working on multiple cloud platforms",
        "⚡ Hosting and maintaining websites on virtual machine instances along with integration of databases",
        "⚡ Deploying deep learning models on cloud to use on mobile devices",
        "⚡ Setting up streaming jobs from DB to Server or vice-versa on GCP and AWS",
      ],
      softwareSkills: [
        {
          skillName: "GCP",
          fontAwesomeClassname: "simple-icons:googlecloud",
          style: {
            color: "#4285F4",
          },
        },
        {
          skillName: "AWS",
          fontAwesomeClassname: "simple-icons:amazonaws",
          style: {
            color: "#FF9900",
          },
        },
        {
          skillName: "Azure",
          fontAwesomeClassname: "simple-icons:microsoftazure",
          style: {
            color: "#0089D6",
          },
        },
        {
          skillName: "Firebase",
          fontAwesomeClassname: "simple-icons:firebase",
          style: {
            color: "#FFCA28",
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
          skillName: "MongoDB",
          fontAwesomeClassname: "simple-icons:mongodb",
          style: {
            color: "#47A248",
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
        "⚡ Focused on Machine Learning, Deep Learning, and Artificial Intelligence coursework",
        "⚡ Worked as Graduate Research Assistant applying deep reinforcement learning to real-world robotic applications",
        "⚡ Published paper in IROS 2021 that achieved the Best Paper Award",
        "⚡ Developed high accuracy classification models and performed feature engineering on high-dimensional time-series tactile sensor data",
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
        "⚡ Graduated with cGPA: 4.78/5.00",
        "⚡ Studied core engineering subjects including Signal Processing, Control Systems, and Embedded Systems",
        "⚡ Completed projects in Semantic Segmentation using PyTorch and Emotion Analysis in Schizophrenia using MATLAB",
        "⚡ Gained internship experience at Dyson, designing automation tests and working with IoT protocols",
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
          description:
            "Built production RAG system processing documents from internal and public sources, improving answer relevance by 20% through hybrid retrieval architecture on Postgres with pgvector. Designed and deployed ML evaluation framework enabling systematic A/B testing that informed multiple successful model improvements. Built multi-agent research system orchestrating specialized LLM agents (search, analysis, synthesis) across web APIs, vector databases, and internal docs to generate comprehensive domain-specific research.",
          color: "#000000",
        },
        {
          title: "AI Engineer",
          company: "Espressif Systems",
          company_url: "https://www.espressif.com/",
          logo_path: "espressif_logo.png",
          duration: "Sep. 2022 - May. 2024",
          location: "Singapore",
          description:
            "Implemented ML algorithms (GNN, RL, BO) for chip design, saving 20% time as compared to manual baseline. Managed 8-GPU cluster to perform parallel training, model management and hyperparameter optimisation.",
          color: "#0879bf",
        },
        {
          title: "Graduate Research Assistant",
          company: "National University of Singapore",
          company_url: "https://www.nus.edu.sg/",
          logo_path: "nus_logo.png",
          duration: "Aug. 2020 - Aug. 2022",
          location: "Singapore",
          description:
            "Applied deep reinforcement learning to real-world robotic applications outperforming classical control baselines. Translated high-dimensional time-series tactile sensor data to useful insights via feature engineering. Implemented high accuracy classification models using machine learning. Published paper in IROS 2021 that achieved the Best Paper Award.",
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
          description:
            "Internship in Building Automation Services (BAS) Department, Data Center Project. Maintained Human-Machine Interface (HMI) Graphics and verified Programmable Logic Controller (PLC) code via software bench tests. Designed and implemented software automation to optimise work processes using Python, reducing cognitive load and time by 66%. Oversaw commissioning process for software and hardware integration for over 1000 monitoring points and 100 instruments.",
          color: "#0071C5",
        },
        {
          title: "Research, Design and Development Intern",
          company: "Dyson",
          company_url: "https://www.dyson.com/",
          logo_path: "dyson_logo.svg",
          duration: "May 2018 - Jul. 2018",
          location: "Singapore",
          description:
            "Designed automation tests for position tracking, reduced 75% time in manual monitoring. Utilised VICON with LabVIEW for 3D Pose, and the Python SDK for AWS IoT MQTT protocol.",
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
          description:
            "Thesis project in fulfilment of Bachelors Degree. Research attachment under Professor Jonathan Kelly in joint (revolute, prismatic) classification in articulated objects using computer vision. Techniques involved: PyTorch, fine-tuning, data augmentation.",
          color: "#8C1515",
        },
        {
          title: "Undergraduate Research Fellow",
          company: "Singapore-MIT Alliance for Research & Technology",
          company_url: "https://smart.mit.edu/",
          logo_path: "smart_logo.avif",
          duration: "Jun. 2019 - Jul. 2019",
          location: "Singapore",
          description:
            "Research attachment under Dr. Malika Meghjani and Dr. Daniel Kondor, entitled 'Robust Route Planning for Peak Hour Congestion Management'. Implemented and compared various shortest path algorithms using different weights of Singapore road network. Using non-conventional weights: historical data and lagging data were robust enough to closely approximate performance of real-time data. Techniques involved: Python NetworkX, GIS.",
          color: "#D83B01",
        },
        {
          title: "Undergraduate Researcher",
          company: "Georgia Institute of Technology",
          company_url: "https://www.gatech.edu/",
          logo_path: "gt_logo.png",
          duration: "Jan. 2019 - May. 2019",
          location: "United States",
          description:
            "Research attachment under Professor Patricio Antonio Vela, entitled 'Vision-based Manipulation'. Aim is to implement the functionalities of a puzzle solving robotic arm with 5 joints. Developed accurate algorithms for puzzle piece segmentation and pose detection. Techniques involved: OpenCV Background subtraction (MoG), image moments (Hu and standard), erosion, ARUCO; ROS.",
          color: "#4285F4",
        },
        {
          title: "Undergraduate Researcher",
          company: "Nanyang Technological University",
          company_url: "https://www.ntu.edu.sg/",
          logo_path: "ntu_logo.png",
          duration: "Jan. 2017 - May. 2017",
          location: "Singapore",
          description:
            "Research attachment under Professor Justin Dauwels, entitled 'Emotion analysis in schizophrenia with supervised learning'. Aim is to generate an objective and effective method towards diagnosing negative schizophrenia using machine learning and emotional variables. By applying supervised learning, the extracted emotional features by Affectiva software is used to predict negative symptoms according to the Negative Symptom Assessment (NSA-16) tool. Techniques involved: MATLAB implementation of ML techniques.",
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
        "IROS 2021 Best Paper Award - Research on deep reinforcement learning applied to real-world robotic applications with tactile sensing.",
      url: "https://arxiv.org/pdf/2106.00489",
    },
  ],
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
  contactPageData,
};
