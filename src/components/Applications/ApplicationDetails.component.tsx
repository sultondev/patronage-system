import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Application } from "../../typing/types/Application.type";

export const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const { data, error, loading } = useApi(`applications/${applicationId}`);
  const location = JSON.parse(data.location);
  if (loading || error || !data) {
    return (
      <div className="md:px-[80px] lg:px-[100px]">
        {loading ? "Yuklanmoqda..." : "Hatolik yuzberdi"}
      </div>
    );
  }
  console.log(data.location);
  return (
    <section className="adetails md:px-[80px] lg:px-[100px]">
      <div className="box border-2 border-slate-700 flex flex-col gap-4 py-4 px-2">
        <h4 className="text-2xl font-bold mb-4">
          Ariza jo'natilgan hudud:
          <a
            href={`http://maps.google.com/?ll=${
              location.latitude + "," + location.longitude
            }`}
            className="ml-2"
          >
            Google kartada ochish
            {data.location.latitude}
          </a>
        </h4>
        <p className="text-2xl">Ariza raqami: {data.id}</p>
        <p>{data.comment}</p>
      </div>
    </section>
  );
};
