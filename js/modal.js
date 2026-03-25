document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile[data-modal="true"]');
    const overlay = document.getElementById('tileModalOverlay');

    if (!overlay) return;

    const closeBtn = overlay.querySelector('.modal-close');
    const modalImg = overlay.querySelector('#modalImg');
    const modalTitle = overlay.querySelector('#modalTitle');
    const modalPhase = overlay.querySelector('#modalPhase');
    const modalDesc = overlay.querySelector('#modalDesc');
    const modalOutcomes = overlay.querySelector('#modalOutcomes'); // Could be null

    // The following might be null depending on which page we are on
    const modalContactName = overlay.querySelector('#modalContactName');
    const modalContactRole = overlay.querySelector('#modalContactRole');
    const modalContactEmail = overlay.querySelector('#modalContactEmail');
    const modalContactAvatar = overlay.querySelector('#modalContactAvatar');

    const modalProblem = overlay.querySelector('#modalProblem');
    const modalSolution = overlay.querySelector('#modalSolution');
    const modalTech = overlay.querySelector('#modalTech');

    const modalResources = overlay.querySelector('#modalResources');

    tiles.forEach(tile => {
        tile.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior if it's an anchor

            // Get data from attributes
            const title = tile.getAttribute('data-title');
            const phase = tile.getAttribute('data-phase') || 'System';
            const desc = tile.getAttribute('data-desc');
            const outcomesRaw = tile.getAttribute('data-outcomes');
            const problem = tile.getAttribute('data-problem');
            const solution = tile.getAttribute('data-solution');
            const tech = tile.getAttribute('data-tech');

            const contactName = tile.getAttribute('data-contact-name');
            const contactRole = tile.getAttribute('data-contact-role');
            const contactEmail = tile.getAttribute('data-contact-email');

            const imgSrc = tile.getAttribute('data-img');
            const resourcesRaw = tile.getAttribute('data-resources');

            // Populate Modal
            modalTitle.textContent = title;
            modalPhase.textContent = phase;
            modalDesc.textContent = desc;
            modalImg.src = imgSrc;
            modalImg.alt = title;

            // Populate Outcomes (if available/applicable)
            if (modalOutcomes) {
                if (outcomesRaw) {
                    try {
                        const outcomes = JSON.parse(outcomesRaw);
                        modalOutcomes.innerHTML = '';
                        outcomes.forEach(item => {
                            const li = document.createElement('li');
                            li.textContent = item;
                            li.style.marginBottom = '8px';
                            modalOutcomes.appendChild(li);
                        });
                        modalOutcomes.style.display = 'block';
                    } catch (e) {
                        // Fallback for old string format
                        modalOutcomes.innerHTML = '';
                        const li = document.createElement('li');
                        li.textContent = outcomesRaw;
                        modalOutcomes.appendChild(li);
                        modalOutcomes.style.display = 'block';
                    }
                } else {
                    modalOutcomes.style.display = 'none';
                }
            }

            // Populate Contact (if available) -> handles role OR email
            if (modalContactName && modalContactAvatar) {
                if (contactName) {
                    modalContactName.textContent = contactName;

                    if (modalContactRole) modalContactRole.textContent = contactRole;
                    if (modalContactEmail) modalContactEmail.textContent = contactEmail;

                    // Generate initials for avatar
                    const initials = contactName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
                    modalContactAvatar.textContent = initials;
                    modalContactName.parentElement.parentElement.style.display = 'flex'; // show contact block

                    if (modalContactName.parentElement.parentElement.previousElementSibling) {
                        modalContactName.parentElement.parentElement.previousElementSibling.style.display = 'block'; // show section title
                    }
                } else {
                    modalContactName.parentElement.parentElement.style.display = 'none'; // hide contact block
                    if (modalContactName.parentElement.parentElement.previousElementSibling) {
                        modalContactName.parentElement.parentElement.previousElementSibling.style.display = 'none'; // hide section title
                    }
                }
            }

            // Populate Problem Statement
            if (modalProblem) {
                if (problem) {
                    modalProblem.textContent = problem;
                    modalProblem.style.display = 'block';
                    modalProblem.previousElementSibling.style.display = 'block';
                } else {
                    modalProblem.style.display = 'none';
                    modalProblem.previousElementSibling.style.display = 'none';
                }
            }

            // Populate Solution
            if (modalSolution) {
                if (solution) {
                    modalSolution.textContent = solution;
                    modalSolution.style.display = 'block';
                    modalSolution.previousElementSibling.style.display = 'block';
                } else {
                    modalSolution.style.display = 'none';
                    modalSolution.previousElementSibling.style.display = 'none';
                }
            }

            // Populate Technology Used
            if (modalTech) {
                if (tech) {
                    modalTech.textContent = tech;
                    modalTech.style.display = 'block';
                    modalTech.previousElementSibling.style.display = 'block';
                } else {
                    modalTech.style.display = 'none';
                    modalTech.previousElementSibling.style.display = 'none';
                }
            }

            // Populate Resources
            modalResources.innerHTML = '';
            if (resourcesRaw) {
                const resources = JSON.parse(resourcesRaw);
                resources.forEach(res => {
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    a.href = res.link;
                    a.textContent = res.label;
                    a.target = "_blank";
                    li.appendChild(a);
                    modalResources.appendChild(li);
                });
            }

            // Open Modal
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    const closeModal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (e) => {
        // If the user clicks the dark background overlay, close it
        if (e.target === overlay) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });
});
