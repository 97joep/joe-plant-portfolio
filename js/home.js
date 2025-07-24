function renderHome(home) {
    const homeContainer = document.getElementById('home-content');
    if (homeContainer) {
        // create structure
        homeContainer.innerHTML = 
            `<div class="home-content">
                <div class="home-content--intro capitalise"></div>
                <div class="home-content--skills">
                    <div class="home-content--stack capitalise">
                        <p style="font-weight:bold">Stack:</p>
                    </div>
                    <div class="home-content--frameworks capitalise">
                        <p style="font-weight:bold">Frameworks:</p>
                    </div>
                    <div class="home-content--backend capitalise">
                        <p style="font-weight:bold">Backend/CMS:</p>
                    </div>
                </div>
                <div class="home-content--cv capitalise"></div>
            </div>`;

        // insert intro
        const about = home.description;
        const aboutContainer = document.querySelector('.home-content--intro');
        about.forEach((paragraph) => {
            aboutContainer.innerHTML += `<span><p>${paragraph}</p></span>`;
        });

        // insert stack
        const stack = home.stack;
        const stackContainer = document.querySelector('.home-content--stack');
        stack.forEach((skill) => {
            stackContainer.innerHTML += `<p>${skill}</p>`;
        });

        // insert frameworks
        const frameworks = home.frameworks;
        const frameworksContainer = document.querySelector('.home-content--frameworks');
        frameworks.forEach((framework) => {
            frameworksContainer.innerHTML += `<p>${framework}</p>`;
        });

        // insert backend & CMS
        const backend = home.backend;
        const backendContainer = document.querySelector('.home-content--backend');
        backend.forEach((item) => {
            backendContainer.innerHTML += `<p>${item}</p>`;
        });

        // insert downloadable CV
        const cv = home.cv;
        const cvContainer = document.querySelector('.home-content--cv');
        cvContainer.innerHTML += `<a href="${cv.url}" target="_blank" id="cv-download" style="font-weight:bold">Download CV</a>`;
        const cvDownload = document.querySelector('#cv-downlaod');
    }
}