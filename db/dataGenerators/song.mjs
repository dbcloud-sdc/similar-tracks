import faker from 'faker';

export default function generateSong() {
  const id = faker.random.number({ min: 1, max: 60 });
  return {
    id,
    title: faker.lorem.sentence(2),
    album_pic: `https://s3.us-east-2.amazonaws.com/zlsongalbumpics/songalbum_${id}.jpg`,
    num_likes: faker.random.number({ min: 0, max: 2000 }),
    num_plays: faker.random.number({ min: 0, max: 2000 }),
    num_reposts: faker.random.number({ min: 0, max: 60 }),
    num_comments: faker.random.number({ min: 0, max: 200 }),
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
