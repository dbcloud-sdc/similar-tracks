import faker from 'faker';

export default function generatePlaylist() {
  return {
    id: faker.random.number(),
    username: faker.internet.userName(),
    pic: faker.image.imageUrl(),
    title: faker.lorem.sentence(5),
    num_likes: faker.random.number(),
    num_reposts: faker.random.number(),
    song_id: 1,
  };
}

export function generatePlaylists(size) {
  return Array(...Array(size)).map(() => generatePlaylist());
}