import * as express from 'express';

const app = express();

app.use(express.json());

app.all('/', (req, res) => {
  return res.send('Consumer is running');
})

export default app;