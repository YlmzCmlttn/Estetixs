import DoctorServicesContainer from "@/containers/dashboard/doctor/services";
import PatientServicesContainer from "@/containers/dashboard/patient/services";
import { headers } from 'next/headers'
function ServicesPage() {
    const headersList = headers();
    const role = headersList.get('x-user-role');
    return (
        <>
        {role === 'Doctor' && <DoctorServicesContainer/> }
        {role === 'Patient' && <PatientServicesContainer/> }
        </>
     );
}

export default ServicesPage;