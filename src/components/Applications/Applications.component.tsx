// import { authProtectedApi } from "../../config/axios.config";
import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ApplicationDetails } from "./ApplicationDetails.component";
import { useApi } from "../../hooks/useApi.hook";
const Applications = () => {
  const { data, error, loading } = useApi("/applications/all");
  const [apps, setApps] = useState([
    {
      id: 1,
      location: "654654 54654654",
      comment: null,
      createdBy: 1,
      categoryId: 1,
      clientId: 1,
      createdAt: "2022-07-03T07:01:44.510Z",
      updatedAt: "2022-07-03T07:01:44.510Z",
    },
  ]);
  useEffect(() => {
    if (data) {
      setApps(data);
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <ul className="categories-list flex gap-4 py-4 flex-wrap md:justify-start ex-sm:justify-center">
        {apps.map((app) => (
          <li key={app.id} className="flex relative">
            <Link
              to={`/applications/${app.id}`}
              className="bg-blue-500 min-h-[300px] min-w-[200px] max-w-[400px] rounded-md text-white font-medium text-3xl px-4 py-1"
            >
              <h3 className="text-2xl mb-2">
                Ariza jo'natilgan hudud: {app.location}
              </h3>
              <p className="text-2xl">Ariza raqami: {app.id}</p>
              <p>{app.comment}</p>
            </Link>
            <p className="text-white font-bold absolute bottom-2 left-2">
              jo'natuvchi:{" "}
              <Link to={`/users/${app.createdBy}`} className="text-black">
                Profil
              </Link>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Applications;
