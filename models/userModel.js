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
        return 'Error 404: This user could not be found.'
    }
}

module.exports = {
    getUsers,
    getUser,
}


