import express from 'express';
import calculateBmi from './calculateBmi';
import { calculateExercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.get('/exercises', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;

    if (!daily_exercises || !target) throw new Error('parameters missing');
    if (
      isNaN(Number(target)) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      daily_exercises.some((e: any) => isNaN(Number(e)))
    )
      throw new Error('malformatted parameters');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const results = calculateExercise(daily_exercises, target);
    res.json(results);
  } catch (error: unknown) {
    let errorMessage = '';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send({ error: errorMessage });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
