const db = require("../services/database").config;

// Function to get all quiz questions
let getQuestions = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM quiz_questions", function (err, questions, fields) {
        if (err) {
            reject(err); // Reject with error if query fails
        } else {
            resolve(questions); // Resolve with the retrieved questions data
        }
    });
});

// Function to determine the nation based on quiz answers
function determineNation(answers) {
    // Initialize counters for each answer option
    let answersA = 0;
    let answersB = 0;
    let answersC = 0;
    let answersD = 0;

    // Iterate over the values of the answers object
    Object.values(answers).forEach(value => {
        // Count the occurrences of each answer option
        if (value === 'A') {
            answersA++;
        } else if (value === 'B') {
            answersB++;
        } else if (value === 'C') {
            answersC++;
        } else if (value === 'D') {
            answersD++;
        }
    });

    // Create an object mapping each nation to its corresponding points
    const nationPoints = {
        'Fire Nation': answersA,
        'Air Nomads': answersB,
        'Water Tribe': answersC,
        'Earth Kingdom': answersD,
    };

    // Sort the nation points in descending order based on the points
    const sortedPoints = Object.entries(nationPoints).sort((a, b) => b[1] - a[1]);

    // Get the nation with the highest points (the first entry after sorting)
    const highestPoints = sortedPoints[0];
    const nation = highestPoints[0];

    // Return the determined nation
    return nation;
};

// Function to save the determined nation for a user
let saveNation = (uID, nation) => new Promise((resolve, reject) => {
    const sql = 'SELECT COUNT(*) AS count FROM users_nation WHERE userID = ?';
    db.query(sql, [uID], function (err, results) {
        if (err) {
            reject(err); // Reject with error if query fails
        } else {
            const count = results[0].count;
            if (count > 0) {
                const updateQuery = 'UPDATE users_nation SET nation = ? WHERE userID = ?';
                db.query(updateQuery, [nation, uID], function (err, updateResults) {
                    if (err) {
                        reject(err); // Reject with error if update query fails
                    } else {
                        resolve(updateResults); // Resolve with the update results
                    }
                });
            } else {
                const insertQuery = 'INSERT INTO users_nation (userID, nation) VALUES (?, ?)';
                db.query(insertQuery, [uID, nation], function (err, insertResults) {
                    if (err) {
                        reject(err); // Reject with error if insert query fails
                    } else {
                        resolve(insertResults); // Resolve with the insert results
                    }
                });
            }
        }
    });
});

// Function to delete the determined nation for a user
let deleteNation = (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM users_nation WHERE userID=?', [id], function (err, result) {
        if (err) {
            reject(err); // Reject with error if query fails
        }
        resolve(); // Resolve when the deletion is successful
    });
});

module.exports = {
    getQuestions,
    determineNation,
    saveNation,
    deleteNation
};