import { useParams } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import { User } from "../../typing/types/User.type";
import { useEffect, useState } from "react";
export const UserDetails = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState<User>();
  const { data, error, loading } = useApi(`users/${userId}`);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  });

  if (loading || error || !data) {
    return (
      <div className="text-2xl">
        {loading
          ? "Yuklanmoqda..."
          : "Hatolik yuz berdi: Foydalanuvchi tarmoqda mavjud emas"}
      </div>
    );
  }
  return (
    <section className="udetails py-4">
      <div
        className="box border-2 p-6 border-slate-700 
      md:max-w-full 
      ex-sm:max-w-[320px] ex-sm:flex ex-sm:flex-col ex-sm:gap-4 ex-sm:mx-auto"
      >
        <h4 className="md:text-2xl ex-sm:text-base mb-2">
          <span className="font-bold mr-2">Ishchining ismi: </span>
          <span className="bg-gray-600 text-white px-4 py-1">
            {userData?.name}
          </span>
        </h4>
        <h4 className="md:text-2xl ex-sm:text-base mb-2">
          <span className="font-bold mr-2">Ishchining familyasi:</span>
          <span className="bg-gray-600 text-white px-4 py-1">
            {userData?.surname}
          </span>
        </h4>
        <h4 className="md:text-2xl ex-sm:text-base mb-2">
          <span className="font-bold mr-2">Ishchining telefon raqami:</span>
          <span className="bg-gray-600 text-white px-4 py-1 underline">
            <a href={`tel:+${userData?.phone}`}>{userData?.phone}</a>
          </span>
        </h4>
        <h4 className="md:text-2xl ex-sm:text-base mb-2">
          <span className="font-bold mr-2">
            Ishchining ilovadagi ID raqami:
          </span>
          <span className="bg-gray-600 text-white px-4 py-1">
            {userData?.id}
          </span>
        </h4>
      </div>
    </section>
  );
};
