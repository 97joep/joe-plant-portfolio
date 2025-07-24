function renderContact(contact) {
    const contactContainer = document.getElementById('contact-content');
    if (contactContainer) {
        contactContainer.innerHTML += `<div class="contact-content--links"></div>`

        const contactLinksContainer = document.querySelector('.contact-content--links');
        if (contactLinksContainer) {
            contact.forEach((item) => {
                contactLinksContainer.innerHTML += `<a href="${item.link}" target"_blank" class="capitalise">${item.title}</a>`;
            });
        }
    }
}