import faker from 'faker';

export default function generateSong() {
  return {
    id: faker.random.number(),
    title: faker.lorem.sentence(),
    album_pic: faker.image.imageUrl(),
    num_likes: faker.random.number(),
    num_plays: faker.random.number(),
    num_reposts: faker.random.number(),
    num_comments: faker.random.number(),
    album_id: faker.random.number(),
    playlistid: faker.random.number(),
    user_id: faker.random.number(),
  };
}

export function generateSongs(size) {
  return Array(...Array(size)).map(() => generateSong());
}
