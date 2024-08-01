import getServiceDetailsAction from "@/actions/doctor/getServiceDetails";
import getServiceOperationsAction from "@/actions/doctor/getServiceOperations";
import Link from "next/link";
const DoctorServiceDetailsContainer = async ({service_id}) => {
    const serviceDetails = await getServiceDetailsAction(service_id);
    const serviceOperations = await getServiceOperationsAction(service_id);
    if(serviceDetails){
        return ( 
            <div key={serviceDetails.id}>
                <Link href={`/dashboard/patients/${serviceDetails.patient}`}>
                <p>{serviceDetails.patient_username}</p>
                </Link>
                <p>{serviceDetails.type_name}</p>
                <p>{serviceDetails.status}</p>
                
                {serviceOperations
                ? <p>Operations</p>
                : <p>Operation not defined</p>
                }
                {serviceOperations && serviceOperations.map((operation) => {
                return (
                    <div key={operation.id}>
                        <p>{operation.operation_type_name}</p>              
                    </div>
                )
            })}
            </div>
         );
    }else{
        return ( 
            <p>Not Found</p>
         );
    }

    
}
 
export default DoctorServiceDetailsContainer;