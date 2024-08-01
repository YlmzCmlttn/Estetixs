import DoctorProfileContainer from "@/containers/doctor/profile";
import { headers } from 'next/headers'

import DoctorServiceDetailsContainer from "@/containers/dashboard/doctor/service-details";
import PatientServiceDetailsContainer from "@/containers/dashboard/patient/service-details";
const ServiceDetailsPage = ({params}) => {
    const headersList = headers();
    const role = headersList.get('x-user-role');
    return (
        <>
        {role === 'DOCTOR' && <DoctorServiceDetailsContainer service_id={params.service}/> }
        {role === 'PATIENT' && <PatientServiceDetailsContainer/> }
        </>
     );
}

export default ServiceDetailsPage;