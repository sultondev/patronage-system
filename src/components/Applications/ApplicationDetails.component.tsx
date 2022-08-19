import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Schedule } from "../../typing/types/Schedule.type";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { Question } from "../../typing/types/Question.type";
import { Location } from "../../typing/types/Location.type";

export const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const { data, error, loading } = useApi(
    `applications/${applicationId}?include=all`
  );
  const [location, setLocation] = useState<Location>();
  const [schedules, setSchedules] = useState<Schedule[]>();
  useEffect(() => {
    if (data) {
      const loc = JSON.parse(data.location);
      setLocation(loc);
      setSchedules([...data.category.schedules]);
    }
  }, [data]);
  if (loading || error || !data || !location) {
    return (
      <div className="md:px-[80px] lg:px-[100px]">
        {loading ? "Yuklanmoqda..." : "Hatolik yuzberdi"}
      </div>
    );
  }
  console.log(schedules);
  return (
    <section className="adetails my-8 md:px-[80px] lg:px-[100px]">
      <div className="box border-2 border-slate-700 flex flex-col gap-4 py-4 px-2">
        <h4 className="text-2xl font-bold mb-4">
          Ariza jo'natilgan hudud:
          <a
            href={`http://maps.google.com/maps?q=loc:${
              location.latitude + "," + location.longitude
            }`}
            className="ml-2 bg-gray-700 text-white px-2 py-1 underline"
          >
            Google kartada ochish
            {data.location.latitude}
          </a>
        </h4>

        <div className="w-full overflow-scroll">
          {schedules &&
            schedules.map((schedule: Schedule) => {
              console.log(schedule);
              let goodStack = 0;
              let badStack = 0;
              return (
                <table
                  className="table-fixed min-w-[500px] w-full my-4"
                  key={schedule.id}
                >
                  <thead className="w-full overflow-x-scroll">
                    <tr className="border-none">
                      <th colSpan={11} className="text-left text-xl">
                        {schedule.name}
                      </th>
                    </tr>
                    <tr className="text-left border-[1px] border-green-500 bg-green-500 text-white">
                      <th className="text-center " colSpan={1}>
                        №
                      </th>
                      <th className="" colSpan={10}>
                        Savollar
                      </th>
                      <th className="" colSpan={2}>
                        HA
                      </th>
                      <th className="" colSpan={2}>
                        YO'Q
                      </th>
                    </tr>
                  </thead>
                  <tbody className="border border-black">
                    {schedule &&
                      schedule.questions.map(
                        (question: Question, index: number) => {
                          question.answers[0].value ? goodStack++ : badStack++;
                          return (
                            <tr key={question.id}>
                              <td className="border-r border-b border-black text-center max-w-[80px]">
                                {index + 1}
                              </td>
                              <td
                                className="border-r border-b border-black"
                                colSpan={10}
                              >
                                {question.title}
                              </td>
                              <td
                                className="border-r  border-b border-black"
                                colSpan={2}
                              >
                                {question.answers[0] &&
                                question.answers[0].value ? (
                                  <CheckIcon />
                                ) : (
                                  ""
                                )}
                              </td>
                              <td className="border-b border-black" colSpan={2}>
                                {question.answers[0] &&
                                !question.answers[0].value ? (
                                  <CloseIcon />
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          );
                        }
                      )}
                    <tr>
                      <td colSpan={11} className="pl-2 border-r border-black">
                        Natijalar
                      </td>
                      <td colSpan={2} className="pl-2 border-r border-black">
                        {goodStack}
                      </td>
                      <td colSpan={2} className="pl-2">
                        {badStack}
                      </td>
                    </tr>
                  </tbody>
                </table>
              );
            })}
        </div>

        <h6 className="px-6 text-2xl font-bold">Fuqoro haqidagi ma'lumotlar</h6>
        <div className="box w-full overflow-scroll md:px-6">
          <table className="table-auto min-w-[500px] w-full">
            <tbody className="border-[1px] w-full border-black">
              {Object.keys(data.client).map(
                (keyName: string, index: number) => {
                  return (
                    <tr key={keyName + index}>
                      <td
                        className="text-center border-r border-b border-black px-[5px] py-[8px]"
                        colSpan={1}
                      >
                        {index + 1}.
                      </td>
                      <td
                        className="text-left border-r border-b border-black pl-4"
                        colSpan={11}
                      >
                        {compareTranslator(keyName)}
                      </td>
                      <td className="border-b border-black p-2" colSpan={1}>
                        {data.client[keyName]}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>

        <p className="text-2xl">Ariza raqami: {data.id}</p>
        <p className="text-black">
          Jo'natuvchi:{" "}
          <Link
            to={`/users/${data.createdBy}`}
            className="text-white bg-gray-700 px-2 py-1 underline"
          >
            Profili
          </Link>
        </p>
        <p>Qo'shimcha: {data.comment}</p>
      </div>
    </section>
  );
};
function compareTranslator(arg: any) {
  let res;
  switch (arg) {
    case "address":
      res = "Yashash manzili";
      break;
    case "personalNumber":
      res = "JSHSH";
      break;
    case "cardNumber":
      res = "Passport seriyasi";
      break;
    case "dateBirth":
      res = "Tug'ilgan kuni";
      break;
    case "name":
      res = "Ismi";
      break;
    case "surname":
      res = "Familiyasi";
      break;
    case "id":
      res = "Ilovadagi olingan ID raqami";
  }
  return res;
}
