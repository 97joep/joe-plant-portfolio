function renderContact(contact) {
    const contactContainer = document.getElementById('contact-content');
    if (contactContainer) {
        contactContainer.innerHTML += `<div class="contact-content--links"></div>`

        const contactLinksContainer = document.querySelector('.contact-content--links');
        if (contactLinksContainer) {
            contact.forEach((item) => {
                contactLinksContainer.innerHTML += `<a href="${item.link}" target="_blank" class="contact-content--link capitalise">${item.title}</a>`;
            });
        }
    }

    fetch('components/link-arrow.html')
    .then(response => {
        if (!response.ok) throw new Error('Failed to load icon');
        return response.text();
    })
    .then(svgHTML => {
        const links = document.querySelectorAll('.contact-content--link');
        links?.forEach((link) => {
            link.innerHTML += svgHTML;
        });
    })
    .catch(error => {
        console.error('Error loading link icon:', error);
    });
}