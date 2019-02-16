import faker from 'faker';

export default function generateSong() {
  return {
    id: faker.random.number(),
    title: faker.lorem.sentence(4),
    album_pic: faker.image.imageUrl(),
    num_likes: faker.random.number(),
    num_plays: faker.random.number(),
    num_reposts: faker.random.number(),
    num_comments: faker.random.number(),
    album_id: faker.random.number(),
    playlistid: faker.random.number(),
    user_id: 1,
    username: faker.internet.userName(),
    primary_song_id: faker.random.number(119) + 1,
  };
}

export function generateSongs(size) {
  return Array(...Array(size)).map(() => generateSong());
}
