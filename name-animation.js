const sharedStart = "Kyllan";
const endings = [" Wunder", ".dev"];
let currentEndingIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeAnimation() {
    const typingDiv = document.getElementById("typing");
    let currentText = sharedStart + endings[currentEndingIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typingDiv.innerHTML = currentText.substring(0, charIndex);

    if (!isDeleting && charIndex === currentText.length) {
        // Pause before deleting the ending
        setTimeout(() => { isDeleting = true; }, 1000);
    } else if (isDeleting && charIndex === sharedStart.length) {
        isDeleting = false;
        currentEndingIndex = (currentEndingIndex + 1) % endings.length; // Cycle through endings
        setTimeout(typeAnimation, 500); // Pause before starting the next ending
        return;
    }

    const typingSpeed = isDeleting ? 200 : 250;
    setTimeout(typeAnimation, typingSpeed);
}

document.addEventListener('DOMContentLoaded', typeAnimation);