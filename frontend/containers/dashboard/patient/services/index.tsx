import getMyServicesAction from "@/actions/patient/getMyServices";
const PatientServicesContainer = async () => {
    const myServices = await getMyServicesAction();
    return ( 
        <div>
            {myServices.map((service) => {
                return (
                    <div key={service.id}>
                        <p>{service.fullname}</p>
                        <p>{service.doctor_url}</p>
                        <p>{service.status}</p>
                    </div>
                )
            })}
        </div>
     );
}
 
export default PatientServicesContainer;