// Sample student data for demonstration
const students = [
    { name: "Alex Kumar", course: "btech", studyMethod: "solo", studyTime: "morning", emoji: "👨‍💻", bio: "Loves coding in the quiet morning hours" },
    { name: "Priya Sharma", course: "mba", studyMethod: "group", studyTime: "afternoon", emoji: "👩‍💼", bio: "Team player who thrives in collaborative environments" },
    { name: "Rahul Verma", course: "bcom", studyMethod: "discussion", studyTime: "evening", emoji: "👨‍💼", bio: "Enjoys debating concepts and learning together" },
    { name: "Sneha Patel", course: "btech", studyMethod: "mixed", studyTime: "night", emoji: "👩‍🔬", bio: "Flexible learner who adapts to different styles" },
    { name: "Arjun Reddy", course: "ba-la", studyMethod: "solo", studyTime: "night", emoji: "👨‍🎓", bio: "Night owl who loves deep focused work" },
    { name: "Ananya Iyer", course: "bsc", studyMethod: "group", studyTime: "morning", emoji: "👩‍🔬", bio: "Morning person who loves collaborative problem-solving" },
    { name: "Vikram Singh", course: "bba-llb", studyMethod: "discussion", studyTime: "afternoon", emoji: "👨‍⚖️", bio: "Passionate about legal debates and case studies" },
    { name: "Meera Das", course: "ma", studyMethod: "solo", studyTime: "evening", emoji: "👩‍🎨", bio: "Creative thinker who prefers quiet study sessions" },
    { name: "Rohan Joshi", course: "btech", studyMethod: "group", studyTime: "latenight", emoji: "👨‍💻", bio: "Coding enthusiast who works best late at night" },
    { name: "Kavya Nair", course: "bcom", studyMethod: "mixed", studyTime: "morning", emoji: "👩‍💼", bio: "Early riser with a balanced approach to learning" }
];

// Function to find a study buddy
function findStudyBuddy() {
    event.preventDefault();

    const userName = document.getElementById('name').value;
    const userCourse = document.getElementById('course').value;
    const userStudyMethod = document.getElementById('study-method').value;
    const userStudyTime = document.getElementById('study-time').value;

    // Validate all fields are selected
    if (!userCourse || !userStudyMethod || !userStudyTime) {
        alert("Please fill in all fields!");
        return false;
    }

    // Find matches with scoring system
    let matches = students.map(student => {
        let score = 0;
        let matchDetails = [];

        // Course match (highest priority - 3 points)
        if (student.course === userCourse) {
            score += 3;
            matchDetails.push("Same course");
        }

        // Study method match (2 points)
        if (student.studyMethod === userStudyMethod || student.studyMethod === "mixed" || userStudyMethod === "mixed") {
            score += 2;
            matchDetails.push("Compatible study style");
        }

        // Study time match (2 points)
        if (student.studyTime === userStudyTime) {
            score += 2;
            matchDetails.push("Same study time");
        }

        return { ...student, score, matchDetails };
    }).filter(student => student.score > 0)
      .sort((a, b) => b.score - a.score);

    // Display the result
    const resultDiv = document.getElementById('buddy-result');
    resultDiv.style.display = "block";

    if (matches.length > 0) {
        const topMatch = matches[0];
        const compatibility = Math.round((topMatch.score / 7) * 100);
        
        let resultHTML = `
            <div style="font-size: 80px; margin-bottom: 20px;">${topMatch.emoji}</div>
            <h3>Your Best Study Buddy: ${topMatch.name}!</h3>
            <p style="font-size: 1.2em; margin-top: 15px;">
                ${compatibility}% Compatibility Match
            </p>
            <p style="font-size: 1em; opacity: 0.9; margin-top: 10px; font-style: italic;">
                "${topMatch.bio}"
            </p>
            <div style="margin-top: 20px; padding: 20px; background: rgba(255, 255, 255, 0.2); border-radius: 10px;">
                <strong>Match Details:</strong>
                <ul style="list-style: none; padding: 0; margin-top: 10px;">
                    ${topMatch.matchDetails.map(detail => `<li style="margin: 5px 0;">✅ ${detail}</li>`).join('')}
                </ul>
            </div>
        `;

        // Show other potential matches
        if (matches.length > 1) {
            resultHTML += `
                <div style="margin-top: 30px;">
                    <h4 style="font-size: 1.3em; margin-bottom: 15px;">Other Compatible Buddies:</h4>
                    <div style="display: flex; gap: 15px; flex-wrap: wrap; justify-content: center;">
            `;
            
            matches.slice(1, 4).forEach(match => {
                const matchCompatibility = Math.round((match.score / 7) * 100);
                resultHTML += `
                    <div style="background: rgba(255, 255, 255, 0.2); padding: 15px; border-radius: 10px; text-align: center; min-width: 150px;">
                        <div style="font-size: 40px;">${match.emoji}</div>
                        <strong>${match.name}</strong>
                        <div style="font-size: 0.9em; margin-top: 5px;">${matchCompatibility}% Match</div>
                    </div>
                `;
            });
            
            resultHTML += `
                    </div>
                </div>
            `;
        }

        resultHTML += `
            <p style="margin-top: 30px; font-size: 1em;">
                🎉 Connect with your study buddy and ace those exams together!
            </p>
        `;

        resultDiv.innerHTML = resultHTML;
    } else {
        resultDiv.innerHTML = `
            <div style="font-size: 80px; margin-bottom: 20px;">🔍</div>
            <h3>No Perfect Match Found Yet</h3>
            <p style="margin-top: 15px;">Don't worry! Try adjusting your preferences or check back later as more students join.</p>
            <p style="margin-top: 10px;">💡 Tip: Try selecting "Mixed" for study method to find more compatible buddies!</p>
        `;
    }

    // Smooth scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    return false;
}