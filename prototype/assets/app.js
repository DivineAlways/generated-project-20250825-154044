document.addEventListener('DOMContentLoaded', () => {
    const dataUrl = 'assets/dummy-data.json';

    const modulesContainer = document.getElementById('modules-container');
    const testimonialsContainer = document.getElementById('testimonials-container');

    // Fetch data and populate the page
    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            populateModules(data.modules);
            populateTestimonials(data.testimonials);
        })
        .catch(error => {
            console.error('Could not fetch data:', error);
            if (modulesContainer) modulesContainer.innerHTML = '<p>Error loading modules.</p>';
            if (testimonialsContainer) testimonialsContainer.innerHTML = '<p>Error loading testimonials.</p>';
        });

    // Function to populate course modules
    function populateModules(modules) {
        if (!modulesContainer || !modules) return;

        modulesContainer.innerHTML = modules.map((module, index) => `
            <div class="accordion-item">
                <div class="accordion-header">
                    <span>${index + 1}. ${module.title}</span>
                </div>
                <div class="accordion-content">
                    <p>${module.description}</p>
                </div>
            </div>
        `).join('');
    }

    // Function to populate testimonials
    function populateTestimonials(testimonials) {
        if (!testimonialsContainer || !testimonials) return;

        testimonialsContainer.innerHTML = testimonials.map(testimonial => `
            <div class="testimonial-card">
                <p class="quote">"${testimonial.quote}"</p>
                <p class="author">${testimonial.name}</p>
                <p class="handle">${testimonial.handle}</p>
            </div>
        `).join('');
    }

    // Accordion functionality
    if (modulesContainer) {
        modulesContainer.addEventListener('click', (event) => {
            const header = event.target.closest('.accordion-header');
            if (!header) return;

            const item = header.parentElement;
            const wasActive = item.classList.contains('active');

            // Optional: Close all other items
            // document.querySelectorAll('.accordion-item').forEach(el => el.classList.remove('active'));

            if (!wasActive) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
