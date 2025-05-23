import { isNotNumber } from './utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  exerciseHours: number[];
  targetAmount: number;
}

export const calculateExercise = (
  exerciseHours: number[],
  targetAmount: number
) => {
  const periodLength = exerciseHours.length;

  const trainingDays = exerciseHours.filter(day => day > 0).length;

  const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
  const average = totalHours / periodLength;
  const success = average >= targetAmount;
  let rating = 0;
  let ratingDescription = '';

  if (average >= targetAmount) {
    rating = 3;
    ratingDescription = 'You have met your target!';
  } else if (average >= targetAmount * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'bad';
  }

  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetAmount,
    average,
  };

  return result;
};

const parseExerciseArguments = (args: string[]): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  args.slice(2).forEach(arg => {
    if (isNotNumber(arg)) {
      throw new Error('Provided values were not numbers!');
    }
  });

  const targetAmount = Number(args[2]);
  const exerciseHours = args.slice(3).map(arg => Number(arg));

  return { targetAmount, exerciseHours };
};

if (require.main === module) {
  try {
    const { targetAmount, exerciseHours } = parseExerciseArguments(
      process.argv
    );
    const results = calculateExercise(exerciseHours, targetAmount);
    console.log(results);
  } catch (error: unknown) {
    let errorMessage = 'something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}
