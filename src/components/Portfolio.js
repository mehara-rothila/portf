// Portfolio.js
import React, { useState } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ParticleBackground from './ParticleBackground';
import { useTheme } from '../ThemeContext';

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { darkMode } = useTheme();

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

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode 
        ? 'bg-gradient-to-b from-[#2D1B69] to-black text-white' 
        : 'bg-gradient-to-b from-white to-gray-100 text-gray-900'
    }`}>
      <ThemeToggle />
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full backdrop-blur-md z-50 ${
        darkMode ? 'bg-black/50' : 'bg-white/50'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              {/* Logo if needed */}
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`${
                    activeSection === item.section
                      ? darkMode 
                        ? 'text-[#FF008C] border-b-2 border-[#FF008C] neon-text'
                        : 'text-[#FF008C] border-b-2 border-[#FF008C]'
                      : darkMode
                        ? 'text-white hover:text-[#00F0FF] hover:neon-blue-text'
                        : 'text-gray-900 hover:text-[#00F0FF]'
                  } transition-all duration-200 cyberpunk-text py-1 text-sm md:text-base`}
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
                className={`${
                  darkMode ? 'text-white hover:text-[#FF008C]' : 'text-gray-900 hover:text-[#FF008C]'
                } transition-colors duration-200 p-2`}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className={`md:hidden backdrop-blur-md animate-fade-in ${
            darkMode ? 'bg-black/90' : 'bg-white/90'
          }`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    activeSection === item.section
                      ? darkMode
                        ? 'text-[#FF008C] bg-[#FF008C]/10'
                        : 'text-[#FF008C] bg-[#FF008C]/10'
                      : darkMode
                        ? 'text-white hover:text-[#FF008C] hover:bg-[#FF008C]/10'
                        : 'text-gray-900 hover:text-[#FF008C] hover:bg-[#FF008C]/10'
                  }`}
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
      {/* Updated Hero Section */}
<section id="home" className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 overflow-hidden">
  <ParticleBackground />
  <div className="max-w-7xl mx-auto text-center relative z-10">
    {/* Name with improved mobile responsiveness */}
    <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold cyberpunk-text mb-4 sm:mb-6 px-2 ${
      darkMode ? 'animate-cyber-glow' : ''
    }`}>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
        Mehara Rothila
      </span>
      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer mt-2">
        Ranawaka
      </span>
    </h1>

    {/* Role/Title with improved mobile responsiveness */}
    <p className={`text-base sm:text-lg md:text-2xl cyberpunk-text mb-4 sm:mb-8 animate-float px-2 ${
      darkMode ? 'text-[#FF008C]/90' : 'text-[#FF008C]'
    }`} 
       style={{ animationDelay: '0.2s' }}>
      Information Technology & 
      <br className="sm:hidden" /> 
      Management Undergraduate
    </p>

    {/* University with improved mobile responsiveness */}
    <p className={`text-sm sm:text-base md:text-lg cyberpunk-text mb-8 sm:mb-12 animate-float ${
      darkMode ? 'text-[#00F0FF]/80' : 'text-[#00F0FF]'
    }`} 
       style={{ animationDelay: '0.4s' }}>
      University of Moratuwa
    </p>

    {/* Social Links with improved mobile responsiveness */}
    <div className="flex justify-center space-x-4 sm:space-x-6 animate-float px-2" 
         style={{ animationDelay: '0.6s' }}>
      <a href="https://github.com/mehara-rothila" 
         target="_blank"
         rel="noopener noreferrer"
         className={`transform hover:scale-110 transition-all duration-200 p-2 ${
           darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
         }`}>
        <Github size={20} className="sm:w-6 sm:h-6" />
      </a>
      <a href="https://linkedin.com/in/mehara-rothila-6956a2255" 
         target="_blank"
         rel="noopener noreferrer"
         className={`transform hover:scale-110 transition-all duration-200 p-2 ${
           darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
         }`}>
        <Linkedin size={20} className="sm:w-6 sm:h-6" />
      </a>
      <a href="mailto:rothilamehara22@gmail.com" 
         className={`transform hover:scale-110 transition-all duration-200 p-2 ${
           darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
         }`}>
        <Mail size={20} className="sm:w-6 sm:h-6" />
      </a>
    </div>

    {/* Scroll indicator */}
    <div className="mt-8 sm:mt-12 animate-bounce-slow">
      <ChevronDown size={28} className={`mx-auto ${
        darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'
      }`} />
    </div>
  </div>
</section>{/* About Section */}
<section id="about" className="cyberpunk-section py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 cyberpunk-text">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
        About Me
      </span>
    </h2>

    <div className={`max-w-3xl mx-auto cyberpunk-card p-6 md:p-8 rounded-xl transform hover:scale-105 
      transition-all duration-300 ${
        darkMode ? 'bg-black/30' : 'bg-white/90'
      }`}>
      <p className={`text-base md:text-lg leading-relaxed ${
        darkMode ? 'text-white/90' : 'text-gray-800'
      }`}>
        I am an undergraduate student pursuing a BSc (Hons) in Information Technology and Management 
        at the University of Moratuwa. Passionate about technology and its application in solving 
        real-world problems, I am constantly learning and expanding my skill set in various areas 
        of software development and IT management.
      </p>
    </div>
  </div>
</section>{/* Contact Section with improved mobile responsiveness */}
<section id="contact" className="cyberpunk-section py-16 md:py-20 relative overflow-hidden">
  <ParticleBackground />
  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 cyberpunk-text">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
        Get In Touch
      </span>
    </h2>
    <div className="max-w-xl mx-auto">
      <div className={`cyberpunk-card p-6 md:p-8 rounded-xl transform hover:-translate-y-2 
        transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
        <div className="space-y-6">
          {/* Email contact with improved mobile display */}
          <div className="flex items-center space-x-3 md:space-x-4 group">
            <Mail className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 ${
              darkMode 
                ? 'text-[#FF008C] group-hover:text-[#00F0FF]'
                : 'text-[#FF008C] group-hover:text-[#00F0FF]'
            } transition-colors duration-200`} />
            <a href="mailto:rothilamehara22@gmail.com" 
               className={`transition-colors duration-200 cyberpunk-text text-sm md:text-base break-all ${
                 darkMode 
                   ? 'text-white/80 hover:text-[#00F0FF]'
                   : 'text-gray-800 hover:text-[#00F0FF]'
               }`}>
              rothilamehara22@gmail.com
            </a>
          </div>

          {/* LinkedIn contact */}
          <div className="flex items-center space-x-3 md:space-x-4 group">
            <Linkedin className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 ${
              darkMode 
                ? 'text-[#FF008C] group-hover:text-[#00F0FF]'
                : 'text-[#FF008C] group-hover:text-[#00F0FF]'
            } transition-colors duration-200`} />
            <a href="https://linkedin.com/in/mehara-rothila-6956a2255" 
               target="_blank"
               rel="noopener noreferrer"
               className={`transition-colors duration-200 cyberpunk-text text-sm md:text-base ${
                 darkMode 
                   ? 'text-white/80 hover:text-[#00F0FF]'
                   : 'text-gray-800 hover:text-[#00F0FF]'
               }`}>
              LinkedIn Profile
            </a>
          </div>

          {/* GitHub contact */}
          <div className="flex items-center space-x-3 md:space-x-4 group">
            <Github className={`flex-shrink-0 w-5 h-5 md:w-6 md:h-6 ${
              darkMode 
                ? 'text-[#FF008C] group-hover:text-[#00F0FF]'
                : 'text-[#FF008C] group-hover:text-[#00F0FF]'
            } transition-colors duration-200`} />
            <a href="https://github.com/mehara-rothila" 
               target="_blank"
               rel="noopener noreferrer"
               className={`transition-colors duration-200 cyberpunk-text text-sm md:text-base ${
                 darkMode 
                   ? 'text-white/80 hover:text-[#00F0FF]'
                   : 'text-gray-800 hover:text-[#00F0FF]'
               }`}>
              GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>{/* Skills Section */}
<section id="skills" className="cyberpunk-section py-16 md:py-20 relative overflow-hidden">
  <ParticleBackground />
  <div className="max-w-7xl mx-auto px-4 relative z-10">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 cyberpunk-text">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
        Skills
      </span>
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
      {skills.map((skillGroup) => (
        <div key={skillGroup.category} 
          className={`cyberpunk-card p-5 md:p-6 rounded-xl transform hover:-translate-y-2 
            transition-all duration-300 ${
              darkMode ? 'bg-black/30' : 'bg-white/90'
            }`}>
          <h3 className="text-lg md:text-xl cyberpunk-text text-[#FF008C] mb-4">
            {skillGroup.category}
          </h3>
          <ul className="space-y-2">
            {skillGroup.items.map((skill) => (
              <li key={skill} 
                  className={`text-sm md:text-base transition-colors duration-200 ${
                    darkMode 
                      ? 'text-white/80 hover:text-[#00F0FF]'
                      : 'text-gray-800 hover:text-[#00F0FF]'
                  }`}>
                <span className="text-[#FF008C] mr-2">▸</span> {skill}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
</section>



{/* Projects Section */}
<section id="projects" className="cyberpunk-section py-16 md:py-20">
 <div className="max-w-7xl mx-auto px-4">
   <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 cyberpunk-text">
     <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF008C] to-[#00F0FF] animate-text-shimmer">
       Projects
     </span>
   </h2>
   <div className="grid grid-cols-1 gap-8">
     {/* Project 1 - Quiz App */}
     <div className={`cyberpunk-card p-6 rounded-xl transform hover:-translate-y-2 
       transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
         <h3 className="text-xl md:text-2xl cyberpunk-text text-[#FF008C] mb-2 sm:mb-0">
           Quiz App
         </h3>
         <span className={`text-sm cyberpunk-text ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
           Sep 2024 - Oct 2024
         </span>
       </div>
       <p className={`text-sm md:text-base mb-6 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
         A dynamic, interactive platform that tests users' knowledge across multiple programming 
         languages such as JavaScript, Python, React, SQL, C, and Java.
       </p>
       <div className="flex flex-wrap gap-4">
         <a href="https://github.com/mehara-rothila/Quiz-App"
           target="_blank"
           rel="noopener noreferrer"
           className={`inline-flex items-center text-sm transition-colors duration-200 cyberpunk-text ${
             darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
           }`}>
           <Github size={16} className="mr-1" /> View Code
         </a>
         <a href="https://mrr-quiz.netlify.app/"
           target="_blank"
           rel="noopener noreferrer"
           className={`inline-flex items-center text-sm transition-colors duration-200 cyberpunk-text ${
             darkMode ? 'text-[#00F0FF] hover:text-[#FF008C]' : 'text-[#00F0FF] hover:text-[#FF008C]'
           }`}>
           <ExternalLink size={16} className="mr-1" /> Live Demo
         </a>
       </div>
     </div>

     {/* Project 2 - Portfolio */}
     <div className={`cyberpunk-card p-6 rounded-xl transform hover:-translate-y-2 
       transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
         <h3 className="text-xl md:text-2xl cyberpunk-text text-[#FF008C] mb-2 sm:mb-0">
           Portfolio Website
         </h3>
         <span className={`text-sm cyberpunk-text ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
           Oct 2024
         </span>
       </div>
       <p className={`text-sm md:text-base mb-6 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
         A cyberpunk-themed personal portfolio website built with React and Tailwind CSS, 
         featuring custom animations, theme switching, and responsive design.
       </p>
       <div className="flex flex-wrap gap-4">
         <a href="https://github.com/mehara-rothila/portfolio"
           target="_blank"
           rel="noopener noreferrer"
           className={`inline-flex items-center text-sm transition-colors duration-200 cyberpunk-text ${
             darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
           }`}>
           <Github size={16} className="mr-1" /> View Code
         </a>
         <a href="https://portf-cyber.netlify.app/"
           target="_blank"
           rel="noopener noreferrer"
           className={`inline-flex items-center text-sm transition-colors duration-200 cyberpunk-text ${
             darkMode ? 'text-[#00F0FF] hover:text-[#FF008C]' : 'text-[#00F0FF] hover:text-[#FF008C]'
           }`}>
           <ExternalLink size={16} className="mr-1" /> Live Demo
         </a>
       </div>
     </div>
 {/* Project 3 - UNIVOTE */}
 <div className={`cyberpunk-card p-6 rounded-xl transform hover:-translate-y-2 
       transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
         <h3 className="text-xl md:text-2xl cyberpunk-text text-[#FF008C] mb-2 sm:mb-0">
           UNIVOTE
         </h3>
         <span className={`text-sm cyberpunk-text ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
           Jul 2024 - Oct 2024
         </span>
       </div>

       <p className={`text-sm md:text-base mb-6 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
         A secure and inclusive Electronic Voting System designed for all, including individuals with disabilities. 
         Features biometric authentication, real-time monitoring, and innovative accessibility options.
       </p>

      {/* Images - Adjusted to show full images */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
 <div className="relative group w-full">
   <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF008C] to-[#00F0FF] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
   <div className="relative w-full rounded-lg border border-[#FF008C]/20 overflow-hidden bg-black/20 p-4">
     <img 
       src={require('../Images/univote-enclosure-side.jpg')} 
       alt="UNIVOTE Enclosure" 
       className="w-auto h-auto max-w-full max-h-[250px] mx-auto hover:scale-95 transition-transform duration-300"
     />
   </div>
 </div>
 <div className="relative group w-full">
   <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF008C] to-[#00F0FF] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
   <div className="relative w-full rounded-lg border border-[#FF008C]/20 overflow-hidden bg-black/20 p-4">
     <img 
       src={require('../Images/univote-system-main.jpg')} 
       alt="UNIVOTE System" 
       className="w-auto h-auto max-w-full max-h-[250px] mx-auto hover:scale-95 transition-transform duration-300"
     />
   </div>
 </div>
</div>

       <div className="mb-6">
         <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
           Key Features
         </h4>
         <ul className="space-y-2">
           {[
             'Secure admin authentication & QR code scanning',
             'Facial recognition & fingerprint verification',
             'Real-time clock management with LCD display',
             'Special puff method for voters with paralysis',
             'Dual-mode operation (Automatic/Manual)'
           ].map((feature) => (
             <li key={feature} className={`text-sm flex items-center ${
               darkMode ? 'text-white/80' : 'text-gray-700'
             }`}>
               <span className="text-[#FF008C] mr-2">▸</span> {feature}
             </li>
           ))}
         </ul>
       </div>

       <div className="flex gap-4">
         <a href="https://github.com/mehara-rothila/UNIVOTE"
           target="_blank"
           rel="noopener noreferrer"
           className={`inline-flex items-center text-sm transition-colors duration-200 cyberpunk-text ${
             darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
           }`}>
           <Github size={16} className="mr-1" /> View Code
         </a>
       </div>
     </div>

     {/* Project 4 - Comic Portal */}
     <div className={`cyberpunk-card p-6 rounded-xl transform hover:-translate-y-2 
       transition-all duration-300 ${darkMode ? 'bg-black/30' : 'bg-white/90'}`}>
       <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
         <h3 className="text-xl md:text-2xl cyberpunk-text text-[#FF008C] mb-2 sm:mb-0">
           Comic Portal [In Development]
         </h3>
         <span className={`text-sm cyberpunk-text ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
           Nov 2024 - Present
         </span>
       </div>

       <p className={`text-sm md:text-base mb-6 ${darkMode ? 'text-white/80' : 'text-gray-700'}`}>
         Currently developing a comprehensive web-based comic management platform that features role-based
         authentication, CRUD operations, and a dynamic user interface.
       </p>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
         <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF008C] to-[#00F0FF] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
           <div className="relative w-full h-48 rounded-lg border border-[#FF008C]/20 overflow-hidden bg-black/20">
             <img src={require('../Images/comic-portal-admin-dashboard.png')} alt="Comic Portal Dashboard" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
           </div>
         </div>
         <div className="relative group">
           <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF008C] to-[#00F0FF] rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
           <div className="relative w-full h-48 rounded-lg border border-[#FF008C]/20 overflow-hidden bg-black/20">
             <img src={require('../Images/comic-portal-featured-carousel.png')} alt="Comic Portal Interface" 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"/>
           </div>
         </div>
       </div>

       <div className="grid md:grid-cols-2 gap-6 mb-6">
         <div>
           <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
             Technical Stack
           </h4>
           <ul className="space-y-2">
             {[
               'Vue.js 3 with Vite',
               'Laravel Sanctum for authentication',
               'RESTful API architecture',
               'MySQL Database',
               'Advanced middleware'
             ].map((tech) => (
               <li key={tech} className={`text-sm flex items-center ${
                 darkMode ? 'text-white/80' : 'text-gray-700'
               }`}>
                 <span className="text-[#FF008C] mr-2">▸</span> {tech}
               </li>
             ))}
           </ul>
         </div>

         <div>
           <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
             Key Features
           </h4>
           <ul className="space-y-2">
             {[
               'Role-based authentication system',
               'Dynamic featured content management',
               'Real-time admin statistics dashboard',
               'Category-based comic organization',
               'Interactive comic browsing interface'
             ].map((feature) => (
               <li key={feature} className={`text-sm flex items-center ${
                 darkMode ? 'text-white/80' : 'text-gray-700'
               }`}>
                 <span className="text-[#FF008C] mr-2">▸</span> {feature}
               </li>
             ))}
           </ul>
         </div>
       </div>

       <div className="mb-6">
         <h4 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-[#00F0FF]' : 'text-[#00F0FF]'}`}>
           Ongoing Development
         </h4>
         <ul className="space-y-2">
           {[
             'Enhanced search and filtering features',
             'User preferences system',
             'Performance optimization',
             'Mobile responsiveness',
             'Content recommendation engine'
           ].map((item) => (
             <li key={item} className={`text-sm flex items-center ${
               darkMode ? 'text-white/80' : 'text-gray-700'
             }`}>
               <span className="text-[#FF008C] mr-2">▸</span> {item}
             </li>
           ))}
         </ul>
       </div>

       <div className="flex gap-4">
         <a href="https://github.com/mehara-rothila/comic-portal"
           target="_blank"
           rel="noopener noreferrer"
           className={`inline-flex items-center text-sm transition-colors duration-200 cyberpunk-text ${
             darkMode ? 'text-[#FF008C] hover:text-[#00F0FF]' : 'text-[#FF008C] hover:text-[#00F0FF]'
           }`}>
           <Github size={16} className="mr-1" /> View Code
         </a>
       </div>
     </div>
   </div>
 </div>
</section>

{/* Footer */}
<footer className={`py-6 md:py-8 backdrop-blur-md ${
  darkMode ? 'bg-black/50' : 'bg-white/50'
}`}>
  <div className="max-w-7xl mx-auto px-4 text-center">
    <p className={`text-sm md:text-base cyberpunk-text ${
      darkMode ? 'text-white/60' : 'text-gray-600'
    }`}>
      © {new Date().getFullYear()} <span className="text-[#FF008C]">Mehara Rothila Ranawaka</span>.
      All rights reserved.
    </p>
  </div>
</footer>

{/* Closing tags for the main component */}
    </div>
  );
};

export default Portfolio;
