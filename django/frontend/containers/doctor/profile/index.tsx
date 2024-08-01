import { notFound } from 'next/navigation'
import Link from 'next/link';
import getDoctorProfileAction from "@/actions/profile/getDoctorProfile";
const DoctorProfileContainer = async ({doctor}) => {
    const doctorData = await getDoctorProfileAction(doctor);
    if(!doctorData){
        notFound();
    }
    return ( 
        <div>
            <h1>Doctor Profile Container</h1>
            <p>username: {doctorData['user_profile'].username}</p>
            <p>first_name: {doctorData['user_profile'].first_name}</p>
            <p>last_name: {doctorData['user_profile'].last_name}</p>
            <p>Service Types:</p>
            <ul>
                {doctorData['service_types'].map((service) => (
                    <li key={service.id}>
                        {service.service_type_name}
                        <p>Operations:</p>
                        {doctorData['operation_types'].filter((operation) => operation.operation_type_service_type === service.service_type_name).map((operation) => (
                            <div key={operation.id}>
                                {operation.operation_type_name}
                            </div>
                        ))}
                    </li>                    
                ))}
            </ul>

            <Link href={`/register?doctor_id=${doctor}`}>
                Get Appointment
            </Link>
        </div>
     );
}
 
export default DoctorProfileContainer;