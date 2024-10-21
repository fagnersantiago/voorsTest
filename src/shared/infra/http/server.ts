import 'reflect-metadata'; 
import '../../container';    
import { app } from './app';

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger docs available on http://localhost:${PORT}/api-docs`);
});

export default app;
