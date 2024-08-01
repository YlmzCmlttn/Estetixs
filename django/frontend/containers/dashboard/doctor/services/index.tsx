import getMyServicesAction from "@/actions/doctor/getMyServices";
import Link from "next/link";
const DoctorServicesContainer = async () => {
    const myServices = await getMyServicesAction();
    return ( 
        <div>
            {myServices && myServices.map((service) => {
                return (
                    <Link href={`/dashboard/services/${service.id}`} key={service.id}>
                    <div key={service.id}>
                        <p>{service.patient_username}</p>
                        <p>{service.type_name}</p>
                        <p>{service.status}</p>                        
                    </div>
                    </Link>
                )
            })}
        </div>
     );
}
 
export default DoctorServicesContainer;