function renderProjects(projects) {
    const projectsContainer = document.getElementById('project-content');
    if (projectsContainer) {
        projects.forEach((project) => {
            projectsContainer.innerHTML += `
                <div class="project--container">
                    <a href="${project.link}" target="_blank" class="project--title capitalise">${project.title}</a>
                    <div class="project--info">
                        <button class="project--details">DETAILS</button>
                        <a href="${project.github}" target="_blank" class="project--github" id="${project.handle}--github"></a>
                    </div>
                    <div class="project--collapsible-row capitalise">
                        <div class="project--collapsible-row--content">
                            <p>PROJECT TYPE: ${project.type}</p>
                            <p>${project.info}</p>
                        </div>
                    </div>
                </div>`;
            
            fetch('components/github-icon.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load icon');
                return response.text();
            })
            .then(svgHTML => {
                const container = document.querySelector(`#${project.handle}--github`);
                container.innerHTML = svgHTML;
            })
            .catch(error => {
                console.error('Error loading GitHub icon:', error);
                container.textContent = 'GitHub';
            });

            if (project.github === 'private') {
                const github = document.querySelector(`#${project.handle}--github`);
                github.classList.add('private');
            }
            
            if (project.status) {
                const projectInfo = document.querySelector('.project--info');
                projectInfo.innerHTML += `<p class="project--status">${project.status}</p>`;
                console.log(projectInfo);
            }
        });

        const projectDetailButtons = document.querySelectorAll('.project--details');
        projectDetailButtons?.forEach((button) => {
            // set 'DETAILS' button width
            const buttonWidth = button.scrollWidth + 'px';
            button.style.width = buttonWidth;
            button.addEventListener('click', (e) => {
                toggleDetails(e);
            });
        })
    }
}

async function toggleDetails(event) {
    const target = event.currentTarget;
    target.style.pointerEvents = 'none';
    const projectsContainer = target.closest('.project--container');
    const detailsContainer = projectsContainer.querySelector('.project--collapsible-row');

    const isOpening = !target.classList.contains('selected');
    target.classList.toggle('selected');
    detailsContainer.classList.toggle('open');

    if (target.classList.contains('selected')) {
        target.innerText = 'X';
    } else {
        target.innerText = 'DETAILS';
    }

    await setRowHeight(detailsContainer, isOpening);

    target.style.pointerEvents = '';
}

function setRowHeight(content, isOpening) {
    return new Promise((resolve) => {
        if (!content) return resolve();

        const cleanup = () => {
            if (isOpening) content.style.height = 'auto';
            content.removeEventListener('transitionend', cleanup);
            resolve();
        };

        content.removeEventListener('transitionend', cleanup);
        content.addEventListener('transitionend', cleanup);

        if (isOpening) {
            content.style.height = '0px';
            requestAnimationFrame(() => {
                content.style.height = content.scrollHeight + 'px';
            });
        } else {
            content.style.height = content.scrollHeight + 'px';
            requestAnimationFrame(() => {
                content.style.height = '0px';
            });
        }
    });
}