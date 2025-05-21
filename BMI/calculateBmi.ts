import { isNotNumber } from './utils';

interface BmiArguments {
  height: number;
  weight: number;
}

const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    return 'Height and weight must be positive numbers.';
  }

  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    return 'Normal (healthy weight)';
  } else if (bmi >= 25 && bmi < 29.9) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
};

const parseBmiArguments = (args: string[]): BmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 5) throw new Error('Too much arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('arguments provided were not numbers!');
  }
};

try {
  const { height, weight } = parseBmiArguments(process.argv);
  const results = calculateBmi(height, weight);
  console.log(results);
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
