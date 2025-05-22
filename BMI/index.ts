import express from 'express';
import calculateBmi from './calculateBmi';
const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello World');
});

app.get('/bmi', (req, res) => {
  try {
    const { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight)))
      throw new Error('malformatted parameters');

    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({ height, weight, bmi });
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).json({ error: errorMessage });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
