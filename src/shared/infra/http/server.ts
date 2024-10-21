import 'reflect-metadata';
import '../../container';

import { app } from './app';

const Port = 3333;

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
  console.log('Swagger docs available on http://localhost:3000/api-docs');
});

app.listen(`${Port}`, () => {
  return console.log(`Server started on port ${Port}! 🏆`);
});

export default app;
