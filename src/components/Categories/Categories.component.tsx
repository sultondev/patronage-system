import { Link, Route, Routes } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Category } from "../../typing/types/Category.type";
import SchedulesComponent from "../Schedules/Schedules.component";
export const Categories = () => {
  const { data, error, loading } = useApi("categories/all");

  console.log(data);

  if (loading || error || !data) {
    return <div>{loading ? "Yuklanmoqda..." : "Hatolik yuz berdi"}</div>;
  }
  return (
    <section className="categories py-4">
      <h4 className="text-4xl font-bold mb-4">Bo'limlar</h4>
      <ul className="categories-list flex gap-4 py-4 flex-wrap md:justify-start ex-sm:justify-center">
        {data.map((category: Category) => (
          <li key={category.id} className="flex">
            <Link
              to={`/categories/${category.id}/schedules`}
              className="bg-blue-500 min-h-[300px] min-w-[200px] max-w-[200px] max-w rounded-md text-white text-3xl px-4 py-1"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};
