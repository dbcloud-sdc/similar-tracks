import faker from 'faker';

export default function generatePlaylist() {
  return {
    id: faker.random.number(),
    pic: faker.image.imageUrl(),
    title: faker.lorem.sentence(2),
    num_likes: faker.random.number(),
    num_reposts: faker.random.number(),
    song_id: faker.random.number(),
  };
}

export function generatePlaylists(size) {
  return Array(...Array(size)).map(() => generatePlaylist());
}
