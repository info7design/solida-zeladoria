// Initialize Lucide Icons
lucide.createIcons();

// Page Navigation Logic
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.add('hidden');
    });

    // Show current page
    document.getElementById('page-' + pageId).classList.remove('hidden');

    // Update Nav Styles
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.textContent.toLowerCase().includes(pageId) || 
            (pageId === 'home' && link.textContent.toLowerCase() === 'início')) {
            link.classList.add('active');
        }
    });

    // Close mobile menu if open
    document.getElementById('mobile-menu').classList.add('hidden');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Mobile Menu Toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

// Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('message-box').classList.remove('hidden');
});

function closeMessage() {
    document.getElementById('message-box').classList.add('hidden');
    document.getElementById('contact-form').reset();
}

// Initial setup
window.onload = function() {
    showPage('home');
}
