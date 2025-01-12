// Add this at the beginning of the file
fetch(chrome.runtime.getURL("cross-page-assets/banner.html"))
    .then(function(response) {
        return response.text();
    })
    .then(function(data) {
        document.getElementById("banner_anchor").innerHTML = data;
        
        const bannerText = document.getElementById("banner_text");
        if (bannerText) {
            bannerText.onclick = function() {
                const indexPage = chrome.runtime.getURL("web_pages/index.html");
                window.location.href = indexPage;
            };
        }
    })
    .catch(function(error) {
        console.error('Error loading banner:', error);
    });

// Select elements
const form = document.getElementById('learning-form');
const recommendationBox = document.getElementById('recommendation');
const closeButton = document.getElementById('close-button');

// Handle form submission
form.addEventListener('submit', function (e) {
    e.preventDefault();  // Prevent form submission
    const recommendedLanguage = getRecommendation();  // Call function to get language recommendation
    
    // Display the recommendation
    document.getElementById('recommended-language').textContent = recommendedLanguage;
    recommendationBox.style.display = 'block';
});

// Close the recommendation popup
closeButton.addEventListener('click', function () {
    recommendationBox.style.display = 'none';
});

document.getElementById("learning-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from submitting normally

    // Get the values from the form
    const difficulty = document.getElementById("difficulty").value;
    const commitment = document.getElementById("commitment").value;
    const location = document.getElementById("location").value;

    // Check if all fields are filled
    if (!difficulty || !commitment || !location) {
        alert("Please fill in all the fields before submitting.");
        return;
    }

    // Region-specific languages
    const regions = {
        europe: ["Russian", "Turkish", "Spanish", "Portuguese", "French", "Italian", "German", "Dutch", "Swedish", "Danish", "Finnish", "Greek", "Norwegian", "Polish"],
        asia: ["Chinese", "Japanese", "Korean", "Hindi", "Vietnamese", "Indonesian", "Arabic"],
        americas: ["Spanish", "Portuguese", "French"],  // Merged South and North America
    };

    // Languages categorized by difficulty
    const easyLanguages = ["Spanish", "Portuguese", "French", "Italian", "Swedish", "Dutch", "Danish"];
    const mediumLanguages = ["German", "Polish", "Russian", "Turkish", "Indonesian", "Vietnamese", "Russian", "Finnish", "Norwegian", "Polish"];
    const hardLanguages = ["Arabic", "Chinese", "Japanese", "Korean", "Hindi", "Greek"];

    // Filter languages by region
    let regionLanguages = regions[location.toLowerCase()] || [];

    // Filter based on difficulty level
    let difficultyLanguages = [];
    if (difficulty === "easy") {
        difficultyLanguages = regionLanguages.filter(lang => easyLanguages.includes(lang));
    } else if (difficulty === "medium") {
        difficultyLanguages = regionLanguages.filter(lang => mediumLanguages.includes(lang));
    } else if (difficulty === "hard") {
        difficultyLanguages = regionLanguages.filter(lang => hardLanguages.includes(lang));
    }

    // Filter based on learning commitment
    let commitmentLanguages = [];
    if (commitment === "casual") {
        commitmentLanguages = difficultyLanguages.filter(lang => easyLanguages.includes(lang));
    } else if (commitment === "medium") {
        commitmentLanguages = difficultyLanguages.filter(lang => mediumLanguages.includes(lang));
    } else if (commitment === "intensive") {
        commitmentLanguages = difficultyLanguages.filter(lang => hardLanguages.includes(lang));
    }

    // Determine the best match
    let recommendedLanguage = "";

    // If a match in all three criteria
    if (commitmentLanguages.length > 0) {
        recommendedLanguage = commitmentLanguages[Math.floor(Math.random() * commitmentLanguages.length)];
    }
    // If a match in two criteria
    else if (difficultyLanguages.length > 0) {
        recommendedLanguage = difficultyLanguages[Math.floor(Math.random() * difficultyLanguages.length)];
    }
    // If a match in one or no criteria, pick a random language from the region excluding "Spanish"
    else if (regionLanguages.length > 0) {
        // Filter out "Spanish" from regionLanguages and pick a random language
        const filteredRegionLanguages = regionLanguages.filter(lang => lang !== "Spanish");
        recommendedLanguage = filteredRegionLanguages[Math.floor(Math.random() * filteredRegionLanguages.length)];
    } else {
        // Fallback language if no region languages
        recommendedLanguage = "Spanish";  // Default to a common language if no region match
    }

    // Show the recommendation
   // Show the recommendation
   const recommendation = document.getElementById("recommendation");
   recommendation.style.display = "block";
   document.getElementById("recommended-language").innerText = `We recommend you learn:\n\n${recommendedLanguage}`;

});
