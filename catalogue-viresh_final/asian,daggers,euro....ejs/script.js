document.addEventListener("DOMContentLoaded", function () {
    const imageContainers = document.querySelectorAll(".image-container-1, .image-container-2, .image-container-3, .image-container-4, .image-container-5");
  
    const observerOptions = {
      root: null,
      rootMargin: "40px",
      threshold: 0.05,
    };
  
    const observer = new IntersectionObserver(handleIntersection, observerOptions);
  
    // Add each image container to the Intersection Observer
    imageContainers.forEach((container) => {
      observer.observe(container);
    });
  
    function handleIntersection(entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate"); // Add your animation class here
          observer.unobserve(entry.target); // Stop observing once the animation is applied
        } else {
          entry.target.style.opacity = 0; // Set opacity to 0 for elements outside the viewport
        }
      });
    }
  });
  