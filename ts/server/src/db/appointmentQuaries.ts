import { PostgreSQLHelper } from '@src/config/db';

const createAppointment = async (doctor_id: string, patient_id: string, appointment_time: string) => {
    try {
        await PostgreSQLHelper.query('BEGIN');
        const newAppointment = await PostgreSQLHelper.query(
            'INSERT INTO appointments(doctor_id, patient_id, appointment_time) VALUES($1, $2, $3) RETURNING id, doctor_id, patient_id, appointment_time',
            [doctor_id, patient_id, appointment_time]
        );    
        await PostgreSQLHelper.query('COMMIT');
        return newAppointment[0];
    } catch (error) {
        await PostgreSQLHelper.query('ROLLBACK');
        throw error;
    }    
};



export{
    createAppointment
};
