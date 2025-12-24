// Sample data of students and their interests
const students = [
    { name: "Alice Johnson", interests: ["science", "technology", "music"], emoji: "👩‍🔬" },
    { name: "Bob Smith", interests: ["art", "literature", "travel"], emoji: "👨‍🎨" },
    { name: "Charlie Davis", interests: ["gaming", "sports", "technology"], emoji: "👨‍💻" },
    { name: "Diana Martinez", interests: ["music", "travel", "art"], emoji: "👩‍🎤" },
    { name: "Emma Wilson", interests: ["science", "literature", "photography"], emoji: "👩‍🔬" },
    { name: "Frank Brown", interests: ["sports", "cooking", "travel"], emoji: "👨‍🍳" },
    { name: "Grace Lee", interests: ["technology", "gaming", "music"], emoji: "👩‍💻" },
    { name: "Henry Taylor", interests: ["art", "photography", "literature"], emoji: "👨‍🎨" },
    { name: "Isabella Garcia", interests: ["cooking", "travel", "music"], emoji: "👩‍🍳" },
    { name: "Jack Anderson", interests: ["sports", "gaming", "technology"], emoji: "👨‍💼" }
];

// Function to find the most compatible match
function findMatch() {
    // Prevent form submission
    event.preventDefault();

    // Get user's name and interests from the form
    const userName = document.getElementById("name").value;
    const userInterests = Array.from(document.getElementById("interests").selectedOptions).map(option => option.value);

    // Validate that at least one interest is selected
    if (userInterests.length === 0) {
        alert("Please select at least one interest!");
        return false;
    }

    // Find the most compatible match based on shared interests
    let bestMatch = null;
    let maxSharedInterests = 0;

    students.forEach(student => {
        const sharedInterests = student.interests.filter(interest => userInterests.includes(interest));
        
        if (sharedInterests.length > maxSharedInterests) {
            maxSharedInterests = sharedInterests.length;
            bestMatch = { ...student, sharedInterests };
        }
    });

    // Display the match result
    const matchResultDiv = document.getElementById("match-result");
    matchResultDiv.style.display = "block";

    if (bestMatch && maxSharedInterests > 0) {
        const sharedInterestsList = bestMatch.sharedInterests
            .map(interest => interest.charAt(0).toUpperCase() + interest.slice(1))
            .join(", ");
        
        matchResultDiv.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 20px;">${bestMatch.emoji}</div>
            <h3>Your Best Match: ${bestMatch.name}!</h3>
            <p style="font-size: 1.2em; margin-top: 15px;">
                You have ${maxSharedInterests} shared interest${maxSharedInterests > 1 ? 's' : ''}
            </p>
            <p style="font-size: 1.1em; opacity: 0.9; margin-top: 10px;">
                ${sharedInterestsList}
            </p>
            <p style="margin-top: 20px; font-size: 1em;">
                🎉 Time to connect and share your passions!
            </p>
        `;
    } else {
        matchResultDiv.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 20px;">🔍</div>
            <h3>No perfect match found yet</h3>
            <p style="margin-top: 15px;">Try selecting different interests or check back later for new students!</p>
        `;
    }

    // Smooth scroll to result
    matchResultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    return false; // Prevent form from submitting
}