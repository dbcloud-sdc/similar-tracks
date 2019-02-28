import faker from 'faker';

export default function generateUser() {
  const id = faker.random.number({ min: 1, max: 120 });
  return {
    id,
    username: faker.internet.userName(),
    followers: faker.random.number(),
    pic: `https://s3.us-east-2.amazonaws.com/zluserpics/user_${id}.jpg`,
    city: faker.address.city(),
    ustate: faker.address.state(),
    country: faker.address.country(),
    pro_user: faker.random.boolean(),
  };
}

export function generateUsers(size) {
  return Array(...Array(size)).map(() => generateUser());
}
