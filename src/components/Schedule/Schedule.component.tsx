import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Schedule } from "../../typing/types/Schedule.type";
import "./Schedule.style.css";
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
    <section className="schedule my-4 py-4 border-t-2 border-black">
      <h2 className={"text-4xl font-bold mb-4"}>Tartiblar</h2>
      <ul className="schedule-list flex gap-4 flex-wrap md:flex-row md:justify-start ex-sm:justify-center ex-sm:items-center ex-sm:flex-col">
        {data.schedules.map((schedule) => {
          return (
            <li key={schedule.id} className="flex">
              <Link
                to={{
                  pathname: `/schedules/${schedule.id}`,
                }}
                className="
                schedule-list__item
                bg-orange-500 
                rounded-md text-white text-3xl px-4 py-1
                ex-sm:text-lg
                ex-sm:min-w-[136px] ex-sm:min-h-[198px] ex-sm:max-w-[136px] ex-sm:max-h-[198px] 
                md:min-h-[300px] md:max-h-[300px] md:min-w-[200px] md:max-w-[200px] 
                
                "
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
