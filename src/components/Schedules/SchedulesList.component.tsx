import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Application } from "../../typing/types/Application.type";
import { Category } from "../../typing/types/Category.type";
import { Paginated } from "../../typing/types/Paginated.type";
import { Schedule } from "../../typing/types/Schedule.type";

export const SchedulesList = ({
  data,
  error,
  loading,
  categoryId,
}: {
  data: Paginated<Schedule>;
  loading: boolean;
  error: string | null;
  categoryId: string;
}) => {
  if (loading || error) {
    return <div>{loading ? "Yuklanmoqda..." : "Hatolik yuz berdi"}</div>;
  }

  return (
    <List component="span">
      {data &&
        data.rows.map((schedule) => {
          const labelId = `list-secondary-label-${schedule.id}`;
          return (
            <>
              <ListItem
                key={schedule.id}
                button
                onClick={() => console.log("")}
                className="border-b-2 border-black"
              >
                <ListItemText
                  id={labelId}
                  primary={
                    <Link
                      // to={`/categories/${schedule.id}`}
                      to={`/categories/${categoryId}/schedules/${schedule.id}`}
                      className="text-blue-500 underline"
                    >
                      <p className="text-2xl">Tartib: {schedule.name}</p>
                    </Link>
                  }
                  className="flex justify-between"
                />
              </ListItem>
              <Divider />
            </>
          );
        })}
    </List>
  );
};
