import React, { useEffect, useRef, useState } from 'react';

const NetworkBackground = ({ 
  nodeCount = 60,
  colorScheme = 'default',
  maxConnections = 5,
  interactive = true,
  speed = 1.5, // Increased default speed (was 1.0 implicitly)
}) => {
  const canvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  
  // Detect mobile and performance at component mount
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                    window.innerWidth < 768 || 
                    window.matchMedia('(hover: none)').matches;
      setIsMobile(mobile);
      
      // Check for low performance device
      const lowPerformance = mobile && (
        navigator.deviceMemory < 4 || // Low memory (if available)
        navigator.hardwareConcurrency < 4 || // Few CPU cores (if available) 
        window.screen.width * window.screen.height < 1000000 // Low resolution
      );
      setIsLowPerformance(lowPerformance);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let mousePosition = { x: null, y: null };
    let touchTimeout = null;
    let needsResize = true;
    let frameCount = 0;
    let lastTime = 0;
    
    // Adjust node count based on device capability
    const adjustedNodeCount = isMobile 
      ? (isLowPerformance ? Math.floor(nodeCount / 4) : Math.floor(nodeCount / 2)) 
      : nodeCount;
    
    // Color schemes
    const colorSchemes = {
      default: {
        background: '#0f172a', // dark blue
        nodeColor: '#6366f1', // indigo
        nodeGlow: '#818cf8', // lighter indigo
        lineColor: '#3b82f6', // blue
        accentColor: '#8b5cf6', // violet
        mouseGlow: '#d946ef' // fuchsia
      },
      cyberpunk: {
        background: '#09090b', // black
        nodeColor: '#facc15', // yellow
        nodeGlow: '#fbbf24', // amber
        lineColor: '#10b981', // emerald
        accentColor: '#ec4899', // pink
        mouseGlow: '#f43f5e' // rose
      },
      aurora: {
        background: '#042f2e', // dark teal
        nodeColor: '#2dd4bf', // teal
        nodeGlow: '#5eead4', // lighter teal
        lineColor: '#22d3ee', // cyan
        accentColor: '#34d399', // emerald
        mouseGlow: '#4ade80' // green
      },
      midnight: {
        background: '#020617', // very dark blue
        nodeColor: '#7c3aed', // violet
        nodeGlow: '#8b5cf6', // lighter violet
        lineColor: '#6366f1', // indigo
        accentColor: '#4f46e5', // darker indigo
        mouseGlow: '#c084fc' // purple
      }
    };
    
    const colors = colorSchemes[colorScheme] || colorSchemes.default;
    
    // Set up nodes with different complexity based on device performance
    class Node {
      constructor() {
        // Simpler nodes for mobile devices
        const mobileFactor = isMobile ? 0.6 : 1;
        const lowPerformanceFactor = isLowPerformance ? 0.7 : 1;
        const sizeFactor = mobileFactor * lowPerformanceFactor;
        
        // Apply speed factor to velocity
        const speedFactor = speed * (isMobile ? 0.8 : 1);
        
        this.radius = (Math.random() * 2 + 1) * sizeFactor;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        
        // Increase base velocity for faster movement
        this.vx = (Math.random() - 0.5) * 0.6 * speedFactor;
        this.vy = (Math.random() - 0.5) * 0.6 * speedFactor;
        
        this.connections = 0;
        this.lastConnections = []; // Track last connected nodes
        
        // Faster pulse effect 
        if (!isLowPerformance) {
          this.pulsePhase = Math.random() * Math.PI * 2;
          this.pulseSpeed = (Math.random() * 0.03 + 0.02) * speed; // Faster pulse
          this.pulseMagnitude = Math.random() * 0.5 + 0.5;
        } else {
          this.pulsePhase = 0;
          this.pulseSpeed = 0;
          this.pulseMagnitude = 0;
        }
        
        // Direction change intervals
        this.directionChangeCounter = Math.random() * 100 + 50;
        this.directionChangeRate = (Math.random() * 0.01 + 0.005) * speed;
        
        // Random color selection between node and accent color
        this.color = Math.random() > 0.8 ? colors.accentColor : colors.nodeColor;
        this.glow = Math.random() > 0.8 ? colors.mouseGlow : colors.nodeGlow;
      }
      
      update(deltaTime) {
        // Add pulse effect (only if not low performance)
        let pulse = 1;
        if (!isLowPerformance) {
          this.pulsePhase += this.pulseSpeed * deltaTime;
          pulse = Math.sin(this.pulsePhase) * this.pulseMagnitude + 1;
        }
        
        // Random direction changes
        this.directionChangeCounter -= this.directionChangeRate * deltaTime * 60;
        if (this.directionChangeCounter <= 0) {
          // More dramatic direction change
          this.vx = (Math.random() - 0.5) * 0.6 * speed;
          this.vy = (Math.random() - 0.5) * 0.6 * speed;
          this.directionChangeCounter = Math.random() * 100 + 50;
        }
        
        // Move the node (scaled by deltaTime)
        this.x += this.vx * deltaTime * 60;
        this.y += this.vy * deltaTime * 60;
        
        // Bounce off edges with a bit of randomness for more natural movement
        if (this.x < 0 || this.x > canvas.width) {
          this.vx *= -1;
          // Add slight randomness to bounce
          this.vx += (Math.random() - 0.5) * 0.1 * speed;
          this.vy += (Math.random() - 0.5) * 0.1 * speed;
        }
        if (this.y < 0 || this.y > canvas.height) {
          this.vy *= -1;
          // Add slight randomness to bounce
          this.vx += (Math.random() - 0.5) * 0.1 * speed;
          this.vy += (Math.random() - 0.5) * 0.1 * speed;
        }
        
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Add glow effect (only if not low performance)
        if (!isLowPerformance) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = this.glow;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
        
        // Reset connections counter for next frame
        this.connections = 0;
        this.lastConnections = [];
      }
      
      // Calculate distance to another node or point
      distanceTo(point) {
        const dx = this.x - point.x;
        const dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
      }
    }
    
    // Create nodes
    let nodes = [];
    
    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < adjustedNodeCount; i++) {
        nodes.push(new Node());
      }
    };
    
    // Handle resize with devicePixelRatio adjustment for mobile
    const handleResize = () => {
      needsResize = true;
    };
    
    // Mouse and touch handlers
    const updateMousePosition = (clientX, clientY) => {
      if (!interactive) return;
      
      const rect = canvas.getBoundingClientRect();
      mousePosition = {
        x: clientX - rect.left,
        y: clientY - rect.top
      };
      
      // Auto-clear mouse position after brief delay on touch devices
      if (isMobile) {
        if (touchTimeout) clearTimeout(touchTimeout);
        touchTimeout = setTimeout(() => {
          mousePosition = { x: null, y: null };
        }, 1500);
      }
    };
    
    const handleMouseMove = (e) => {
      updateMousePosition(e.clientX, e.clientY);
    };
    
    const handleTouchMove = (e) => {
      if (!interactive || e.touches.length === 0) return;
      updateMousePosition(e.touches[0].clientX, e.touches[0].clientY);
    };
    
    const handleMouseLeave = () => {
      mousePosition = { x: null, y: null };
    };
    
    // Add event listeners with passive option for better mobile performance
    window.addEventListener('resize', handleResize);
    
    // Use different event handlers based on device type
    if (isMobile) {
      canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
      canvas.addEventListener('touchend', handleMouseLeave);
    } else {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Animation loop with frame skipping for mobile
    const animate = (timestamp) => {
      // Calculate delta time for smoother animation
      const deltaTime = (timestamp - lastTime) / 1000; // seconds
      lastTime = timestamp;
      
      // Skip first frame or huge deltas
      if (deltaTime > 0.2) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      // Handle resize if needed
      if (needsResize) {
        // Use appropriate scaling for mobile
        const dpr = isMobile ? 1 : (window.devicePixelRatio || 1);
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
        
        if (!isMobile) {
          ctx.scale(dpr, dpr);
        }
        
        needsResize = false;
        initNodes();
      }
      
      // Skip frames on low performance devices
      frameCount++;
      if (isLowPerformance && frameCount % 3 !== 0) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      
      // Clear canvas
      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw mouse influence area if mouse is active and not low performance
      if (mousePosition.x !== null && interactive && !isLowPerformance) {
        const gradient = ctx.createRadialGradient(
          mousePosition.x, mousePosition.y, 0,
          mousePosition.x, mousePosition.y, 150
        );
        gradient.addColorStop(0, `${colors.mouseGlow}30`); // 30 is hex for 19% opacity
        gradient.addColorStop(1, `${colors.mouseGlow}00`); // 00 is hex for 0% opacity
        
        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Update nodes and connect them
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Mouse attraction/repulsion - stronger effect for more dynamism
        if (mousePosition.x !== null && interactive) {
          const dx = mousePosition.x - node.x;
          const dy = mousePosition.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Reduce influence distance on mobile
          const influenceRange = isMobile ? 100 : 150;
          
          if (distance < influenceRange) {
            // Create stronger attraction effect
            const force = (influenceRange - distance) / (isMobile ? 15000 : 10000) * speed; 
            node.vx += dx * force * deltaTime * 60;
            node.vy += dy * force * deltaTime * 60;
            
            // Speed limiting
            const speedLimit = speed * (isMobile ? 1.5 : 2.5);
            const nodeSpeed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
            if (nodeSpeed > speedLimit) {
              node.vx = (node.vx / nodeSpeed) * speedLimit;
              node.vy = (node.vy / nodeSpeed) * speedLimit;
            }
          }
        }
        
        // Update and draw the node
        node.update(deltaTime);
        
        // Find connections (with mobile optimizations)
        // On mobile, reduce number of connections and connection distance
        const actualMaxConnections = isMobile ? (isLowPerformance ? 2 : 3) : maxConnections;
        const maxDistance = isMobile ? (isLowPerformance ? 80 : 120) : 150;
        
        for (let j = i + 1; j < nodes.length; j++) {
          if (node.connections >= actualMaxConnections) break;
          
          const otherNode = nodes[j];
          if (otherNode.connections >= actualMaxConnections) continue;
          
          const distance = node.distanceTo(otherNode);
          
          if (distance < maxDistance) {
            // Set line style based on distance
            const opacity = Math.max(0, (1 - distance / maxDistance)).toFixed(2);
            const width = Math.max(0.5, 2 * (1 - distance / maxDistance));
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            ctx.strokeStyle = `${colors.lineColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`;
            ctx.lineWidth = isMobile ? width * 0.7 : width; // Thinner lines on mobile
            ctx.stroke();
            
            // Add glow to lines (only if not low performance)
            if (!isLowPerformance) {
              ctx.shadowBlur = 5;
              ctx.shadowColor = colors.lineColor;
              ctx.stroke();
              ctx.shadowBlur = 0;
            }
            
            // Count the connection
            node.connections++;
            otherNode.connections++;
            
            // Store connected nodes
            node.lastConnections.push(j);
            otherNode.lastConnections.push(i);
          }
        }
      }
      
      // Continue animation
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Initialize and start
    handleResize();
    animationFrameId = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      
      if (isMobile) {
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleMouseLeave);
      } else {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
      
      if (touchTimeout) {
        clearTimeout(touchTimeout);
      }
    };
  }, [nodeCount, colorScheme, maxConnections, interactive, isMobile, isLowPerformance, speed]);
  
  // Fallback for extremely low performance devices
  if (isLowPerformance && isMobile) {
    const getGradientByScheme = () => {
      switch (colorScheme) {
        case 'cyberpunk':
          return 'from-yellow-500/10 via-emerald-500/10 to-pink-500/10';
        case 'aurora':
          return 'from-teal-500/10 via-cyan-500/10 to-green-500/10';
        case 'midnight':
          return 'from-violet-900/15 via-indigo-800/15 to-purple-800/15';
        default:
          return 'from-indigo-500/10 via-blue-500/10 to-violet-500/10';
      }
    };
    
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br ${getGradientByScheme()}`}
        style={{
          backgroundSize: '400% 400%',
          animation: 'gradientBackground 15s ease infinite'
        }}
      />
    );
  }
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  );
};

export default NetworkBackground;