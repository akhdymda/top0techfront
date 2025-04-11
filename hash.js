import { hash } from 'bcryptjs';

(async () => {
  const hashed = await hash("password123", 10);
  console.log(hashed);
})();
