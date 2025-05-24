import patients from '../../data/patients';
import { NewPatientEntry, NonSensitivePatientInfo, Patient } from '../types';
import { v1 as uuid } from 'uuid';

const getNonSensitivePatientInfo = (): NonSensitivePatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatients = (): Patient[] => {
  return patients;
};

const addPatient = (object: NewPatientEntry): Patient => {
  const newPatient = {
    id: uuid(),
    ...object,
  };

  patients.push(newPatient);

  return newPatient;
};

export default { getPatients, getNonSensitivePatientInfo, addPatient };
