
// src/components/Portfolio.js
import React, { useState, useEffect } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ParticleBackground from './ParticleBackground';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);

  // Navigation data
  const navigation = [
    { name: 'Home', href: '#home', section: 'home' },
    { name: 'About', href: '#about', section: 'about' },
    { name: 'Skills', href: '#skills', section: 'skills' },
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
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm dark:shadow-gray-800 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo removed */}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    activeSection === item.section
                      ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-600 dark:border-primary-400'
                      : 'text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-b-2 hover:border-primary-600 dark:hover:border-primary-400'
                  } transition-all duration-200 font-medium py-1`}
                  onClick={() => setActiveSection(item.section)}
                >
                  {item.name}
                </a>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-md animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors duration-200"
                  onClick={() => {
                    setIsMenuOpen(false);
                    setActiveSection(item.section);
                  }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

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
              <div key={skillGroup.category} 
                className="backdrop-blur-md bg-white/90 dark:bg-gray-800/90 p-6 rounded-xl shadow-lg dark:shadow-gray-800 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-4 text-primary-600 dark:text-primary-400">
                  {skillGroup.category}
                </h3>
                <ul className="space-y-2">
                  {skillGroup.items.map((skill) => (
                    <li key={skill} 
                        className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                      • {skill}
                    </li>
                  ))}
                </ul>
              </div>
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
      {/* Project 1 - Quiz App */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary-500">
            Project 1 - Quiz App
          </h3>
          <span className="text-gray-500 dark:text-gray-400">
            Sep 2024 - Oct 2024
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A dynamic, interactive platform that tests users' knowledge across multiple programming languages such as JavaScript, Python, React, SQL, C, and Java.
        </p>

        <div className="flex space-x-6">
          <a
            href="https://github.com/mehara-rothila/Quiz-App"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200"
          >
            <Github className="mr-2" size={20} /> View Code
          </a>
          <a
            href="https://mrr-quiz.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200"
          >
            <ExternalLink className="mr-2" size={20} /> Live Demo
          </a>
        </div>
      </div>

      {/* Project 2 - Portfolio Website */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary-500">
            Project 2 - Portfolio Website
          </h3>
          <span className="text-gray-500 dark:text-gray-400">
            Oct 2024
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A cyberpunk-themed personal portfolio website built with React and Tailwind CSS, featuring custom animations, theme switching, and responsive design.
        </p>

        <div className="flex space-x-6">
          <a
            href="https://github.com/mehara-rothila/port-cyber"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200"
          >
            <Github className="mr-2" size={20} /> View Code
          </a>
          <a
            href="https://portf-cyber.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200"
          >
            <ExternalLink className="mr-2" size={20} /> Live Demo
          </a>
        </div>
      </div>

      {/* Project 3 - UNIVOTE */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary-500">
            Project 3 - UNIVOTE
          </h3>
          <span className="text-gray-500 dark:text-gray-400">
            Jul 2024 - Oct 2024
          </span>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          A secure and inclusive Electronic Voting System designed for all, including individuals with disabilities. Features biometric authentication, real-time monitoring, and innovative accessibility options.
        </p>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Images Column */}
          <div className="md:w-1/2">
            <div className="flex flex-col gap-6">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative w-full h-48 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                  <img
                    src={require('../Images/univote-system-main.jpg')}
                    alt="UNIVOTE System Main View"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative w-full h-48 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800">
                  <img
                    src={require('../Images/univote-enclosure-side.jpg')}
                    alt="UNIVOTE Enclosure Side View"
                    className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Features Column */}
          <div className="md:w-1/2">
            <h4 className="text-primary-500 mb-4">Key Features:</h4>
            <ul className="text-gray-600 dark:text-gray-300 space-y-3 mb-6">
              <li>• Secure admin authentication & QR code scanning</li>
              <li>• Facial recognition & fingerprint verification</li>
              <li>• Real-time clock management with LCD display</li>
              <li>• Special puff method for voters with paralysis</li>
              <li>• Dual-mode operation (Automatic/Manual)</li>
            </ul>
            
            <a
              href="https://github.com/mehara-rothila/UNIVOTE"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary-500 hover:text-primary-400 transition-colors duration-200 group"
            >
              <Github className="mr-2 group-hover:scale-110 transition-transform duration-200" size={20} />
              <span className="border-b border-primary-500 border-opacity-0 group-hover:border-opacity-100 transition-all duration-200">
                View Code
              </span>
            </a>
          </div>
        </div>

      
      </div>
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
                <div className="flex items-center space-x-4 group">
                  <Mail className="text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                  <a href="mailto:rothilamehara22@gmail.com" 
                     className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    rothilamehara22@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-4 group">
                  <Linkedin className="text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                  <a href="https://linkedin.com/in/mehara-rothila-6956a2255" 
                     className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    LinkedIn Profile
                  </a>
                </div>
                <div className="flex items-center space-x-4 group">
                  <Github className="text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200" />
                  <a href="https://github.com/mehara-rothila" 
                     className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200">
                    GitHub Profile
                  </a>
                </div>
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
