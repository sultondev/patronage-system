import { Link } from "react-router-dom";
import { useParams, Routes, Route } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Schedule } from "../../typing/types/Schedule.type";

type CategoryType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  schedules: Schedule[];
};

export const SchedulePage = () => {
  const { categoryId } = useParams();
  const { data, error, loading } = useApi<CategoryType>(
    `categories/${categoryId}`,
    {
      params: {
        include: "schedules_only",
      },
    }
  );

  if (error) {
    return <div className="">Error...</div>;
  }
  if (loading || !data) {
    return <div className="">Loading...</div>;
  }

  return (
    <section className="schedule">
      <hr />
      <h2>Tartiblar</h2>
      <ul className="schedule-list">
        {data.schedules.map((schedule) => {
          return (
            <li key={schedule.id}>
              <Link
                to={{
                  pathname: `/schedules/${schedule.id}`,
                }}
              >
                {schedule.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
