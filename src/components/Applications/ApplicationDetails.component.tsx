import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Application } from "../../typing/types/Application.type";
import { Category } from "../../typing/types/Category.type";
import { Schedule } from "../../typing/types/Schedule.type";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";

export const ApplicationDetails = () => {
  const { applicationId } = useParams();
  const { data, error, loading } = useApi(
    `applications/${applicationId}?include=all`
  );
  const [location, setLocation] = useState<any>();
  const [questions, setQuestions] = useState<any>();
  let good = 0;
  let bad = 0;
  useEffect(() => {
    if (data) {
      const loc = JSON.parse(data.location);
      setLocation(loc);
      setQuestions(arrayUniter([...data.category.schedules], "questions"));
    }
  }, [data]);
  if (loading || error || !data || !location) {
    return (
      <div className="md:px-[80px] lg:px-[100px]">
        {loading ? "Yuklanmoqda..." : "Hatolik yuzberdi"}
      </div>
    );
  }
  console.log(questions);
  return (
    <section className="adetails md:px-[80px] lg:px-[100px]">
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
        {/* <div className="flex flex-col w-full md:px-6">
          <>
            <div className="flex w-full justify-between">
              <div className="flex-grow">Savollar</div>
              <div className="basis-1/6">Ha</div>
              <div className="basis-1/6">Yo'q</div>
            </div>
          </>
          <div className="flex flex-col">
            <div className="border-[1px] border-black flex justify-between">
              <div className="flex-grow flex ">
                <span className="border-r-[1px] border-black px-[5px] py-[8px]">
                  №
                </span>
                <p className="md:max-w-[300px] ex-sm:max-w-[140px] p-2">
                  Savolning to'liq nomi
                </p>
              </div>
              <div className="basis-1/6 border-l-[1px] border-black">
                Ijobiy
              </div>
              <div className="basis-1/6 border-l-[1px] border-black">
                Manfiy
              </div>
            </div>
            {questions.map((question: any, index: number) => {
              question.answers[0].value ? good++ : bad++;
              return (
                <div
                  key={question.id}
                  className="border-[1px] border-black flex justify-between"
                >
                  <div className="flex-grow flex ">
                    <span className="border-r-[1px] border-black p-2">
                      {index + 1}.
                    </span>
                    <p className="md:max-w-[300px] ex-sm:max-w-[140px] p-2">
                      {question.title}
                    </p>
                  </div>
                  <div className="basis-1/6 border-l-[1px] border-black">
                    {question.answers[0].value ? <CheckIcon /> : ""}
                  </div>
                  <div className="basis-1/6 border-l-[1px] border-black">
                    {!question.answers[0].value ? <CloseIcon /> : ""}
                  </div>
                </div>
              );
            })}
            <div className="border-[1px] border-black flex justify-between">
              <div className="flex-grow flex ">
                <p className="md:max-w-[300px] ex-sm:max-w-[140px] p-2">
                  Natijalar
                </p>
              </div>
              <div className="basis-1/6 border-l-[1px] border-black p-2">
                {good}
              </div>
              <div className="basis-1/6 border-l-[1px] border-black p-2">
                {bad}
              </div>
            </div>
          </div>
        </div> */}

        <table className="table-auto">
          <thead>
            <tr>
              <th>Song</th>
              <th>Artist</th>
              <th>Year</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td>Malcolm Lockyer</td>
              <td>1961</td>
            </tr>
            <tr>
              <td>Witchy Woman</td>
              <td>The Eagles</td>
              <td>1972</td>
            </tr>
            <tr>
              <td>Shining Star</td>
              <td>Earth, Wind, and Fire</td>
              <td>1975</td>
            </tr>
          </tbody>
        </table>

        <h6 className="px-6 text-2xl font-bold">Fuqoro haqidagi ma'lumotlar</h6>
        <div className="box flex flex-col w-full md:px-6">
          <div className="flex flex-col">
            {Object.keys(data.client).map((keyName: any, index: number) => {
              return (
                <div
                  className="border-[1px] border-black flex justify-between"
                  key={keyName.id}
                >
                  <div className="flex-grow flex ">
                    <span className="border-r-[1px] border-black px-[5px] py-[8px]">
                      {index + 1}.
                    </span>
                    <p className="md:max-w-[300px] ex-sm:max-w-[140px] p-2">
                      {compareTranslator(keyName)}
                    </p>
                  </div>
                  <div className="md:basis-1/4 ex-sm:basis-1/3 border-l-[1px] border-black p-2">
                    {data.client[keyName]}
                  </div>
                </div>
              );
            })}
          </div>
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
function arrayUniter(arg: any, destiny: string) {
  const length = arg.length;
  const stack = [];
  for (let i = 0; i < length; i++) {
    if (!arg[i]) {
      return;
    }
    stack.unshift(...arg[i][destiny]);
  }
  return stack;
}
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
