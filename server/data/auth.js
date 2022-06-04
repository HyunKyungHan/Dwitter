//abcd1234: $9fjsn4nTj23dkfing8%skd491n2Ncx
let users = [
    {
        id: '1',
        username: 'bob',
        password: '$9fjsn4nTj23dkfing8%skd491n2Ncx',
        name: 'Bob',
        email: 'bob@gmail.com',
        url: 'https://widgewhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
    },
    {
        id: '2',
        username: 'kim',
        password: '$9fjsn4nTj23dkfing8%skd491n2Ncx',
        name: 'Kim',
        email: 'kim@gmail.com',
    },
];

export async function findByUsername(username) {   //존재하는 유저인지 확인하기
    return users.find((user) => user.username === username);
}

export async function findById(id) {  //주어진 id의 사용자가 있는지 확인하고 있다면 return하기
    return users.find((user) => user.id === id);
}

export async function createUser(user) {   //새로운 유저 만들기
    const created = { ...user, id:Date.now().toString() };
    users.push(created);
    return created.id;
}