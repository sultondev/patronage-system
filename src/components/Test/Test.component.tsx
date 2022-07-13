import { memo } from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Schedule } from "../../typing/types/Schedule.type";
import "./Test.style.css";
const TestComponent = () => {
  const { scheduleId } = useParams();
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

  return (
    <section className="test">
      <hr />
      <h2>Tartib {data.name}</h2>
      <ul className="test-list flex flex-col gap-2">
        {data.questions.map((question) => {
          return (
            <li
              key={question.id}
              className="test-list__item bg-orange-400  shadow-lg 
              hadow-orange-600/50 text-white md:py-4 md:px-4 ex-sm:py-6 
              ex-sm:px-8 ex-sm:max-w-full
              md:max-w-auto
              "
            >
              <div className="block">
                <input type="checkbox" name="questions" id={question.title} />
                <label htmlFor={question.title} className="ml-2">
                  {question.title}
                </label>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export const Test = memo(TestComponent);
