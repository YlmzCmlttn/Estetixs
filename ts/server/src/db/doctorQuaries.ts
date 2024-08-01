import { PostgreSQLHelper } from '@src/config/db';

const getDoctorIdFromDb = async (user_id: string) => {
    const existingDoctor = await PostgreSQLHelper.query('SELECT * FROM doctors WHERE user_id = $1', [user_id]);
    if (existingDoctor.length > 0) {
        return existingDoctor[0];
    }
    return null;
}

const getDoctorIdWithDoctorNameFromDb = async (doctor_url: string) => {
    const existingDoctor = await PostgreSQLHelper.query('SELECT * FROM doctors WHERE doctor_url = $1', [doctor_url]);
    if (existingDoctor.length > 0) {
        return existingDoctor[0];
    }
    return null;
}

const getMyServices = async (doctor_id : string) => {
    const query = `
        SELECT u.fullname, srvcs.status, srvcs.id
        FROM services srvcs
        INNER JOIN patients d ON srvcs.patient_id = d.id
        INNER JOIN users u ON d.user_id = u.id
        WHERE srvcs.doctor_id = $1;
    `;
    const myServices = await PostgreSQLHelper.query(query, [doctor_id]);
    return myServices;
}

const getMyPatients = async (doctor_id : string) => {
    const query = `
        SELECT u.fullname, p.id
        FROM patient_doctor pd
        INNER JOIN patients p ON pd.patient_id = p.id
        INNER JOIN users u ON p.user_id = u.id
        WHERE pd.doctor_id = $1;
    `;
    const myPatients = await PostgreSQLHelper.query(query, [doctor_id]);
    return myPatients;
}

export{
    getDoctorIdFromDb,
    getDoctorIdWithDoctorNameFromDb,
    getMyServices,
    getMyPatients
};