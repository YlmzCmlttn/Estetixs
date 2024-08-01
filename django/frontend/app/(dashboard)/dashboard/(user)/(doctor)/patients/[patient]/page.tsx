import DoctorProfileContainer from "@/containers/doctor/profile";
import { headers } from 'next/headers'

import DoctorPatientDetailsContainer from "@/containers/dashboard/doctor/patient-details";
const PatientDetailsPage = ({params}) => {
    const headersList = headers();
    const role = headersList.get('x-user-role');
    return (
        
        <DoctorPatientDetailsContainer patient_id={params.patient}/>
     );
}

export default PatientDetailsPage;