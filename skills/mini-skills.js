fetch('skills/skills.json')
    .then(response => response.json())
    .then(skills => {
        const container = document.getElementById('skills-icons-container');
        
        const shuffledSkills = shuffleArray(skills).slice(0, 12);

        shuffledSkills.forEach(skill => {
            const iconElement = document.createElement('img');
            iconElement.src = skill.icon;
            iconElement.alt = `${skill.title} Icon`;
            iconElement.className = 'skill-icon';
            container.appendChild(iconElement);
        });
    })
    .catch(error => console.error('Error fetching skills:', error));

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