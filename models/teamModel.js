const db = require('../services/database.js').config;

// Function to get all ATLA characters
let getCharacters = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM atla_characters", function (err, characters, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        } else {
            for (let i = 0; i < characters.length; i++) {
                characters[i].pictureName = characters[i].atlaCharacter.replace(/\s/g, '') + '.png';
            }
            resolve(characters); // Resolve with the retrieved characters data
        }
    });
});

// Function to create a team
let createTeam = (teamData) => new Promise((resolve, reject) => {
    const sql = "INSERT INTO users_team SET " +
        "userID = " + db.escape(teamData.userID) +
        ", teamName = " + db.escape(teamData.teamName) +
        ", member_1 = " + db.escape(teamData.member_1 ? teamData.member_1 : '') +
        ", member_2 = " + db.escape(teamData.member_2 ? teamData.member_2 : '') +
        ", member_3 = " + db.escape(teamData.member_3 ? teamData.member_3 : '') +
        ", member_4 = " + db.escape(teamData.member_4 ? teamData.member_4 : '');
    db.query(sql, function (err, result, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        }
        resolve(teamData); // Resolve with the created team data
    });
});

// Function to get teams by user ID
let getTeamsByID = (id) => new Promise((resolve, reject) => {
    const sql ='SELECT * FROM users_team WHERE userID = ?';
    db.query(sql, [id], function (err, teams, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        } else {
            resolve(teams); // Resolve with the retrieved teams data
        }
    });
});

// Function to delete a team by ID
let deleteTeam = (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM users_team WHERE id=?', [id], function (err, result) {
        if (err) {
            reject(err); // Reject with error if query fails
        }
        resolve(id); // Resolve with the deleted team ID
    });
});

module.exports = {
    getCharacters,
    createTeam,
    getTeamsByID,
    deleteTeam
};
