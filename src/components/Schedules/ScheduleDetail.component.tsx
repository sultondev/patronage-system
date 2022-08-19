import { Field, Form, Formik } from "formik";
import { memo, useState } from "react";
import { useParams, Route, Routes } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Schedule } from "../../typing/types/Schedule.type";
import "./styles/ScheduleDetail.style.css";
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

  if (loading || error || !data) {
    return (
      <div className="md:px-[80px] lg:px-[100px]">
        {loading ? "Yuklanmoqda..." : "Hatolik yuz berdi"}
      </div>
    );
  }

  console.log(questionStatus);

  return (
    <section className="schedule-detail  my-4 py-4 md:px-[80px] lg:px-[100px]">
      <div className="">
        <h2 className="text-xl p-1">{data.name}</h2>
      </div>
      <ul className="schedule-detail-list flex flex-col gap-2">
        {data.questions.map((question, index) => {
          return (
            <li
              key={question.id}
              className="schedule-detail-list__item border border-blue-500 shadow-lg 
              hadow-orange-600/50 text-black md:py-4 md:px-4 ex-sm:py-6 
              ex-sm:px-8 ex-sm:max-w-full
              md:max-w-auto
              "
            >
              <div className="flex gap-2">
                <div className="text-base">{index + 1}. </div>
                <label htmlFor={question.title} className="flex-grow-[1]">
                  {question.title}
                </label>
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
          <div className={`${questionStatus} my-10`}>
            <QuestionCreator scheduleID={Number(scheduleId)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default memo(ScheduleDetailComponent);
