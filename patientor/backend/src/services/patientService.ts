import patients from '../../data/patients';
import { NonSensitivePatientInfo, Patient } from '../types';

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

export default { getPatients, getNonSensitivePatientInfo };
