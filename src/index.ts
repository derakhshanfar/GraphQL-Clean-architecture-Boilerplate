import server from './application';
import s from './persistence/database/model';

const port = process.env.PORT || 3000;

server.listen(port).then(async ({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
  await s();
});
