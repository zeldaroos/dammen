// Pupil animation - follows mouse pointer within the eye
document.addEventListener('DOMContentLoaded', function() {
  const pupil = document.getElementById('Pupil');
  const whiteeye = document.getElementById('Whiteeye');
  
  if (!pupil || !whiteeye) {
    console.warn('Pupil or Whiteeye element not found');
    return;
  }

  // Get the SVG element
  const svg = pupil.closest('svg');
  if (!svg) {
    console.warn('SVG element not found');
    return;
  }

  // Initial pupil position (center of whiteeye)
  const pupilInitialX = 60.928;
  const pupilInitialY = 35.413;
  
  // Whiteeye bounds (approximate center and radius from path data)
  const whiteeyeCenterX = 47.96;
  const whiteeyeCenterY = 39.41;
  const whiteeyeRadius = 7; // Approximate radius

  // Track mouse movement
  document.addEventListener('mousemove', function(e) {
    // Get mouse position relative to viewport
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Get SVG position and dimensions
    const svgRect = svg.getBoundingClientRect();
    const svgWidth = svgRect.width;
    const svgHeight = svgRect.height;
    
    // Get viewBox dimensions
    const viewBox = svg.getAttribute('viewBox').split(' ');
    const viewBoxWidth = parseFloat(viewBox[2]);
    const viewBoxHeight = parseFloat(viewBox[3]);
    
    // Calculate mouse position in SVG coordinates
    const relativeMouseX = (mouseX - svgRect.left) / svgWidth * viewBoxWidth;
    const relativeMouseY = (mouseY - svgRect.top) / svgHeight * viewBoxHeight;
    
    // Calculate direction from whiteeye center to mouse
    const dx = relativeMouseX - whiteeyeCenterX;
    const dy = relativeMouseY - whiteeyeCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Normalize and apply maximum movement within the eye
    let newX = whiteeyeCenterX;
    let newY = whiteeyeCenterY;
    
    if (distance > 0) {
      const maxMovement = whiteeyeRadius - 2; // Leave some margin
      const moveDistance = Math.min(distance, maxMovement);
      
      newX = whiteeyeCenterX + (dx / distance) * moveDistance;
      newY = whiteeyeCenterY + (dy / distance) * moveDistance;
    }
    
    // Apply transform to pupil
    // We'll use a translate transform to move the pupil
    const offsetX = newX - pupilInitialX;
    const offsetY = newY - pupilInitialY;
    
    pupil.setAttribute('transform', `translate(${offsetX}, ${offsetY})`);
  });

  // Reset pupil position when mouse leaves the window
  document.addEventListener('mouseleave', function() {
    pupil.setAttribute('transform', 'translate(0, 0)');
  });
});
