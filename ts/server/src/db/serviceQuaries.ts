import { PostgreSQLHelper } from '@src/config/db';

const checkPatientIsConnectedToDoctor = async (patient_id: string,doctor_id: string) => {
    const connection = await PostgreSQLHelper.query('SELECT * FROM patient_doctor WHERE patient_id = $1 AND doctor_id = $2', [patient_id,doctor_id]);
    if (connection.length > 0) {
        return true;
    }
    return false;
}

const createPatientDoctorConnection = async (patient_id: string,doctor_id: string) => {
    const connection = await PostgreSQLHelper.query('INSERT INTO patient_doctor (patient_id,doctor_id) VALUES ($1,$2)', [patient_id,doctor_id]);
    if (connection.length > 0) {
        return true;
    }
    return false;
}

const createService = async (doctor_id: string,patient_id: string) => {
    const service = await PostgreSQLHelper.query('INSERT INTO services (doctor_id,patient_id) VALUES ($1,$2) RETURNING *', [doctor_id,patient_id]);
    if (service.length > 0) {
        return service[0];
    }
    return null;
}

export{
    checkPatientIsConnectedToDoctor,
    createPatientDoctorConnection,
    createService
};