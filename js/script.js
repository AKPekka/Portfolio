document.addEventListener('DOMContentLoaded', function() {

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('header nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Project Modal Functionality ---
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const closeModalButton = document.querySelector('.close-button');

    // Define your project details here
    // This is where you'll describe each project.
    // For a real site, you might fetch this from a JSON file or a CMS.
    const projectDetails = {
        project1: {
            title: "Astranew: Waterless Clothing Sanitation System for Space Missions",
            heroImage: "assets/images/project1_hero.jpg", // Larger image for modal
            description: "Astranew is a closed-loop, water-free garment sanitation appliance developed to address the problem of textile waste on long-duration space missions. Utilizing UV-C sterilization and high-efficiency air circulation, Astranew achieves ≥99.9% microbial reduction and deodorization in under 20 minutes—eliminating the need for disposable clothing and conserving critical resources. Designed for microgravity and spacecraft integration, the prototype exceeded NASA's sanitation standards while demonstrating potential for both space and terrestrial applications.",
            keyFeatures: [
                "Waterless, closed-loop UV-C sanitation system designed for microgravity environments.",
                "Achieves ≥99.9% bacterial reduction in under 5 minutes, full cycle in 20 minutes.",
                "High-efficiency airflow system with custom 3D-printed hangers for uniform treatment.",
                "Intuitive Arduino-powered user interface and fully modular enclosure for easy integration."
            ],
            technologies: ["MATLAB", "ANSYS", "Inventor", "Arduino", "C++", "3D Printing", "Laser Cutting"],
            // Optional links
            // projectLink: "#", // Link to a live demo or repository
            reportLink: "assets/pdfs/project1_report.pdf" // Link to a PDF report
        },
        project2: {
            title: "Optimizing Electric Vehicle Charging Infrastructure Placement",
            heroImage: "assets/images/project2_hero.jpg",
            description: "This project presents a data-driven, simulation-based workflow for siting electric vehicle (EV) charging stations to maximize driver convenience and protect grid reliability. By synthesizing charging demand, simulating policy-driven load profiles, and iteratively refining site selection, the framework reduces average travel distances for EV users by 25% while ensuring zero grid-node overloads. The approach is modular, computationally efficient, and adaptable to real-world constraints and future technologies.",
            keyFeatures: [
                "Data-driven, simulation-based workflow for siting EV charging stations under real-world demand and grid constraints.",
                "Captures user charging behaviors and temporal load profiles with flexible, policy-driven simulations.",
                "Employs clustering and greedy local search to optimize station placement, minimizing driver travel and infrastructure overload.",
                "Achieves 25% reduction in average user travel distances while guaranteeing zero grid-node capacity violations."
            ],
            technologies: ["MATLAB", "Simulink", "CVX"],
            // projectLink: "#",
            reportLink: "assets/pdfs/project2_report.pdf"
        },
        project3: {
            title: "1933 Hot Rod RC Vehicle: Parametric Redesign and Performance Optimization",
            heroImage: "assets/images/project3_thumb.jpg", // Replace with actual image
            description: "Led the surface modeling and simulation for a complete re-engineering of a 1933 Hot Rod RC car, focusing on a fully morphable design using Siemens NX. The project emphasized weight reduction, drag minimization, and structural optimization through advanced simulation and parametric modeling. The result is a high-performance, customizable RC vehicle validated by FEA and CFD.",
            keyFeatures: [
                "Fully parametric, morphable RC car design—including body shell, chassis, and even small components.",
                "Advanced surface modeling and complex assembly construction in Siemens NX.",
                "Topology optimization and FEA for mass reduction and structural integrity of critical parts.",
                "Aerodynamic shell redesign and CFD-driven drag force minimization at target speeds.",
                "All performance improvements and visualizations validated through simulation and real assembly data"
            ],
            technologies: ["Siemens NX", "STAR-CCM+", "Altair Inspire"],
            reportLink: "assets/pdfs/project3_report.pdf"
        }
        // Add more projects following the same structure
    };

    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.dataset.projectId;
            const details = projectDetails[projectId];

            if (details) {
                let featuresHTML = '';
                if (details.keyFeatures && details.keyFeatures.length > 0) {
                    featuresHTML = '<ul>' + details.keyFeatures.map(feature => `<li>${feature}</li>`).join('') + '</ul>';
                }

                let techHTML = '';
                if (details.technologies && details.technologies.length > 0) {
                    techHTML = details.technologies.map(tech => `<span>${tech}</span>`).join('');
                }

                let linksHTML = '<div class="project-links">';
                if (details.projectLink) {
                    linksHTML += `<a href="${details.projectLink}" target="_blank">View Project/Demo</a>`;
                }
                if (details.reportLink) {
                    linksHTML += `<a href="${details.reportLink}" target="_blank">Read Report (PDF)</a>`;
                }
                linksHTML += '</div>';

                // Link to the dedicated project page
                const projectPageLink = `<a href="${projectId}.html" class="view-full-project">View Full Project Details</a>`;

                modalBody.innerHTML = `
                    <img src="${details.heroImage}" alt="${details.title}" class="modal-hero-image">
                    <h2>${details.title}</h2>
                    <p>${details.description}</p>
                    ${featuresHTML ? `<h3>Key Features & Contributions:</h3>${featuresHTML}` : ''}
                    ${techHTML ? `<h3>Technologies Used:</h3><div class="tech-stack">${techHTML}</div>` : ''}
                    ${(details.projectLink || details.reportLink) ? linksHTML : ''}
                    <div class="full-project-link-container">${projectPageLink}</div>
                `;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            } else {
                console.warn("Project details not found for ID:", projectId);
                modalBody.innerHTML = `<p>Project details are not available for this entry.</p>`;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore background scrolling
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    // Close modal if user clicks outside of the modal content
    modal.addEventListener('click', function(event) {
        if (event.target === modal) { // Check if the click is on the modal backdrop itself
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.classList.contains('active')) {
            closeModal();
        }
    });

});
