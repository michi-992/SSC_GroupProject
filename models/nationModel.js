const db = require("../services/database").config;
let getQuestions = () => new Promise((resolve, reject) => {
    db.query("SELECT * FROM quiz_questions", function (err, questions, fields) {
        if (err) {
            console.log(err);
            reject(err)
        } else {
            resolve(questions)
        }
    })
})

function determineNation (answers) {
    let answersA = 0;
    let answersB = 0;
    let answersC = 0;
    let answersD = 0;

    Object.values(answers).forEach(value => {
        if (value === 'A') {
           answersA++;
        } else if (value === 'B') {
            answersB++;
        } else if (value === 'C') {
            answersC++;
        } else if (value === 'D') {
            answersD++;
        }
    })

    const nationPoints = {
        'Fire Nation': answersA,
        'Air Nomads': answersB,
        'Water Tribe': answersC,
        'Earth Kingdom': answersD,
    };
    const sortedPoints = Object.entries(nationPoints).sort((a, b) => b[1] - a[1]);

    const highestPoints = sortedPoints[0];
    const nation = highestPoints[0];

    return nation;
}

let saveNation = (uID, nation) => new Promise((resolve, reject) => {

    const sql = 'SELECT COUNT(*) AS count FROM users_nation WHERE userID = ?';
    const count = db.query(sql, [uID], function (err, results) {
        if (err) {
            reject(err);
        } else {
            const count = results[0].count;
            if (count > 0) {
                const updateQuery = 'UPDATE users_nation SET nation = ? WHERE userID = ?';
                db.query(updateQuery, [nation, uID], function (err, updateResults) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(updateResults);
                    }
                });
            } else {
                const insertQuery = 'INSERT INTO users_nation (userID, nation) VALUES (?, ?)';
                db.query(insertQuery, [uID, nation], function (err, insertResults) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(insertResults);
                    }
                });
            }
        }
    });
})

let deleteNation = (id) => new Promise((resolve, reject) => {
    db.query('DELETE FROM users_nation WHERE userID=?', [id], function (err, result) {
        if (err) {
            reject(err)
        }
        resolve();
    })
});

module.exports = {
    getQuestions,
    determineNation,
    saveNation,
    deleteNation
}