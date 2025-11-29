// Animation variants for Framer Motion
// Reusable animation configurations for consistent animations across the app

// Page fade in animation
export const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeOut' }
};

// Slide up animation
export const slideUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
};

// Slide down animation
export const slideDown = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: 'easeOut' }
};

// Scale in animation (for modals, cards)
export const scaleIn = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2, ease: 'easeOut' }
};

// Modal backdrop animation
export const modalBackdrop = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
};

// Stagger container for lists/grids
export const staggerContainer = {
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
        }
    }
};

// Stagger item (child of staggerContainer)
export const staggerItem = {
    initial: { opacity: 0, y: 10 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// Hover scale effect for interactive elements
export const hoverScale = {
    rest: { scale: 1 },
    hover: {
        scale: 1.02,
        transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: {
        scale: 0.98,
        transition: { duration: 0.1 }
    }
};

// Card hover effect
export const cardHover = {
    rest: {
        y: 0,
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
    },
    hover: {
        y: -4,
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        transition: { duration: 0.2, ease: 'easeOut' }
    }
};

// Button hover and tap
export const buttonAnimation = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.2, ease: 'easeOut' }
    },
    tap: {
        scale: 0.95,
        transition: { duration: 0.1 }
    }
};

// Table row animation
export const tableRow = {
    initial: { opacity: 0, x: -10 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// Stats card animation
export const statsCard = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

// Input focus animation
export const inputFocus = {
    focus: {
        scale: 1.01,
        borderColor: '#3B82F6',
        transition: { duration: 0.2 }
    }
};

// Navbar animation
export const navbar = {
    initial: { y: -100, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

// Footer animation
export const footer = {
    initial: { y: 50, opacity: 0 },
    animate: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.4, ease: 'easeOut', delay: 0.2 }
    }
};

// Sidebar animation
export const sidebar = {
    initial: { x: -100, opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// Badge/Pill animation
export const badge = {
    initial: { scale: 0 },
    animate: {
        scale: 1,
        transition: { type: 'spring', stiffness: 500, damping: 25 }
    }
};

// Image zoom on hover
export const imageZoom = {
    rest: { scale: 1 },
    hover: {
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeOut' }
    }
};

// ============================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================
// These animations trigger when elements come into view while scrolling

// Fade in from bottom on scroll
export const scrollFadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

// Fade in from left on scroll
export const scrollFadeLeft = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

// Fade in from right on scroll
export const scrollFadeRight = {
    hidden: { opacity: 0, x: 30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

// Scale up on scroll
export const scrollScale = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: 'easeOut' }
    }
};

// Stagger container for scroll animations
export const scrollStaggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

// Stagger item for scroll animations
export const scrollStaggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: 'easeOut' }
    }
};

