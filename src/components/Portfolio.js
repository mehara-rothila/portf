// src/components/Portfolio.js - Complete version with performance mode toggle
import React, { useState, useEffect, lazy, Suspense, memo, useCallback } from 'react';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ContactItem from './ContactItem';
import Navigation from './Navigation';
import NeonPulseCursor from './DotCursor';

// Lazy load heavier components
const ParticleBackground = lazy(() => import('./ParticleBackground'));
const ProjectCard = lazy(() => import('./ProjectCard'));
const SkillCard = lazy(() => import('./SkillCard'));
const CertificationCard = lazy(() => import('./CertificationCard'));
const AwardCard = lazy(() => import('./AwardCard'));

// Import images only when needed using dynamic imports
const imageCache = {};
const loadImage = async (path) => {
  if (!imageCache[path]) {
    try {
      // Handle both direct imports and dynamic imports
      if (typeof path === 'string') {
        const module = await import(`../Images/${path}`);
        imageCache[path] = module.default;
      } else {
        // If it's already imported elsewhere
        imageCache[path] = path;
      }
    } catch (error) {
      console.error(`Failed to load image: ${path}`, error);
      imageCache[path] = '/placeholder.jpg'; // Fallback
    }
  }
  return imageCache[path];
};

// Preload critical images
setTimeout(() => {
  // Preload only the first couple of images
  loadImage('univote-system-main.jpg');
  loadImage('portfolioScreenshot.png');
}, 1000);

// Placeholder while lazy components are loading
const LoadingPlaceholder = () => (
  <div className="w-full h-40 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg"></div>
);

// Define data outside component to avoid recreation on each render
const NAVIGATION = [
  { name: 'Home', href: '#home', section: 'home' },
  { name: 'About', href: '#about', section: 'about' },
  { name: 'Skills', href: '#skills', section: 'skills' },
  { name: 'Awards', href: '#awards', section: 'awards' },
  { name: 'Certifications', href: '#certifications', section: 'certifications' },
  { name: 'Projects', href: '#projects', section: 'projects' },
  { name: 'Contact', href: '#contact', section: 'contact' },
];

const SKILLS = [
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

const AWARDS = [
  {
    id: 1,
    title: "Finalist - IASSL National Poster Competition",
    issuer: "IASSL (Institute of Applied Statistics Sri Lanka)",
    date: "December 2024",
    description: "Finalist in the IASSL National Poster Competition at the International Statistics Conference 2024. Our team, 'XForce,' developed a fraud detection model using an Explainable Boosting Machine (EBM) and SHAP values. This model accurately predicts fraudulent activities while providing transparent explanations for its decisions, enhancing interpretability and trust. Key skills demonstrated include data preprocessing, feature engineering, machine learning model development, and performance evaluation.",
    image: 'Case study participation (1).pdf-30_page-0001.jpg',
    demoUrl: "https://fraud-detect-xforce.netlify.app/"
  },
  {
    id: 2,
    title: "2nd Place - FIT CodeRush 2024",
    issuer: "INTECS, University of Moratuwa",
    date: "November 2024",
    description: "Secured 2nd place in CodeRush 2024, the annual intra-faculty hackathon organized by INTECS at the Faculty of Information Technology, University of Moratuwa. The competition featured intense coding sessions, innovative problem-solving, and technical demonstrations, bringing together talented developers from across the faculty. This achievement demonstrates strong coding skills, creative problem-solving abilities, and effective teamwork under time constraints.",
    image: 'coderush.jpg',
    demoUrl: ""
  },
  {
    id: 3,
    title: "Top 10 Finalist - SpiritX 2025",
    issuer: "MoraSpirit 360",
    date: "April 2025",
    description: "Selected among numerous teams to advance as a Top 10 finalist in SpiritX 2025, an inter-university development competition organized by MoraSpirit 360. Led Team Xforce through the intensive Stage 1 (Xcelerate) 36-hour hackathon, successfully developing two web-based solutions: 'SecureConnect' - a secure gateway login system, and 'Spirit11' - an inter-university fantasy cricket game. Currently competing in Stage 2 (ImagineX) to develop comprehensive solutions for real-world industry problems.",
    image: 'spiritx-logo.jpg',
    demoUrl: "https://lnkd.in/gj3ar9Te"
  },
  {
    id: 4,
    title: "Finalist - Data Crunch (CodeJam 2025)",
    issuer: "Department of Computer Science & Engineering (CSE), University of Moratuwa",
    date: "May 2025",
    description: "Selected as a finalist in the Data Crunch track of CodeJam 2025, a prestigious competition organized by the Department of Computer Science & Engineering at the University of Moratuwa as part of their 40th anniversary celebrations. As part of Team Xforce (Data_Crunch_079), developed sophisticated machine learning models for forecasting critical environmental variables to support agricultural planning in Harveston. The solution featured innovative approaches including cyclical temporal encoding, trigonometric decomposition for wind direction forecasting, and kingdom-specific calibration factors for rainfall prediction.",
    image: 'data-crunch.jpg',
    demoUrl: ""
  },
  {
    id: 5,
    title: "Finalist - CodeX (CodeJam 2025)",
    issuer: "Department of Computer Science & Engineering (CSE), University of Moratuwa",
    date: "May 2025",
    description: "Selected as a finalist in the CodeX track of CodeJam 2025, a prestigious competition organized by the Department of Computer Science & Engineering at the University of Moratuwa. Advanced through multiple challenging rounds including a 2-hour algorithmic coding challenge and a 6-hour open-source GitHub project contribution phase. Demonstrated strong technical abilities in data structures, algorithms, problem-solving, and collaborative development within a fast-paced environment.",
    image: 'codex.jpg',
    demoUrl: ""
  }
];

const CERTIFICATIONS = [
  {
    id: 1,
    title: "Microsoft Certified: Fabric Analytics Engineer Associate",
    issuer: "Microsoft",
    date: "March 2025",
    description: "Demonstrates a strong understanding of data analytics principles and practical skills in leveraging Microsoft Fabric. Experienced in building and managing data warehouses, lakehouses, and semantic models. Proven ability to prepare, enrich, and secure data for analysis, contributing to data-driven decision-making. Proficient in querying and analyzing data using SQL, KQL, and DAX.",
    image: 'MeharaRanawaka_MS_FabricAnalytics_Cert_page-0001.jpg',
    credentialUrl: "https://learn.microsoft.com/api/credentials/share/en-us/MeharaRothila-5036/D2E29134FC45690E?sharingId=F212EF1C880154AE"
  }
];

const PROJECTS = [
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
        src: 'Screenshot 2025-03-19 230047.png',
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
        src: 'univote-system-main.jpg',
        alt: "UNIVOTE System Main View"
      },
      {
        src: 'univote-enclosure-side.jpg',
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
        src: 'Screenshot 2025-03-12 121034.png',
        alt: "Comic Portal Dashboard"
      },
      {
        src: 'Screenshot 2025-03-12 121142.png',
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
        src: 'Screenshot 2025-03-19 224031.png',
        alt: "WE GO JIM Dashboard"
      },
      {
        src: 'Screenshot 2025-03-19 224050.png',
        alt: "WE GO JIM Workout Interface"
      }
    ],
    githubUrl: "https://github.com/mehara-rothila/we-go-jim"
  },
  {
    id: 5,
    title: "Harveston Climate Forecasting System",
    period: "May 2025",
    description: "A sophisticated weather prediction system developed for the Data Crunch competition of CodeJam 2025. The project focuses on accurate forecasting of environmental variables for agricultural planning and sustainability.",
    features: [
      "Advanced ensemble modeling for multiple weather variables",
      "Kingdom-specific calibration for localized predictions",
      "Innovative trigonometric decomposition for wind direction forecasting",
      "Cyclical temporal encoding for seasonal pattern recognition",
      "Interactive visualization dashboard for agricultural planning"
    ],
    images: [
      {
        src: 'harveston.jpg',
        alt: "Harveston Climate Forecasting System"
      }
    ],
    githubUrl: "https://github.com/mehara-rothila/Data_Crunch_079",
    liveUrl: ""
  }
];

// Memoized Section Component - updated with performanceMode prop
const Section = memo(({ id, title, children, includeParticles = false, performanceMode = false }) => (
  <section id={id} className={`py-20 ${includeParticles ? 'relative overflow-hidden' : ''}`}>
    {includeParticles && (
      <Suspense fallback={<div className="absolute inset-0 bg-gray-800/20 dark:bg-gray-900/20"></div>}>
        <ParticleBackground 
          nodeCount={performanceMode ? 15 : 35} 
          performanceMode={performanceMode} 
        />
      </Suspense>
    )}
    <div className="max-w-7xl mx-auto px-4 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
        {title}
      </h2>
      {children}
    </div>
  </section>
));

// Main Portfolio Component
const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [isScrolling, setIsScrolling] = useState(false);
  const [performanceMode, setPerformanceMode] = useState(false); // Added performance mode state

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);
  
  // Toggle performance mode
  const togglePerformanceMode = useCallback(() => {
    setPerformanceMode(prevMode => !prevMode);
    // Save preference to localStorage
    localStorage.setItem('performanceMode', String(!performanceMode));
  }, [performanceMode]);

  // Apply dark mode class
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  
  // Load performance mode from localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem('performanceMode');
    if (savedMode !== null) {
      setPerformanceMode(savedMode === 'true');
    } else {
      // Auto-enable performance mode on mobile or low-end devices
      const shouldUsePerformanceMode = 
        window.innerWidth < 768 || 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setPerformanceMode(shouldUsePerformanceMode);
    }
  }, []);

  // Memoize social links renderer
  const renderSocialLink = useCallback((href, Icon) => (
    <a href={href}
       className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transform hover:scale-110 transition-all duration-200">
      <Icon size={24} />
    </a>
  ), []);

  // Load images on demand with intersection observer
  useEffect(() => {
    // Skip on server-side
    if (typeof window === 'undefined') return;

    // Create observer for image loading
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // When section is visible
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          // Load relevant images based on section
          if (sectionId === 'projects') {
            PROJECTS.forEach(project => {
              if (project.images) {
                project.images.forEach(image => {
                  loadImage(image.src).then(img => {
                    setLoadedImages(prev => ({
                      ...prev,
                      [image.src]: img
                    }));
                  });
                });
              }
            });
          } else if (sectionId === 'certifications') {
            CERTIFICATIONS.forEach(cert => {
              loadImage(cert.image).then(img => {
                setLoadedImages(prev => ({
                  ...prev,
                  [cert.image]: img
                }));
              });
            });
          } else if (sectionId === 'awards') {
            AWARDS.forEach(award => {
              loadImage(award.image).then(img => {
                setLoadedImages(prev => ({
                  ...prev,
                  [award.image]: img
                }));
              });
            });
          }
          
          // Unobserve once loaded
          observer.unobserve(entry.target);
        }
      });
    }, { rootMargin: '200px 0px' });
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      observer.disconnect();
    };
  }, []);

  // Optimize scroll performance
  useEffect(() => {
    let scrollTimer;
    
    const handleScroll = () => {
      if (!isScrolling) {
        setIsScrolling(true);
      }
      
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimer);
    };
  }, [isScrolling]);

  // Get an image from loaded cache or display placeholder
  const getImage = (src) => loadedImages[src] || src;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Add the cursor component here */}
      <NeonPulseCursor />
      
      {/* Theme Toggle */}
      <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      {/* Navigation - with performance mode toggle */}
      <Navigation 
        navigation={NAVIGATION} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        performanceMode={performanceMode}
        togglePerformanceMode={togglePerformanceMode}
      />

      {/* Hero Section - with performance mode */}
      <section id="home" className="relative pt-32 pb-20 px-4 overflow-hidden">
        <Suspense fallback={<div className="absolute inset-0 bg-gray-800/20 dark:bg-gray-900/20"></div>}>
          <ParticleBackground 
            nodeCount={performanceMode ? 20 : 50} 
            performanceMode={performanceMode}
          />
        </Suspense>
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
            {renderSocialLink("https://github.com/mehara-rothila", Github)}
            {renderSocialLink("https://linkedin.com/in/mehara-rothila-6956a2255", Linkedin)}
            {renderSocialLink("mailto:rothilamehara22@gmail.com", Mail)}
          </div>
          <div className="mt-12 animate-bounce-slow">
            <ChevronDown size={32} className="mx-auto text-primary-400 dark:text-primary-500" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <Section id="about" title="About Me">
        <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-lg dark:shadow-gray-800 p-8 transform hover:scale-105 transition-all duration-300">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I am an undergraduate student pursuing a BSc (Hons) in Information Technology and Management
            at the University of Moratuwa. Passionate about technology and its application in solving
            real-world problems, I am constantly learning and expanding my skill set in various areas
            of software development and IT management.
          </p>
        </div>
      </Section>

      {/* Skills Section - with performance mode */}
      <Section id="skills" title="Skills" includeParticles={true} performanceMode={performanceMode}>
        <div className="grid md:grid-cols-3 gap-8">
          {SKILLS.map((skillGroup) => (
            <Suspense key={skillGroup.category} fallback={<LoadingPlaceholder />}>
              <SkillCard 
                category={skillGroup.category}
                items={skillGroup.items}
              />
            </Suspense>
          ))}
        </div>
      </Section>

      {/* Awards Section */}
      <Section id="awards" title="Honors & Awards">
        <div className="grid gap-8">
          {AWARDS.map(award => (
            <Suspense key={award.id} fallback={<LoadingPlaceholder />}>
              <AwardCard 
                key={award.id} 
                award={{
                  ...award,
                  image: getImage(award.image)
                }} 
              />
            </Suspense>
          ))}
        </div>
      </Section>

      {/* Certifications Section */}
      <Section id="certifications" title="Certifications">
        <div className="grid gap-8">
          {CERTIFICATIONS.map(certification => (
            <Suspense key={certification.id} fallback={<LoadingPlaceholder />}>
              <CertificationCard 
                key={certification.id} 
                certification={{
                  ...certification,
                  image: getImage(certification.image)
                }} 
              />
            </Suspense>
          ))}
        </div>
      </Section>

      {/* Projects Section */}
      <Section id="projects" title="Projects">
        <div className="grid gap-8">
          {PROJECTS.map(project => (
            <Suspense key={project.id} fallback={<LoadingPlaceholder />}>
              <ProjectCard 
                key={project.id} 
                project={{
                  ...project,
                  images: project.images ? project.images.map(img => ({
                    ...img,
                    src: getImage(img.src)
                  })) : null
                }} 
              />
            </Suspense>
          ))}
        </div>
      </Section>

      {/* Contact Section - with performance mode */}
      <Section id="contact" title="Get In Touch" includeParticles={true} performanceMode={performanceMode}>
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
      </Section>

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

// For debugging and memoization
Section.displayName = 'Section';
Portfolio.displayName = 'Portfolio';

export default Portfolio;