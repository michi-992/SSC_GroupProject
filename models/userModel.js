// hardcoded - no data base yet
const users = [
    {
        id: 1,
        name: "Tony",
        surname: "Stark",
        hero: "Iron Man"
    },
    {
        id: 2,
        name: "Wanda",
        surname: "Maximoff",
        hero: "Scarlet Witch"
    },
    {
        id: 3,
        name: "Peter",
        surname: "Parker",
        hero: "Spider-Man"
    }
];

function getUsers() {
    return users;
}

function getUser(id) {
    let user = users.find(element => element.id === parseInt(id))
    if(typeof user !== "undefined") {
        return user;
    } else {
        console.log("error");
        return 'Error 404: This user could not be found.'
    }
}

const members = [
    {
        name: "Noëlle Jamöck",
        age: 20,
        codingExperience: "1 year",
        catchphrase: "'Eh, she's just being dramatic.'",
    },
    {
        name: "Caroline Mandl",
        age: 19,
        codingExperience: "4 years",
        catchphrase: "'CMD called me a general failure. Ouch.'",
    },
    {
        name: "Michaela Topalovic",
        age: 20,
        codingExperience: "1 semester",
        catchphrase: "'As creative as this quote.'",
    }
]

module.exports = {
    getUsers,
    getUser,
    members
}