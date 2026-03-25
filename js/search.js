// search.js

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchTiles');

    // Check if the page has a search input
    if (!searchInput) return;

    // Get all tiles available on the page
    const allTiles = document.querySelectorAll('.tile');

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase().trim();

        allTiles.forEach(tile => {
            // we want to search across title, description, and contact name
            const title = (tile.getAttribute('data-title') || "").toLowerCase();
            const desc = (tile.getAttribute('data-desc') || "").toLowerCase();
            const contactName = (tile.getAttribute('data-contact-name') || "").toLowerCase();

            // Simple text matching
            if (title.includes(searchTerm) ||
                desc.includes(searchTerm) ||
                contactName.includes(searchTerm)) {

                tile.classList.remove('hidden-by-search');
            } else {
                tile.classList.add('hidden-by-search');
            }
        });
    });
});
