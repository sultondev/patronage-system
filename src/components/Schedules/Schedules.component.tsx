import { useMemo, useCallback } from "react";
import { Pagination } from "@mui/material";
import { Box } from "@mui/system";

import { useSearchParams } from "react-router-dom";
import { Paginated } from "../../typing/types/Paginated.type";
import { useApi } from "../../hooks/useApi.hook";
import { Category } from "../../typing/types/Category.type";
import { SchedulesList } from "./SchedulesList.component";
import { Schedule } from "../../typing/types/Schedule.type";
const Schedules = () => {
  const [search, setSearch] = useSearchParams();

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
    () => `/schedule/paginated/${page}/${size}`,
    [page, size]
  );

  const { data, error, loading } = useApi<Paginated<Schedule>>(url);

  const totalPages = useMemo(
    () => (data ? Math.ceil(data.count / size) : 0),
    [data, size]
  );
  return (
    <section className="md:px-[80px] lg:px-[100px]">
      <h6 className="text-2xl">Arizalar Bo'limi</h6>
      <SchedulesList data={data} error={error} loading={loading} />
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
    </section>
  );
};

export default Schedules;
