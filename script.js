
// Countdown Timer for "Deals Of The Day"
function startCountdown() {
    const timerElement = document.querySelector("#c_i_1 p");
    let hours = 20, minutes = 25, seconds = 18;

    setInterval(() => {
        if (seconds === 0) {
            if (minutes === 0) {
                if (hours === 0) {
                    timerElement.textContent = "Deal Ended";
                    return;
                }
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }
        timerElement.textContent = `\u231A ${hours.toString().padStart(2, '0')} : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// Mock Search Suggestions
function setupSearchSuggestions() {
    const searchInput = document.querySelector("#search-bar");
    const suggestions = ["Mobile", "Shoes", "Books", "Electronics", "Home Appliances", "Fashion"];
    const suggestionBox = document.createElement("ul");
    suggestionBox.style.position = "absolute";
    suggestionBox.style.background = "white";
    suggestionBox.style.border = "1px solid #ccc";
    suggestionBox.style.listStyle = "none";
    suggestionBox.style.margin = 0;
    suggestionBox.style.padding = "5px";
    suggestionBox.style.width = "500px";
    suggestionBox.style.zIndex = 1000;
    suggestionBox.style.display = "none";
    document.body.appendChild(suggestionBox);

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionBox.innerHTML = "";
        if (query) {
            const filtered = suggestions.filter(item => item.toLowerCase().includes(query));
            filtered.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                li.style.cursor = "pointer";
                li.addEventListener("click", () => {
                    searchInput.value = item;
                    suggestionBox.style.display = "none";
                });
                suggestionBox.appendChild(li);
            });
            suggestionBox.style.display = filtered.length ? "block" : "none";
            const rect = searchInput.getBoundingClientRect();
            suggestionBox.style.top = `${rect.bottom + window.scrollY}px`;
            suggestionBox.style.left = `${rect.left + window.scrollX}px`;
        } else {
            suggestionBox.style.display = "none";
        }
    });

    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionBox.contains(e.target)) {
            suggestionBox.style.display = "none";
        }
    });
}

// Carousel Autoplay Toggle
function setupCarouselAutoplay() {
    const carousel = document.querySelector("#carouselExampleControls");
    let autoplay = true;
    const autoplayButton = document.createElement("button");
    autoplayButton.textContent = "Pause Carousel";
    autoplayButton.style.position = "fixed";
    autoplayButton.style.bottom = "10px";
    autoplayButton.style.right = "10px";
    autoplayButton.style.zIndex = 1000;
    autoplayButton.classList.add("btn", "btn-primary");

    document.body.appendChild(autoplayButton);

    autoplayButton.addEventListener("click", () => {
        if (autoplay) {
            $(carousel).carousel('pause');
            autoplayButton.textContent = "Resume Carousel";
        } else {
            $(carousel).carousel('cycle');
            autoplayButton.textContent = "Pause Carousel";
        }
        autoplay = !autoplay;
    });
}

// Initialize all features on page load
document.addEventListener("DOMContentLoaded", () => {
    startCountdown();
    setupSearchSuggestions();
    setupCarouselAutoplay();
});
