// Function to fetch user profiles from CSV
function fetchUserProfiles() {
    fetch('dataset.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Exclude header row
            const profilesContainer = document.getElementById('profiles');
            rows.forEach(row => {
                const columns = row.split(',');
                const name = columns[0];
                const age = columns[1];
                const gender = columns[2];
                const hobby1 = columns[3];
                const hobby2 = columns[4];
                const mbti = columns[5];
                const state = columns[6];
                const avatar = gender === 'Male' ? getRandomAvatar('men') : getRandomAvatar('women');
                const profileHTML = `
                    <div class="profile">
                        <img src="${avatar}" alt="Avatar">
                        <h2>${name}</h2>
                        <p><strong>Age:</strong> ${age}</p>
                        <p><strong>Gender:</strong> ${gender}</p>
                        <p><strong>Hobbies:</strong> ${hobby1}, ${hobby2}</p>
                        <p><strong>MBTI:</strong> ${mbti}</p>
                        <p><strong>State:</strong> ${state}</p>
                    </div>
                `;
                profilesContainer.innerHTML += profileHTML;
            });
        })
        .catch(error => console.error('Error fetching user profiles:', error));
}

// Function to get a random avatar from the specified folder
function getRandomAvatar(folder) {
    const avatarFolder = `avatars/${folder}`;
    const avatars = [
        'a1.webp',
        'a2.webp',
        'a3.webp',
        'a4.webp',
        'a5.jpg',
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];
    return `${avatarFolder}/${randomAvatar}`;
}

// Fetch user profiles when the page loads
window.onload = fetchUserProfiles;
