let users = [
    {
        "id":1,
        "name":"hassan",
        "role":"master"
    },
    {
        "id":2,
        "name":"pavel",
        "role":"insider"
    },
    {
        "id":3,
        "name":"viktor",
        "role":"common"
    },
    {
        "id":4,
        "name":"saleh",
        "role":"common"
    }
]

const findInsider = (insider) => {
    users = users.filter(user => user.role == insider)
}

export {users, findInsider}