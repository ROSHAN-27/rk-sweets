// Detect when the user scrolls
window.addEventListener('scroll', function() {
    // Get the content element
    const content = document.querySelector('.content');
    // Calculate how far the user has scrolled from the top
    const scrollY = window.scrollY;
    // Calculate the height of the viewport
    const viewportHeight = window.innerHeight;
    // Calculate the height of the content
    const contentHeight = content.offsetHeight;
    // Calculate the position of the bottom of the content relative to the viewport
    const contentBottom = content.getBoundingClientRect().bottom;
    // Calculate the distance from the bottom of the content to the bottom of the viewport
    const distanceFromBottom = contentBottom - viewportHeight;
    // Calculate the threshold (e.g., 20% of the viewport height)
    const threshold = viewportHeight * 0.2;
    // Check if the user has scrolled to the bottom and if the bottom of the content is within the threshold
    if (scrollY >= distanceFromBottom - threshold) {
        // Add the 'animate' class to trigger the animation
        content.classList.add('animate');
    }
});


document.addEventListener("DOMContentLoaded", function() {
    // Check if the redirection flag is set
    if (!sessionStorage.getItem("redirected")) {
        // Animation code here (if any)

        // Redirect to another page after animation completes
        setTimeout(function() {
            window.location.href = "index.html"; // Change "main_page.html" to the desired page
        }, 10000); // Adjust the delay (in milliseconds) as needed

        // Set the redirection flag to indicate that redirection has occurred
        sessionStorage.setItem("redirected", true);
    }
});


