import { Link, Routes, Route } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { User } from "../../typing/types/User.type";
import { useEffect, useState } from "react";
import "./styles/Users.style.css";
import { UserDetails } from "./UserDetails.component";

export const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data, error, loading } = useApi("users/all");

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  });

  if (loading || error || !data) {
    return (
      <div className="text-2xl">
        {loading ? "Yuklanmoqda..." : "Hatolik yuz berdi"}
      </div>
    );
  }
  console.log(users);
  return (
    <section className="users py-4">
      <h4 className="text-4xl font-bold mb-2">Ishchilar ro'yxati</h4>
      <ul className="users-list flex gap-2">
        {users.map((user: User) => (
          <li key={user.id} className="flex">
            <Link
              to={`/users/${user.id}`}
              className="bg-blue-500 min-h-[300px] min-w-[200px] max-w-[200px] max-w rounded-md text-white text-3xl px-4 py-1"
            >
              {user.surname}
            </Link>
          </li>
        ))}
      </ul>
      <Routes>
        <Route path=":userId" element={<UserDetails />} />
      </Routes>
    </section>
  );
};
