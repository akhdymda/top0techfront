import { compare } from 'bcryptjs';

const users = [
  {
    id: 1,
    name: '山田太郎',
    email: 'yamada@example.com',
    password_hash: '$2b$10$XhWzQ./1XZHWMok/0UEjO.VriYnMFpTx7DQkmVZhNkje/8RL6HOlC', // ←ここに貼る
  },
];

export async function getUserByEmail(email) {
  return users.find((user) => user.email === email);
}
