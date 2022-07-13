import { Link, Route, Routes } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { Category } from "../../typing/types/Category.type";
import { SchedulePage } from "../Schedule/Schedule.component";
export const Categories = () => {
  const { data, error, loading } = useApi("categories/all");
  if (loading) {
    return <div className="">Loading...</div>;
  }
  if (error || !data) {
    return <div className="">Error...</div>;
  }

  return (
    <section className="categories py-4">
      <h4 className="text-4xl font-bold mb-4">Bo&#39;limlar</h4>
      <ul className="categories-list flex gap-4 py-4 flex-wrap md:justify-start ex-sm:justify-center">
        {data.map((category: Category) => (
          <li key={category.id} className="flex">
            <Link
              to={`/categories/${category.id}`}
              className="bg-blue-500 min-h-[300px] min-w-[200px] max-w-[200px] max-w rounded-md text-white text-3xl px-4 py-1"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path=":categoryId" element={<SchedulePage />} />
      </Routes>
    </section>
  );
};
