import { Field, Form, Formik } from "formik";
import { memo, useState } from "react";
import { useParams, Route, Routes } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Schedule } from "../../typing/types/Schedule.type";
import "./ScheduleDetail.style.css";
import { userAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { Button } from "@mui/material";
import { QuestionCreator } from "../QuestionCreator/QuestionCreator.component";
const ScheduleDetailComponent = () => {
  const { scheduleId } = useParams();
  const [questionStatus, setQuestionStatus] = useState("hidden");
  const [user] = useRecoilState(userAtom);

  const { data, error, loading } = useApi<Schedule>(`schedule/${scheduleId}`, {
    params: {
      include: "all",
    },
  });

  if (loading) {
    return <div className="">Loading...</div>;
  }
  if (error || !data) {
    return <div className="">Error...</div>;
  }

  console.log(questionStatus);

  return (
    <section className="schedule-detail  my-4 py-4 border-t-2 border-black">
      <div className="flex justify-between">
        <h2>{data.name}</h2>
        <p className="text-2xl">Ha / Yo'q</p>
      </div>
      <ul className="schedule-detail-list flex flex-col gap-2">
        {data.questions.map((question) => {
          return (
            <li
              key={question.id}
              className="schedule-detail-list__item bg-orange-400  shadow-lg 
              hadow-orange-600/50 text-white md:py-4 md:px-4 ex-sm:py-6 
              ex-sm:px-8 ex-sm:max-w-full
              md:max-w-auto
              "
            >
              <div className="flex ">
                <label htmlFor={question.title} className="flex-grow-[1]">
                  {question.title}
                </label>
                <Formik
                  initialValues={{
                    picked: "",
                  }}
                  onSubmit={async (values: any) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                  }}
                >
                  {() => (
                    <Form className="flex ml-1 gap-8 flex-shrink-[200px]">
                      <Field
                        type="radio"
                        name="picked"
                        value="yes"
                        className={`text-2xl`}
                      />
                      <Field
                        type="radio"
                        name="picked"
                        value="no"
                        className={`text-2xl`}
                      />
                    </Form>
                  )}
                </Formik>
              </div>
            </li>
          );
        })}
      </ul>
      {user.role === "MODERATOR" && (
        <div className="mt-10">
          <Button
            variant="contained"
            onClick={(e) => {
              e.preventDefault();
              if (questionStatus === "hidden") {
                setQuestionStatus("block");
              } else {
                setQuestionStatus("hidden");
              }
            }}
          >
            {questionStatus === "hidden"
              ? "Savol Yaratish bo'limini ochish"
              : "Savol Yaratish bo'limini yashirish"}
          </Button>
          <div className={`${questionStatus}`}>
            <QuestionCreator scheduleID={Number(scheduleId)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(ScheduleDetailComponent);
