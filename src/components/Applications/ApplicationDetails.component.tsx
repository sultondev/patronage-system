import { useParams } from "react-router-dom";

export const ApplicationDetails = () => {
  const { applicationId } = useParams();
  console.log(applicationId, "hello");
  return <section className="adetails">A-Details</section>;
};
