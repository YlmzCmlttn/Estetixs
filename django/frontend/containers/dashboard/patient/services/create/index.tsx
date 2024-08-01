import getMyServicesAction from "@/actions/patient/getMyServices";
import createServiceAction from "@/actions/patient/createService";
const PatientCreateServiceContainer = async ({doctor}) => {
    console.log(doctor);
    return ( 
        <div>
            <h1>Patient Create Services Container</h1>
            <form
                action={async () => {
                    'use server';
                    await createServiceAction(doctor);
                }}
                >
                    <button type="submit">Create a Service</button>
                </form>
        </div>

     );
}
 
export default PatientCreateServiceContainer;