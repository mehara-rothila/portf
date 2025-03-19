import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ParticleBackground from './ParticleBackground';
import ProjectCard from './ProjectCard';
import SkillCard from './SkillCard';
import ContactItem from './ContactItem';
import Navigation from './Navigation';
import CertificationCard from './CertificationCard';
import AwardCard from './AwardCard';

// Import images directly
import univoteSystemMain from '../Images/univote-system-main.jpg';
import univoteEnclosureSide from '../Images/univote-enclosure-side.jpg';
import comicPortalDashboard from '../Images/Screenshot 2025-03-12 121034.png';
import comicPortalAdmin from '../Images/Screenshot 2025-03-12 121142.png';
import weGoJimDashboard from '../Images/Screenshot 2025-03-19 224031.png';
import weGoJimWorkout from '../Images/Screenshot 2025-03-19 224050.png';
import portfolioScreenshot from '../Images/Screenshot 2025-03-19 230047.png';
import fabricCertificate from '../Images/MeharaRanawaka_MS_FabricAnalytics_Cert_page-0001.jpg';
import iasslPoster from '../Images/Case study participation (1).pdf-30_page-0001.jpg';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  // Navigation data
  const navigation = [
    { name: 'Home', href: '#home', section: 'home' },
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Skills', href: '#skills', section: 'skills' },
    { name: 'Awards', href: '#awards', section: 'awards' },
    { name: 'Certifications', href: '#certifications', section: 'certifications' },
    { name: 'Projects', href: '#projects', section: 'projects' },
    { name: 'Contact', href: '#contact', section: 'contact' },
  ];

  // Skills data
  const skills = [
    {
      category: 'Programming',
      items: ['JavaScript', 'Python', 'Java', 'React.js', 'Node.js']
    },
    {
      category: 'Tools & Technologies',
      items: ['Git', 'Docker', 'AWS', 'MongoDB', 'SQL']
    },
    {
      category: 'Soft Skills',
      items: ['Problem Solving', 'Team Leadership', 'Communication', 'Project Management']
    }
  ];

  // Awards data
  const awards = [
    {
      id: 1,
      title: "Finalist! IASSL National Poster Competition",
      issuer: "IASSL (Institute of Applied Statistics Sri Lanka)",
      date: "December 2024",
      description: "Finalist in the IASSL National Poster Competition at the International Statistics Conference 2024. Our team, 'XForce,' developed a fraud detection model using an Explainable Boosting Machine (EBM) and SHAP values. This model accurately predicts fraudulent activities while providing transparent explanations for its decisions, enhancing interpretability and trust. Key skills demonstrated include data preprocessing, feature engineering, machine learning model development, and performance evaluation.",
      image: iasslPoster,
      demoUrl: "https://fraud-detect-xforce.netlify.app/"
    }
  ];

  // Certifications data
  const certifications = [
    {
      id: 1,
      title: "Microsoft Certified: Fabric Analytics Engineer Associate",
      issuer: "Microsoft",
      date: "March 2025",
      description: "Demonstrates a strong understanding of data analytics principles and practical skills in leveraging Microsoft Fabric. Experienced in building and managing data warehouses, lakehouses, and semantic models. Proven ability to prepare, enrich, and secure data for analysis, contributing to data-driven decision-making. Proficient in querying and analyzing data using SQL, KQL, and DAX.",
      image: fabricCertificate,
      credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/MeharaRothila-5036/D2E29134FC45690E?sharingId=F212EF1C880154AE"
    }
  ];



  // Projects data
  const projects = [
    {
      id: 1,
      title: "Portfolio Website",
      period: "Oct 2024",
      description: "A cyberpunk-themed personal portfolio website built with React and Tailwind CSS, featuring custom animations, theme switching, and responsive design.",
      features: [
        "Custom animated cursor with context-aware hover effects",
        "Dark/Light theme toggle with persistent preferences",
        "Interactive particle background with mouse interaction",
        "Responsive layout for all device sizes",
        "Custom animations and transition effects"
      ],
      images: [
        {
          src: portfolioScreenshot,
          alt: "Portfolio Website Screenshot"
        }
      ],
      githubUrl: "https://github.com/mehara-rothila/port-cyber",
      liveUrl: "https://portf-cyber.netlify.app/"
    },
    {
      id: 2,
      title: "UNIVOTE",
      period: "Jul 2024 - Oct 2024",
      description: "A secure and inclusive Electronic Voting System designed for all, including individuals with disabilities. Features biometric authentication, real-time monitoring, and innovative accessibility options.",
      features: [
        "Secure admin authentication & QR code scanning",
        "Facial recognition & fingerprint verification",
        "Real-time clock management with LCD display",
        "Special puff method for voters with paralysis",
        "Dual-mode operation (Automatic/Manual)"
      ],
      images: [
        {
          src: univoteSystemMain,
          alt: "UNIVOTE System Main View"
        },
        {
          src: univoteEnclosureSide,
          alt: "UNIVOTE Enclosure Side View"
        }
      ],
      githubUrl: "https://github.com/mehara-rothila/UNIVOTE"
    },
    {
      id: 3,
      title: "Comic Portal",
      period: "Nov 2024 - Feb 2025",
      description: "An immersive web application for comic enthusiasts to discover, purchase, and manage their digital comic collection. Built with Vue.js frontend and Laravel backend for a seamless user experience.",
      features: [
        "User authentication with role-based permissions",
        "Dynamic comic browsing with filtering and sorting options",
        "Admin dashboard for content management",
        "Secure API with Laravel Sanctum authentication",
        "Responsive design for optimal viewing on all devices"
      ],
      images: [
        {
          src: comicPortalDashboard,
          alt: "Comic Portal Dashboard"
        },
        {
          src: comicPortalAdmin,
          alt: "Comic Portal Admin Interface"
        }
      ],
      githubUrl: "https://github.com/mehara-rothila/comic-portal"
    },
    {
      id: 4,
      title: "WE GO JIM - Workout Tracking System",
      period: "Dec 2024 - Mar 2025",
      description: "A modern workout tracking application that helps users monitor their fitness journey, track workouts, and analyze their progress over time. Features include workout scheduling, exercise management, and detailed performance analytics.",
      features: [
        "User authentication with JWT and protected routes",
        "Comprehensive workout schedule management",
        "Exercise library with categorization and filtering",
        "Performance analytics with visual data representation",
        "Dark/Light theme with persistent user preferences"
      ],
      images: [
        {
          src: weGoJimDashboard,
          alt: "WE GO JIM Dashboard"
        },
        {
          src: weGoJimWorkout,
          alt: "WE GO JIM Workout Interface"
        }
      ],
      githubUrl: "https://github.com/mehara-rothila/we-go-jim"
    }
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Theme Toggle */}
      <ThemeToggle darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />

      {/* Navigation */}
      <Navigation 
        navigation={navigation} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6 animate-slide-up">
            Mehara Rothila Ranawaka
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 animate-slide-up"
             style={{ animationDelay: '0.2s' }}>
            Information Technology & Management Undergraduate
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 animate-slide-up"
             style={{ animationDelay: '0.4s' }}>
            University of Moratuwa
          </p>
          <div className="flex justify-center space-x-6 animate-slide-up"
               style={{ animationDelay: '0.6s' }}>
            <a href="https://github.com/mehara-rothila"
               className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transform hover:scale-110 transition-all duration-200">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com/in/mehara-rothila-6956a2255"
               className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transform hover:scale-110 transition-all duration-200">
              <Linkedin size={24} />
            </a>
            <a href="mailto:rothilamehara22@gmail.com"
               className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transform hover:scale-110 transition-all duration-200">
              <Mail size={24} />
            </a>
          </div>
          <div className="mt-12 animate-bounce-slow">
            <ChevronDown size={32} className="mx-auto text-primary-400 dark:text-primary-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            About Me
          </h2>

          <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-gray-800 p-8 transform hover:scale-105 transition-all duration-300">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              I am an undergraduate student pursuing a BSc (Hons) in Information Technology and Management
              at the University of Moratuwa. Passionate about technology and its application in solving
              real-world problems, I am constantly learning and expanding my skill set in various areas
              of software development and IT management.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Skills
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <SkillCard 
                key={skillGroup.category}
                category={skillGroup.category}
                items={skillGroup.items}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Honors & Awards
          </h2>
          <div className="grid gap-8">
            {awards.map(award => (
              <AwardCard 
                key={award.id}
                award={award}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Certifications
          </h2>
          <div className="grid gap-8">
            {certifications.map(certification => (
              <CertificationCard 
                key={certification.id}
                certification={certification}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Projects
          </h2>
          <div className="grid gap-8">
            {projects.map(project => (
              <ProjectCard 
                key={project.id}
                project={project}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative overflow-hidden">
        <ParticleBackground />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <div className="max-w-xl mx-auto">
            <div className="backdrop-blur-md bg-white/90 dark:bg-gray-800/90 p-8 rounded-xl shadow-lg dark:shadow-gray-800 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className="space-y-6">
                <ContactItem 
                  icon={<Mail />} 
                  text="rothilamehara22@gmail.com" 
                  href="mailto:rothilamehara22@gmail.com" 
                />
                <ContactItem 
                  icon={<Linkedin />} 
                  text="LinkedIn Profile" 
                  href="https://linkedin.com/in/mehara-rothila-6956a2255" 
                />
                <ContactItem 
                  icon={<Github />} 
                  text="GitHub Profile" 
                  href="https://github.com/mehara-rothila" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-white/50 dark:bg-gray-800/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Mehara Rothila Ranawaka. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;