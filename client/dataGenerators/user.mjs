import faker from 'faker';

export default function generateUser() {
  return {
    id: faker.random.number(),
    username: faker.internet.userName(),
    followers: faker.random.number(),
    pic: faker.image.imageUrl(),
    city: faker.address.city(),
    ustate: faker.address.state(),
    country: faker.address.country(),
    pro_user: faker.random.boolean(),
  };
}

export function generateUsers(size) {
  return Array(...Array(size)).map(() => generateUser());
}
