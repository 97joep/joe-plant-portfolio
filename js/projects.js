function renderProjects(projects) {
    const projectsContainer = document.getElementById('project-content');
    if (projectsContainer) {
        projects.forEach((project) => {
             const htmlString = `
                <div class="project--container">
                    <a href="${project.link}" id="${project.handle}--link" target="_blank" class="project--title capitalise" data-state="off"><span>${project.title}</span></a>
                    <div class="project--message--container">
                        <div class="project--message--content">
                            <button>X</button>
                            <div class="project--message"></div>
                        </div>
                    </div>
                    <div class="project--info">
                        <button class="project--details">DETAILS</button>
                        <a href="${project.github}" target="_blank" class="project--github" id="${project.handle}--github" data-state="off"></a>
                    </div>
                    <div class="project--github--message--container" id="${project.handle}--github--message--container">
                        <div class="project--github--message--content">
                            <button>X</button>
                        </div>
                    </div>
                    <div class="project--collapsible-row capitalise">
                        <div class="project--collapsible-row--content">
                            <p>PROJECT TYPE: ${project.type}</p>
                            <p>${project.info}</p>
                        </div>
                    </div>
                </div>`;
            
            projectsContainer.insertAdjacentHTML("beforeend", htmlString);

            fetch('components/github-icon.html')
            .then(response => {
                if (!response.ok) throw new Error('Failed to load icon');
                return response.text();
            })
            .then(svgHTML => {
                const container = document.querySelector(`#${project.handle}--github`);
                container.innerHTML = svgHTML || `<p>Github</p>`;
            })
            .catch(error => {
                console.error('Error loading GitHub icon:', error);
            });

            if (project.githubState === 'private') {
                const githubButton = document.querySelector(`#${project.handle}--github`);
                const githubMessageContainer = document.querySelector(`#${project.handle}--github--message--container`);
                const githubMessage = githubMessageContainer.querySelector('.project--github--message--content');
                console.log(githubMessageContainer, githubMessage);

                // render github message
                githubMessage.innerHTML += `<div class="project--github--message"><p>Private repository. Request access <a href="">here</a><p>Click Github link again to continue.</p></div>`;
                const hrefText = `mailto:jjnplnt.freelance@gmail.com?subject=GitHub Access Request: Project ${project.title} (DO NOT EDIT)&body=Hi,%0A%0AI'd like to request access to your private GitHub repository.%0A%0A%0A%0AMy name: [enter your name]%0A%0AMy occupation: [enter your occupation]%0A%0AMy reason for request: [enter reason for access]%0A%0AMy Github details: [enter your Github username and/or email]%0A%0AThanks!`
                githubMessage.querySelector('a').href = hrefText;

                const githubMessageClose = githubMessageContainer.querySelector('button');
                githubMessageClose?.addEventListener('click', (e) => {
                    closeMessage(githubButton, githubMessageContainer, e);
                })

                githubButton.addEventListener('click', (e) => {
                    const githubButtonState = githubButton.dataset.state;
                    if (githubButtonState === 'off') {
                        openMessage(e, githubMessageContainer);
                    } else if (githubButtonState === 'on') {
                        closeMessage(githubButton, githubMessageContainer, e);
                    }
                })
            } else if (project.githubState === 'unavailable') {
                const githubButton = document.querySelector(`#${project.handle}--github`);
                githubButton.classList.add('unavailable');
            }

            if (project.message) {
                console.log("Project message found for:", project.title);
                const projectLink = document.querySelector(`#${project.handle}--link`);

                // render project message
                const projectContainer = projectLink?.closest('.project--container');
                const projectMessageContainer = projectContainer.querySelector('.project--message--container');
                const projectMessage = projectMessageContainer.querySelector('.project--message');
                const projectMessageContent = projectMessageContainer.querySelector('.project--message--content');
                project.message.map((p) => {
                    projectMessage.innerHTML = project.message
                    .map(p => `<p>${p}</p>`)
                    .join('');
                });

                const projectMessageClose = projectMessageContainer.querySelector('button');
                projectMessageClose?.addEventListener('click', (e) => {
                    closeMessage(projectLink, projectMessageContainer, e);
                })

                projectLink.addEventListener('click', (e) => {
                    const projectLinkState = projectLink.dataset.state;
                    if (projectLinkState === 'off') {
                        openMessage(e, projectMessageContainer);
                    } else if (projectLinkState === 'on') {
                        closeMessage(projectLink, projectMessageContainer, e);
                    }
                })
            }
        });

        const projectDetailButtons = document.querySelectorAll('.project--details');
        projectDetailButtons?.forEach((button) => {
            // set 'DETAILS' button width
            const buttonWidth = button.scrollWidth + 'px';
            button.style.width = buttonWidth;
            button.addEventListener('click', (e) => {
                projectDetailsOpen(e);
            });
        })
    }
}

async function projectDetailsOpen(event) {
    const target = event.currentTarget;
    target.style.pointerEvents = 'none';
    const projectsContainer = target.closest('.project--container');
    const detailsContainer = projectsContainer.querySelector('.project--collapsible-row');

    await toggleDetails(target, detailsContainer);

    if (target.classList.contains('open')) {
        target.innerText = 'X';
    } else {
        target.innerText = 'DETAILS';
    }

    target.style.pointerEvents = '';
}

async function toggleDetails(target, detailsContainer) {

    const isOpening = !target.classList.contains('open');
    target.classList.toggle('open');
    detailsContainer.classList.toggle('open');

    await setRowHeight(detailsContainer, isOpening);
}

function setRowHeight(content, isOpening) {
    console.log(content, content.scrollHeight, isOpening);
    const contentHeight = content.scrollHeight + 'px';

    if (isOpening) {
        content.style.height = contentHeight;
    } else {
        content.style.height = '0px';
    }
}

async function openMessage(e, message) {
    // stop link's default behaviour
    e.preventDefault();
    const messageLink = e.currentTarget;

    // display message
    await toggleDetails(messageLink, message);

    // allow link's default behaviour on 2nd click
    messageLink.dataset.state = 'on';
}

async function closeMessage(messageLink, message, e) {
    messageLink.dataset.state = 'off';

    await toggleDetails(messageLink, message);
}