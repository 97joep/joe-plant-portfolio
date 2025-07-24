function renderFaqs(faqs) {
    const faqsContainer = document.getElementById('faq-content');
    if (faqsContainer) {
        faqs.forEach((faq) => {
            faqsContainer.innerHTML += `<div class="faq capitalise"><p style="font-weight:bold;">${faq.question}</p><p>${faq.answer}</p></div>`;
        });
    }
}