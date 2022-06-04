import * as userRepository from './auth.js';

let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId: '1', //이제 여기에 user의 name, email, url등을 직접 저장하지 않아도 됨 -> user가 수정할때마다 일일히 코드를 고치지 않아도 된다는 장점이 있음.
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: new Date().toString(),
    userId: '2',
  },
];

export async function getAll() {
  return Promise.all(             //promise를 이용해 해당 tweet의 userRepository를 돌면서 사용자 정보를 받아오고 tweet정보와 사용자 정보를 더함.
    tweets.map(async(tweet) => {    
      const { username, name, url } = await userRepository.findById(
        tweet.userId
      );
      return {...tweet, username, name, url };
    })
  );
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) => 
    tweets.filter((tweet) => tweet.username === username)
  );
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id);
  if (!found) {
    return null;
  }
}

export async function create(text, userId) {
  const tweet = {
    id: new Date().toString(),
    text,
    createdAt: new Date(),
    userId,
  };
  tweets = [tweet, ...tweets];
  return getById(tweet.id);
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (tweet) {
    tweet.text = text;
  }
  return getById(tweet.id);
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
}
