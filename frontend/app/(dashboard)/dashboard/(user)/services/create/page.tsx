import CreateServiceContainer from "@/containers/dashboard/patient/services/create";

const CreateServicePage = ({searchParams}) => {
    console.log(searchParams);
    return ( 
        <CreateServiceContainer doctor={searchParams.doctor_url}/>
     );
}
 
export default CreateServicePage;