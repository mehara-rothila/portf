// src/components/DotCursor.js
import React, { useEffect, useState, useCallback } from 'react';

const DotCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trailElements, setTrailElements] = useState([]);

  const handleMouseMove = useCallback((e) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Add a new trail element
      const newTrail = { x: e.clientX, y: e.clientY, id: Math.random() };
      setTrailElements(prev => [...prev.slice(-10), newTrail]); // Keep last 10 trail elements
    });
    if (!visible) setVisible(true);
  }, [visible]);

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);
  const handleMouseLeave = () => setVisible(false);
  const handleMouseEnter = () => setVisible(true);

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Handle hoverable elements
    const handleElementHover = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    const hoverableElements = document.querySelectorAll('a, button, input, [role="button"]');
    hoverableElements.forEach(element => {
      element.addEventListener('mouseenter', handleElementHover);
      element.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      
      hoverableElements.forEach(element => {
        element.removeEventListener('mouseenter', handleElementHover);
        element.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, [handleMouseMove]);

  if (!visible) return null;

  return (
    <>
      {/* Cursor trail */}
      {trailElements.map(trail => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: `${trail.x}px`,
            top: `${trail.y}px`,
          }}
        />
      ))}
      
      {/* Main cursor dot */}
      <div
        className="cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Cursor ring */}
      <div
        className={`cursor-ring ${isHovering ? 'cursor-hovering' : ''} ${isClicking ? 'cursor-clicking' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transition: isClicking ? 'transform 0.1s ease' : 'transform 0.2s ease',
          boxShadow: isHovering ? '0 0 10px rgba(255, 255, 255, 0.8)' : 'none',
        }}
      />
      
      {/* Cursor glow effect */}
      <div
        className="cursor-glow"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </>
  );
};

export default DotCursor;
