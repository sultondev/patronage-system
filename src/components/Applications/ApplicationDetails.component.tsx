import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Application } from "../../typing/types/Application.type";

export const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const { data, error, loading } = useApi(
    `applications/${applicationId}?include=all`
  );
  const [location, setLocation] = useState<any>();

  useEffect(() => {
    if (data) {
      const loc = JSON.parse(data.location);
      setLocation(loc);
    }
  }, [data]);
  if (loading || error || !data || !location) {
    return (
      <div className="md:px-[80px] lg:px-[100px]">
        {loading ? "Yuklanmoqda..." : "Hatolik yuzberdi"}
      </div>
    );
  }
  console.log(data);
  return (
    <section className="adetails md:px-[80px] lg:px-[100px]">
      <div className="box border-2 border-slate-700 flex flex-col gap-4 py-4 px-2">
        <h4 className="text-2xl font-bold mb-4">
          Ariza jo'natilgan hudud:
          <a
            href={`http://maps.google.com/?ll=${
              location.latitude + "," + location.longitude
            }`}
            className="ml-2 bg-gray-700 text-white px-2 py-1"
          >
            Google kartada ochish
            {data.location.latitude}
          </a>
        </h4>
        {/* <table className="table-auto">
          <thead>
            <tr>
              <th>Savollar</th>
              <th>Ha</th>
              <th>Yo'q</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {data.questions.map((question) => (
                <td key={question.id}>{question.title}</td>
              ))}
            </tr>
            <tr>
              {data.questions.map((question) => (
                <td key={question.id}>{question.answer}</td>
              ))}
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table> */}
        <p className="text-2xl">Ariza raqami: {data.id}</p>
        <p>{data.comment}</p>
      </div>
    </section>
  );
};
