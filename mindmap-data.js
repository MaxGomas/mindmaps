// Mindmap data - JSON structure for different mindmaps
const mindmapData = {
    technology: {
        name: "Technology Trends 2025",
        children: [
            {
                name: "Artificial Intelligence",
                description: "AI technologies revolutionizing industries",
                details: "Artificial Intelligence continues to transform various sectors with advanced machine learning, natural language processing, and computer vision capabilities.",
                children: [
                    {
                        name: "Machine Learning",
                        description: "Algorithms that learn from data",
                        details: "ML enables systems to automatically learn and improve from experience without being explicitly programmed.",
                        children: [
                            { name: "Deep Learning", description: "Neural networks with multiple layers", details: "Deep learning uses neural networks with many layers to model and understand complex patterns in data." },
                            { name: "Reinforcement Learning", description: "Learning through rewards and penalties", details: "RL trains agents to make decisions by learning from the consequences of their actions." },
                            { name: "Computer Vision", description: "Teaching machines to see", details: "Computer vision enables machines to interpret and understand visual information from the world." }
                        ]
                    },
                    {
                        name: "Natural Language Processing",
                        description: "Understanding human language",
                        details: "NLP helps computers understand, interpret, and generate human language in a valuable way.",
                        children: [
                            { name: "Large Language Models", description: "GPT, BERT, and beyond", details: "LLMs are trained on vast amounts of text data to understand and generate human-like text." },
                            { name: "Speech Recognition", description: "Converting speech to text", details: "Technology that recognizes and transcribes human speech into text format." },
                            { name: "Sentiment Analysis", description: "Understanding emotions in text", details: "Analyzing text to determine the emotional tone and sentiment expressed." }
                        ]
                    }
                ]
            },
            {
                name: "Cloud Computing",
                description: "Scalable computing resources over the internet",
                details: "Cloud computing provides on-demand access to computing resources, enabling businesses to scale efficiently.",
                children: [
                    {
                        name: "Serverless Computing",
                        description: "Code execution without server management",
                        details: "Serverless allows developers to run code without provisioning or managing servers.",
                        children: [
                            { name: "AWS Lambda", description: "Amazon's serverless platform", details: "AWS Lambda lets you run code without provisioning or managing servers." },
                            { name: "Azure Functions", description: "Microsoft's serverless solution", details: "Event-driven serverless compute platform for Azure." }
                        ]
                    },
                    {
                        name: "Containerization",
                        description: "Packaging applications with dependencies",
                        details: "Containers package applications with all their dependencies for consistent deployment.",
                        children: [
                            { name: "Docker", description: "Popular containerization platform", details: "Docker enables developers to package applications into containers." },
                            { name: "Kubernetes", description: "Container orchestration", details: "Kubernetes automates deployment, scaling, and management of containerized applications." }
                        ]
                    }
                ]
            },
            {
                name: "Quantum Computing",
                description: "Computing using quantum mechanics principles",
                details: "Quantum computing leverages quantum mechanical phenomena to process information in fundamentally new ways.",
                children: [
                    {
                        name: "Quantum Algorithms",
                        description: "Algorithms designed for quantum computers",
                        details: "Specialized algorithms that take advantage of quantum properties for computational speedup.",
                        children: [
                            { name: "Shor's Algorithm", description: "Factoring large numbers", details: "Quantum algorithm for efficiently factoring large integers." },
                            { name: "Grover's Algorithm", description: "Searching unsorted databases", details: "Quantum algorithm for searching unsorted databases quadratically faster." }
                        ]
                    }
                ]
            }
        ]
    },

    learning: {
        name: "Full-Stack Development Learning Path",
        children: [
            {
                name: "Frontend Development",
                description: "User interface and experience",
                details: "Frontend development focuses on creating engaging user interfaces and seamless user experiences.",
                children: [
                    {
                        name: "HTML & CSS",
                        description: "Structure and styling fundamentals",
                        details: "HTML provides structure while CSS handles styling and layout of web pages.",
                        children: [
                            { name: "Semantic HTML", description: "Meaningful markup", details: "Using HTML elements that clearly describe their meaning to both browser and developer." },
                            { name: "CSS Grid & Flexbox", description: "Modern layout systems", details: "Powerful CSS layout systems for creating responsive designs." },
                            { name: "CSS Animations", description: "Interactive visual effects", details: "Creating smooth animations and transitions to enhance user experience." }
                        ]
                    },
                    {
                        name: "JavaScript",
                        description: "Programming language for web interactivity",
                        details: "JavaScript enables dynamic behavior and interactivity in web applications.",
                        children: [
                            { name: "ES6+ Features", description: "Modern JavaScript syntax", details: "Latest JavaScript features including arrow functions, destructuring, and modules." },
                            { name: "DOM Manipulation", description: "Interacting with web pages", details: "Dynamically changing HTML content and structure using JavaScript." },
                            { name: "Async Programming", description: "Promises and async/await", details: "Handling asynchronous operations efficiently in JavaScript." }
                        ]
                    },
                    {
                        name: "React.js",
                        description: "Component-based UI library",
                        details: "React enables building reusable UI components for scalable web applications.",
                        children: [
                            { name: "Components", description: "Reusable UI building blocks", details: "Creating modular, reusable components for building complex UIs." },
                            { name: "State Management", description: "Managing application state", details: "Handling component state and global application state effectively." },
                            { name: "React Hooks", description: "Modern React patterns", details: "Using hooks for state management and side effects in functional components." }
                        ]
                    }
                ]
            },
            {
                name: "Backend Development",
                description: "Server-side logic and data management",
                details: "Backend development handles server logic, databases, and API creation.",
                children: [
                    {
                        name: "Node.js",
                        description: "JavaScript runtime for servers",
                        details: "Node.js enables JavaScript development on the server side.",
                        children: [
                            { name: "Express.js", description: "Web application framework", details: "Minimal and flexible Node.js web application framework." },
                            { name: "API Development", description: "Creating RESTful services", details: "Building APIs for communication between frontend and backend." }
                        ]
                    },
                    {
                        name: "Databases",
                        description: "Data storage and retrieval",
                        details: "Understanding different database types and their use cases.",
                        children: [
                            { name: "MongoDB", description: "NoSQL document database", details: "Flexible, document-based database for modern applications." },
                            { name: "PostgreSQL", description: "Relational database", details: "Advanced relational database with extensive feature set." }
                        ]
                    }
                ]
            },
            {
                name: "DevOps & Deployment",
                description: "Development operations and deployment strategies",
                details: "DevOps practices for efficient development and deployment workflows.",
                children: [
                    {
                        name: "Version Control",
                        description: "Code management with Git",
                        details: "Managing code changes and collaboration using Git version control.",
                        children: [
                            { name: "Git Workflows", description: "Branching strategies", details: "Effective branching and merging strategies for team collaboration." },
                            { name: "GitHub Actions", description: "CI/CD automation", details: "Automating testing and deployment workflows." }
                        ]
                    }
                ]
            }
        ]
    },

    business: {
        name: "Business Strategy Framework",
        children: [
            {
                name: "Market Analysis",
                description: "Understanding market dynamics and opportunities",
                details: "Comprehensive analysis of market conditions, competition, and opportunities for strategic decision-making.",
                children: [
                    {
                        name: "Competitive Analysis",
                        description: "Analyzing competitors and market position",
                        details: "Systematic evaluation of competitors' strengths, weaknesses, and market strategies.",
                        children: [
                            { name: "SWOT Analysis", description: "Strengths, Weaknesses, Opportunities, Threats", details: "Framework for evaluating internal and external factors affecting business performance." },
                            { name: "Porter's Five Forces", description: "Industry competition analysis", details: "Model for analyzing competitive intensity and attractiveness of an industry." },
                            { name: "Market Positioning", description: "Brand position in market", details: "How a brand is perceived relative to competitors in the target market." }
                        ]
                    },
                    {
                        name: "Customer Research",
                        description: "Understanding target customers",
                        details: "Research methodologies to understand customer needs, preferences, and behaviors.",
                        children: [
                            { name: "Customer Personas", description: "Detailed customer profiles", details: "Semi-fictional representations of ideal customers based on research and data." },
                            { name: "Journey Mapping", description: "Customer experience mapping", details: "Visual representation of the customer journey and touchpoints." },
                            { name: "Market Segmentation", description: "Dividing market into segments", details: "Grouping customers based on shared characteristics or behaviors." }
                        ]
                    }
                ]
            },
            {
                name: "Strategic Planning",
                description: "Long-term planning and goal setting",
                details: "Systematic approach to defining direction, making decisions, and allocating resources.",
                children: [
                    {
                        name: "Vision & Mission",
                        description: "Defining organizational purpose",
                        details: "Establishing clear vision and mission statements to guide organizational direction.",
                        children: [
                            { name: "Core Values", description: "Fundamental beliefs", details: "Essential principles that guide organizational behavior and decision-making." },
                            { name: "Strategic Objectives", description: "Long-term goals", details: "Specific, measurable goals that support the organization's mission." }
                        ]
                    },
                    {
                        name: "Resource Allocation",
                        description: "Optimizing resource distribution",
                        details: "Strategic distribution of financial, human, and technological resources.",
                        children: [
                            { name: "Budget Planning", description: "Financial resource allocation", details: "Planning and allocating financial resources to support strategic objectives." },
                            { name: "Talent Management", description: "Human resource strategy", details: "Strategies for attracting, developing, and retaining top talent." }
                        ]
                    }
                ]
            },
            {
                name: "Digital Transformation",
                description: "Technology-driven business evolution",
                details: "Integration of digital technology into all areas of business to improve operations and customer value.",
                children: [
                    {
                        name: "Process Automation",
                        description: "Automating business processes",
                        details: "Using technology to automate repetitive tasks and improve efficiency.",
                        children: [
                            { name: "Workflow Optimization", description: "Streamlining operations", details: "Improving business processes for maximum efficiency and effectiveness." },
                            { name: "AI Integration", description: "Artificial intelligence adoption", details: "Incorporating AI technologies to enhance business capabilities." }
                        ]
                    },
                    {
                        name: "Data Analytics",
                        description: "Data-driven decision making",
                        details: "Using data analysis to inform strategic decisions and improve performance.",
                        children: [
                            { name: "Business Intelligence", description: "Data analysis tools", details: "Technologies and strategies for analyzing business information." },
                            { name: "Predictive Analytics", description: "Forecasting future trends", details: "Using statistical algorithms to predict future outcomes based on historical data." }
                        ]
                    }
                ]
            }
        ]
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = mindmapData;
}
