import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Application } from "../../typing/types/Application.type";

export const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const [application, setApplication] = useState<Application>();
  const [currentP, setCurrentP] = useState<any>("");
  const { data, error, loading } = useApi(`applications/${applicationId}`);
  useEffect(() => {
    if (data) {
      setApplication(data);
      setCurrentP(
        navigator.geolocation.getCurrentPosition((position) => {
          return `${position.coords.latitude},${position.coords.longitude}`;
        })
      );
    }
  });

  if (loading || error || !application) {
    return (
      <div className="md:px-[80px] lg:px-[100px]">
        {loading ? "Yuklanmoqda..." : "Hatolik yuzberdi"}
      </div>
    );
  }
  return (
    <section className="adetails md:px-[80px] lg:px-[100px]">
      <div className="box border-2 border-slate-700 flex flex-col gap-4 py-4 px-2">
        <h4 className="text-2xl font-bold mb-4">
          Ariza jo'natilgan hudud:
          <a href={`http://maps.google.com/?ll=${currentP}`} className="ml-2">
            Google kartada ochish
            {currentP}
          </a>
        </h4>
        <p className="text-2xl">Ariza raqami: {application.id}</p>
        <p>{application.comment}</p>
      </div>
    </section>
  );
};
