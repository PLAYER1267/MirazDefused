const fs = require('fs');
const csv = require('csv-parser');

// Function to calculate compatibility score between two users
function calculateCompatibility(user1, user2) {
    // Example: Calculate compatibility based on age proximity, shared interests, and location similarity
    const ageDifference = Math.abs(user1.age - user2.age);
    const interestsMatch = calculateInterestsMatch(user1.interests, user2.interests);
    const locationMatch = user1.state === user2.state ? 1 : 0;

    // Weighted sum of factors (you can adjust weights based on importance)
    const compatibilityScore = 0.4 * (1 - ageDifference / 100) + 0.4 * interestsMatch + 0.2 * locationMatch;

    return compatibilityScore;
}

// Function to calculate match based on shared interests
function calculateInterestsMatch(interests1, interests2) {
    const commonInterests = interests1.filter(interest => interests2.includes(interest));
    return commonInterests.length / Math.max(interests1.length, interests2.length);
}

// Read user data from CSV file
const users = [];
fs.createReadStream('users.csv')
    .pipe(csv())
    .on('data', (row) => {
        // Process each row and extract relevant user information
        const user = {
            name: row.Name,
            age: parseInt(row.Age),
            interests: row.Interests.split(',').map(interest => interest.trim()),
            state: row.State
        };
        users.push(user);
    })
    .on('end', () => {
        // Matchmaking: Calculate compatibility scores between users
        const matches = [];
        for (let i = 0; i < users.length; i++) {
            for (let j = i + 1; j < users.length; j++) {
                const compatibility = calculateCompatibility(users[i], users[j]);
                matches.push({ user1: users[i], user2: users[j], compatibility });
            }
        }

        // Sort matches based on compatibility score (descending order)
        matches.sort((a, b) => b.compatibility - a.compatibility);

        // Output or display the sorted list of matches
        console.log('Top Matches:');
        matches.forEach((match, index) => {
            console.log(`${index + 1}: ${match.user1.name} and ${match.user2.name}, Compatibility Score: ${match.compatibility}`);
        });
    });
