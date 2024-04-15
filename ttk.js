const express = require('express');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/download-matches', (req, res) => {
    fs.readFile('matched_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading the file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const matchedData = JSON.parse(data);

        // Calculate compatibility score using Elo rating system
        matchedData.forEach((match) => {
            const sharedInterests = match.sharedInterests; // Number of shared interests
            const personalityMatch = match.personalityMatch; // Personality compatibility metric

            // Calculate compatibility score using a weighted sum of factors
            const compatibilityScore = sharedInterests * 0.6 + personalityMatch * 0.4;

            // Update match object with compatibility score
            match.compatibilityScore = compatibilityScore;
        });

        // Sort matched data by compatibility score (descending order)
        matchedData.sort((a, b) => b.compatibilityScore - a.compatibilityScore);

        // Convert matched data back to JSON
        const sortedMatchesJSON = JSON.stringify(matchedData, null, 2);

        // Set the appropriate headers for a JSON download
        res.setHeader('Content-disposition', 'attachment; filename=sorted_matches.json');
        res.setHeader('Content-type', 'application/json');

        // Send the JSON data as the response
        res.send(sortedMatchesJSON);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
