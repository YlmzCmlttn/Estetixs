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

const getMyDoctorConnections = async (patient_id: string) => {
    const connections = await PostgreSQLHelper.query('SELECT * FROM patient_doctor WHERE patient_id = $1', [patient_id]);
    if (connections.length > 0) {
        return connections;
    }
    return null;
}
    

export{
    checkPatientIsConnectedToDoctor,
    createPatientDoctorConnection,
    getMyDoctorConnections
};