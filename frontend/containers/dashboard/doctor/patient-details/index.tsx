import getPatientDetailsAction from '@/actions/doctor/getPatientsDetails';
import Link from 'next/link';
const DoctorMyPatientsContainer = async ({patient_id}) => {
    const patient = await getPatientDetailsAction(patient_id);
    console.log("DoctorMyPatientsContainer")
    console.log(patient);
    return ( 
        <>
            {patient && (
                <div key={patient.username}>
                    <p>Username: {patient.username}</p>
                    {patient.services && patient.services.length > 0 && (
                        <ul>
                            {patient.services.map((service) => (
                                <li key={service.id}>
                                    <Link href={`/dashboard/services/${service.id}`}>
                                    Service ID: {service.id}, Service Type: {service.type_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </>
    );
}
 
export default DoctorMyPatientsContainer;