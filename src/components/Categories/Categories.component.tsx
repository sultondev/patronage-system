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
    <section className="categories">
      <h1>Bo&#39;limlar</h1>
      <ul className="categories-list">
        {data.map((category: Category) => (
          <li key={category.id}>
            <Link to={`/categories/${category.id}`}>{category.name}</Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path=":categoryId" element={<SchedulePage />} />
      </Routes>
    </section>
  );
};
