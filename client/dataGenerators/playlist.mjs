import faker from 'faker';

export default function generatePlaylist() {
  const id = faker.random.number({ min: 1, max: 60 });
  return {
    id,
    username: faker.internet.userName(),
    pic: `https://s3.us-east-2.amazonaws.com/zlplaylistpics/playlist_${id}.jpg`,
    title: faker.lorem.sentence(2),
    num_likes: faker.random.number(),
    num_reposts: faker.random.number(),
    song_id: 1,
  };
}

export function generatePlaylists(size) {
  return Array(...Array(size)).map(() => generatePlaylist());
}
