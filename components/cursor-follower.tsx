"use client";
import { useEffect, useState, useRef, useCallback } from "react";


const CursorFollower = () => {
  // State to hold the mouse position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  // State to track whether the mouse is over an interactive element
  const [isHovering, setIsHovering] = useState(false);
  // State to track if the cursor is visible
  const [isVisible, setIsVisible] = useState(false);
  // State to track scroll velocity for lantern intensity
  const [scrollIntensity, setScrollIntensity] = useState(0);
  // Ref to store the animation frame ID
  const animationRef = useRef<number | null>(null);
  // Ref to store the current mouse position for smooth animation
  const mousePos = useRef({ x: 0, y: 0 });
  // Ref to store the current follower position
  const followerPos = useRef({ x: 0, y: 0 });
  // Ref to store scroll position for velocity calculation
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Smooth animation using requestAnimationFrame
  const animate = useCallback(() => {
    const dx = mousePos.current.x - followerPos.current.x;
    const dy = mousePos.current.y - followerPos.current.y;

    // Lerp (linear interpolation) for smooth following
    followerPos.current.x += dx * 0.1;
    followerPos.current.y += dy * 0.1;

    setPosition({
      x: followerPos.current.x,
      y: followerPos.current.y
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Function to update the mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setIsVisible(true);
    };

    // Function to handle mouse enter
    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Function to handle mouse leave
    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Function to handle scroll for lantern intensity
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollVelocity = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;

      // Calculate scroll intensity (0-1 scale)
      const intensity = Math.min(scrollVelocity / 50, 1);
      setScrollIntensity(intensity);

      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Reset scroll intensity after scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setScrollIntensity(0);
      }, 150);
    };

    // Add the event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // --- Logic for interactive elements ---
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      // Check if the target or its parent is an interactive element
      if (target.closest('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    // Start the animation loop
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup function to remove the event listeners
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [animate]); // Include animate in dependencies

  // Style for the lantern-like radial gradient follower
  // Creates a large, very transparent radial gradient that follows the cursor
  const baseSize = 800;
  const hoverSize = 800;
  const scrollBoost = scrollIntensity * 80; // Additional size from scrolling
  const currentSize = (isHovering ? hoverSize : baseSize) + scrollBoost;

  // Dynamic opacity based on scroll intensity
  const baseOpacity = 0.1;
  const scrollOpacity = baseOpacity;

  const followerStyle: React.CSSProperties = {
    transform: `translate(${position.x - currentSize / 2}px, ${position.y - currentSize / 2}px)`,
    // Large circular gradient that responds to interactions and scrolling
    width: `${currentSize}px`,
    height: `${currentSize}px`,
    // Very transparent radial gradient using CSS variables with scroll enhancement
    background: `radial-gradient(circle,
      hsl(from var(--primary) h s l / ${baseOpacity + scrollOpacity}) 60%,
      transparent 80%
    )`,
    // Smooth transitions for size changes and opacity
    opacity: isVisible ? 0.5 : 0,
    transition: 'opacity 0.5s ease',
    // Additional lantern-like effects with scroll responsiveness
    filter: 'blur(60px)',
  };

  return (
    <div
      className="hidden md:block fixed top-0 left-0 pointer-events-none z-10 will-change-transform"
      style={followerStyle}
    />
  );
};

export default CursorFollower;