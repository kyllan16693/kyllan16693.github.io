function getActiveTagsFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const tagsParam = urlParams.get('tags');
    if (tagsParam) {
        return tagsParam.split(',').map(tag => tag.toLowerCase());
    }
    return [];
}

let skills = [];

function getUniqueTags(skills) {
    const tagsSet = new Set();
    skills.forEach(skill => {
        skill.tags.forEach(tag => {
            tagsSet.add(tag);
        });
    });
    return Array.from(tagsSet).sort();
}

function generateTagButtons() {
    const tags = getUniqueTags(skills);
    const buttonsContainer = document.getElementById('buttons-container');

    while (buttonsContainer.children.length > 2) {
        buttonsContainer.removeChild(buttonsContainer.lastChild);
    }

    const hr1 = document.createElement('hr');
    hr1.className = 'styled-hr';
    buttonsContainer.appendChild(hr1);

    tags.forEach(tag => {
        const button = document.createElement('button');
        button.className = 'tag-button';
        button.setAttribute('data-tag', tag);
        button.textContent = tag;
        buttonsContainer.appendChild(button);
    });
}

fetch('skills/skills.json')
    .then(response => response.json())
    .then(skillsData => {
        skills = skillsData;

        generateTagButtons();

        const container = document.getElementById('skills-container');

        const bubbles = [];
        const activeTags = new Set();

        function createBubbles(skillsArray) {
            container.innerHTML = '';
            bubbles.length = 0;
        
            skillsArray.forEach(skill => {
                const bubble = document.createElement('div');
                bubble.className = 'skill-bubble';
                bubble.dataset.tags = skill.tags.join(',');
        
                bubble.isMatch = false;
        
                bubble.addEventListener('mouseenter', () => {
                    bubble.classList.add('expanded');
                    arrangeBubbles();
                });
        
                bubble.addEventListener('mouseleave', () => {
                    const bubbleTags = skill.tags;
                    const hasActiveTag = Array.from(activeTags).some(activeTag => bubbleTags.includes(activeTag));
                    if (!hasActiveTag) {
                        bubble.classList.remove('expanded');
                        arrangeBubbles();
                    }
                });
        
                const content = document.createElement('div');
                content.className = 'skill-content';
        
                if (skill.icon) {
                    const icon = document.createElement('img');
                    icon.src = skill.icon;
                    icon.alt = `${skill.title} Icon`;
                    content.appendChild(icon);
                }
        
                const title = document.createElement('div');
                title.className = 'skill-title';
                title.textContent = skill.title;
                content.appendChild(title);
        
                bubble.appendChild(content);
        
                if (skill.description) {
                    const longDesc = document.createElement('div');
                    longDesc.className = 'long-description';
                    longDesc.textContent = skill.description;
                    bubble.appendChild(longDesc);
                }
        
                if (skill.link) {
                    skill.link.forEach((link, index) => {
                        const linkButton = document.createElement('a');
                        linkButton.className = 'skill-link-button';
                        linkButton.href = link;
                        linkButton.target = '_blank';
                        linkButton.textContent = (skill.linkName && skill.linkName[index]) ? skill.linkName[index] : 'Learn More';
                        bubble.appendChild(linkButton);
                    });
                }

                
                container.appendChild(bubble);
        
                bubbles.push({ element: bubble, skill: skill });
            });
        
            arrangeBubbles();
        }

        createBubbles(skills);

        function arrangeBubbles() {
            const containerWidth = container.clientWidth;

            bubbles.forEach(bubble => {
                bubble.element.style.width = 'auto';
                bubble.element.style.position = 'absolute';
                bubble.element.style.left = '0px';
                bubble.element.style.top = '0px';
            });

            setTimeout(() => {
                const occupied = [];

                const sortedBubbles = bubbles.slice();
                sortedBubbles.sort((a, b) => {
                    if (a.element.isMatch && !b.element.isMatch) return -1;
                    if (!a.element.isMatch && b.element.isMatch) return 1;
                    return 0;
                });

                sortedBubbles.forEach(bubble => {
                    const bubbleRect = bubble.element.getBoundingClientRect();
                    const bubbleWidth = bubbleRect.width;
                    const bubbleHeight = bubbleRect.height;

                    let x = 0;
                    let y = 0;
                    let found = false;

                    while (!found) {
                        found = true;

                        for (let i = 0; i < occupied.length; i++) {
                            const rect = occupied[i];
                            if (rectanglesOverlap(x, y, bubbleWidth, bubbleHeight, rect.x, rect.y, rect.width, rect.height)) {
                                x = rect.x + rect.width + 10;
                                if (x + bubbleWidth > containerWidth) {
                                    x = 0;
                                    y += rect.height + 10;
                                }
                                found = false;
                                break;
                            }
                        }
                    }

                    bubble.element.style.left = x + 'px';
                    bubble.element.style.top = y + 'px';

                    occupied.push({
                        x: x,
                        y: y,
                        width: bubbleWidth,
                        height: bubbleHeight
                    });
                });

                const maxY = occupied.reduce((max, rect) => Math.max(max, rect.y + rect.height), 0);
                container.style.height = maxY + 'px';
            }, 0);
        }

        function rectanglesOverlap(x1, y1, w1, h1, x2, y2, w2, h2) {
            return !(x1 + w1 <= x2 || x1 >= x2 + w2 || y1 + h1 <= y2 || y1 >= y2 + h2);
        }

        document.getElementById('random-button').addEventListener('click', () => {
            shuffleArray(bubbles);
            arrangeBubbles();
        });

        function shuffleArray(array) {
            let currentIndex = array.length, randomIndex;

            while (currentIndex !== 0) {
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }

        function updateBubbles() {
            bubbles.forEach(bubble => {
                const bubbleTags = bubble.skill.tags;
                const hasActiveTag = activeTags.size > 0 && Array.from(activeTags).some(activeTag => bubbleTags.includes(activeTag));

                if (hasActiveTag) {
                    bubble.element.isMatch = true;
                    bubble.element.classList.add('expanded');
                } else {
                    bubble.element.isMatch = false;
                    bubble.element.classList.remove('expanded');
                }
            });

            arrangeBubbles();
        }

        function setupTagButtonListeners() {
            const tagButtons = document.querySelectorAll('.tag-button');
            const activeTagsFromUrl = getActiveTagsFromUrl();

            tagButtons.forEach(button => {
                const tag = button.dataset.tag;

                if (activeTagsFromUrl.includes(tag.toLowerCase())) {
                    activeTags.add(tag);
                    button.classList.add('active');
                }

                button.addEventListener('click', () => {
                    if (activeTags.has(tag)) {
                        activeTags.delete(tag);
                        button.classList.remove('active');
                    } else {
                        activeTags.add(tag);
                        button.classList.add('active');
                    }

                    updateBubbles();
                });
            });

            if (activeTags.size > 0) {
                updateBubbles();
            }
        }

        setupTagButtonListeners();

        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(arrangeBubbles, 100);
        });

    })
    .catch(error => console.error('Error fetching skills:', error));