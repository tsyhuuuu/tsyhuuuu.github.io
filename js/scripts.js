/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // Research Section Toggle Functionality
    const researchToggles = document.querySelectorAll('.research-toggle');
    
    researchToggles.forEach(toggle => {
        toggle.addEventListener('click', async (e) => {
            e.preventDefault();
            
            const researchId = toggle.getAttribute('data-research-id');
            const contentContainer = document.getElementById(`research-content-${researchId}`);
            const innerDiv = contentContainer.querySelector('.ps-4');
            const toggleIcon = toggle.querySelector('.toggle-icon');
            const isCurrentlyActive = contentContainer.classList.contains('active');
            
            if (!isCurrentlyActive) {
                // Opening the section
                // Load content if not already loaded
                const contentExists = innerDiv.innerHTML.trim() !== '' && !innerDiv.innerHTML.includes('Content will be loaded here');
                
                if (!contentExists) {
                    try {
                        const response = await fetch(`assets/research/research-${researchId}.html`);
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const content = await response.text();
                        innerDiv.innerHTML = content;
                    } catch (error) {
                        console.error(`Error loading research content ${researchId}:`, error);
                        innerDiv.innerHTML = `<p style="color: red;">Error loading content. Please check the file path: assets/research/research-${researchId}.html</p>`;
                    }
                }
                
                contentContainer.classList.add('active');
                toggle.classList.add('active');
                toggleIcon.classList.add('active');
                toggleIcon.textContent = '▼';
            } else {
                // Closing the section
                contentContainer.classList.remove('active');
                toggle.classList.remove('active');
                toggleIcon.classList.remove('active');
                toggleIcon.textContent = '▶';
            }
        });
    });

});
