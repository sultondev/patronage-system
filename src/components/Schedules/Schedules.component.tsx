import { useMemo, useCallback, useState } from "react";
import { Button, Pagination } from "@mui/material";
import { Box } from "@mui/system";

import { useSearchParams, useParams } from "react-router-dom";
import { Paginated } from "../../typing/types/Paginated.type";
import { useApi } from "../../hooks/useApi.hook";
import { Category } from "../../typing/types/Category.type";
import { SchedulesList } from "./SchedulesList.component";
import { Schedule } from "../../typing/types/Schedule.type";
import { userAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { SchedulesCreator } from "../SchedulesCreator/SchedulesCreator.component";
const Schedules = () => {
  const [search, setSearch] = useSearchParams();
  const [user] = useRecoilState(userAtom);
  const [questionStatus, setQuestionStatus] = useState("hidden");
  const { categoryId } = useParams();
  const [page, size] = useMemo(
    () => [Number(search.get("page")) || 1, Number(search.get("size")) || 10],
    [search]
  );

  const handleChange = useCallback(
    (e: any, page: number) => {
      setSearch({
        page: String(page),
      });
    },
    [search]
  );

  const url = useMemo(
    () => `/schedule/paginated/${page}/${size}?category_id=${categoryId}`,
    [page, size]
  );

  const { data, error, loading } = useApi<Paginated<Schedule>>(url);

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.count / size) : 0),
    [data, size]
  );
  if (loading || error || !data || !categoryId) {
    return (
      <div className="md:px-[80px] lg:px-[100px]">
        {loading ? "Yuklanmoqda..." : "Hatolik yuz berdi"}
      </div>
    );
  }
  return (
    <section className="md:px-[80px] lg:px-[100px]">
      <h6 className="text-2xl">Tartiblar Bo'limi</h6>
      <SchedulesList
        data={data}
        error={error}
        loading={loading}
        categoryId={categoryId}
      />
      <Box component="span">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChange}
          defaultPage={1}
          color="primary"
          size="large"
          variant="outlined"
          shape="rounded"
          className="my-10"
        />
      </Box>
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
              ? "Tartib yaratish bo'limini ochish"
              : "Tartib yaratish bo'limini yashirish"}
          </Button>
          <div className={`${questionStatus} my-10`}>
            <SchedulesCreator categoryID={Number(categoryId)} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Schedules;
