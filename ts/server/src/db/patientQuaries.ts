import { PostgreSQLHelper } from '@src/config/db';

const getPatientIdFromDb = async (user_id: string) => {
    const existingPatient = await PostgreSQLHelper.query('SELECT * FROM patients WHERE user_id = $1', [user_id]);
    if (existingPatient.length > 0) {
        return existingPatient[0];
    }
    return null;
}

const getMyDoctors = async (patient_id : string) => {
    const query = `
        SELECT u.fullname, d.title, d.doctor_url
        FROM patient_doctor pd
        INNER JOIN doctors d ON pd.doctor_id = d.id
        INNER JOIN users u ON d.user_id = u.id
        WHERE pd.patient_id = $1;
    `;
    const myDoctors = await PostgreSQLHelper.query(query, [patient_id]);
    return myDoctors;
}

const getMyServices = async (patient_id : string) => {
    const query = `
        SELECT u.fullname, d.doctor_url, srvcs.status, srvcs.id
        FROM services srvcs
        INNER JOIN doctors d ON srvcs.doctor_id = d.id
        INNER JOIN users u ON d.user_id = u.id
        WHERE srvcs.patient_id = $1;
    `;
    const myServices = await PostgreSQLHelper.query(query, [patient_id]);
    return myServices;
}


export{
    getPatientIdFromDb,
    getMyDoctors,
    getMyServices
};