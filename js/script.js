document.addEventListener("DOMContentLoaded", function () {
    // fetch JSON data
    fetch('data/content.json')
    .then(res => res.json())
    .then(data => {
        renderIntro();
        renderNav();
        renderHome(data.home);
        renderProjects(data.projects);
        renderFaqs(data.faqs);
        renderContact(data.contact);
    });

    const intro = document.getElementById("intro");

    setTimeout(() => {
        intro.classList.add("intro-animate-in");

        setTimeout(() => {
        intro.classList.remove("intro-screen");
        }, 1000);
    }, 1500);
});

const introButton = document.getElementById('intro-button');

function renderIntro() {
    if (introButton) {
        introButton.addEventListener("click", toggleNav);
    }
}

function renderNav() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach((item) => {
        const target = item.getAttribute("data-target");
        const targetText = item.innerText;
        item.addEventListener("click", () => toggleContent(target, targetText));
    });
}

let currentContent;
let currentContentTitle;
let navOpen = false;
let contentOpen = false;

function toggleNav() {
    const nav = document.querySelector('.page-grid--nav');

    if (navOpen) {
        nav.classList.remove('active');

        const openContent = document.querySelector('.content--item.active');
        if (openContent) {
            console.log(openContent);
            contentId = openContent.getAttribute("id");
            contentTitle = openContent.getAttribute("data-title");
            toggleContent(contentId, contentTitle);
        }

        introButton.innerText = 'Explore';
        navOpen = false;
    } else {
        nav.classList.add('active');
        introButton.innerText = 'X';
        introButton.style.textDecoration = 'none';
        navOpen = true;
    }
}

function toggleContent(target, text) {
    // if the selected data target is different, close the original content
    if (currentContent && currentContent !== target) {
        const previousContent = document.getElementById(currentContent);
        const previousContentButton = document.querySelector(`[data-target="${currentContent}"]`);
        console.log(previousContent, previousContentButton);

        previousContent.classList.remove('active');
        previousContentButton.innerText = `${currentContentTitle}`;
        contentOpen = false;
    }

    // open selected content
    const selectedContent = document.getElementById(`${target}`);
    const selectedContentButton = document.querySelector(`[data-target="${target}"]`);

    if (contentOpen) {
        selectedContent.classList.remove('active');
        selectedContentButton.innerText = `${text}`;
        contentOpen = false;
    } else {
        selectedContent.classList.add('active');
        selectedContentButton.innerText = 'X';
        contentOpen = true;
    }

    currentContent = target;
    currentContentTitle = text;
}