document.addEventListener('DOMContentLoaded', () => {
    const btnYes = document.getElementById('btn-yes');
    const btnNo = document.getElementById('btn-no');
    const message = document.getElementById('message');

    // Handle "Yes" button click
    btnYes.addEventListener('click', () => {
        message.classList.remove('hidden');
        btnNo.style.display = 'none'; // Hide "No" button entirely when "Yes" is clicked
        btnYes.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btnYes.style.transform = '';
        }, 150);
    });

    // Core logic for dodging "No" button
    function evade() {
        // Detach from document flow safely
        if (btnNo.style.position !== 'fixed') {
            const rect = btnNo.getBoundingClientRect();
            btnNo.style.position = 'fixed';
            btnNo.style.left = rect.left + 'px';
            btnNo.style.top = rect.top + 'px';
            btnNo.style.margin = '0';
            btnNo.style.zIndex = '1000';
            
            // Allow CSS transition to reset nicely
            setTimeout(moveButton, 50);
            return;
        }
        
        moveButton();
    }

    function moveButton() {
        const btnWidth = btnNo.offsetWidth || 150;
        const btnHeight = btnNo.offsetHeight || 60;
        
        // Use a generous safe padding margin so the large neon glow and border don't get cut off by screen edge
        const safePadding = 50; 

        // Calculate minimum and maximum safe coordinates to keep entirely inside the viewport
        const minX = safePadding;
        const maxX = window.innerWidth - btnWidth - safePadding;
        const minY = safePadding;
        const maxY = window.innerHeight - btnHeight - safePadding;

        // Ensure max is greater than min to avoid errors on very small screens
        const finalMaxX = Math.max(minX, maxX);
        const finalMaxY = Math.max(minY, maxY);

        // Standard formula to generate a uniform random integer within range [min, max]
        const randomX = Math.floor(Math.random() * (finalMaxX - minX + 1)) + minX;
        const randomY = Math.floor(Math.random() * (finalMaxY - minY + 1)) + minY;

        btnNo.style.left = randomX + 'px';
        btnNo.style.top = randomY + 'px';
    }

    // Capture various cursor events to trigger the evasion
    btnNo.addEventListener('mouseover', evade);
    btnNo.addEventListener('mouseenter', evade);
    
    // Support for touch devices
    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); // prevent click from triggering on mobile
        evade();
    });
    
    // Final fallback in case they aggressively click
    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        evade();
    });
});
