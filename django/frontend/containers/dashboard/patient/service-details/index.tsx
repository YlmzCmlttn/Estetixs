import getMyServicesAction from "@/actions/patient/getServiceDetailsAction";
import Link from "next/link";
const PatientServiceDetailsContainer = async (service_id : int) => {
    const serviceDetails = await getServiceDetailsAction();
    return ( 
        <div key={service.id}>
            <p>{service.patient_username}</p>
            <p>{service.type_name}</p>
            <p>{service.status}</p>                        
        </div>
     );
}
 
export default PatientServiceDetailsContainer;