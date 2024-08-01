import getMyServicesAction from "@/actions/doctor/getMyServices";
const DoctorServicesContainer = async () => {
    const myServices = await getMyServicesAction();
    console.log(myServices);
    return ( 
        <div>
            {myServices && myServices.map((service) => {
                return (
                    <div key={service.id}>
                        <p>{service.fullname}</p>
                        <p>{service.status}</p>
                    </div>
                )
            })}
        </div>
     );
}
 
export default DoctorServicesContainer;