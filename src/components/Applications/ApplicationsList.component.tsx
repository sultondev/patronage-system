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
import { Paginated } from "../../typing/types/Paginated.type";

export const ApplicationsList = ({
  data,
  error,
  loading,
}: {
  data: Paginated<Application>;
  loading: boolean;
  error: string | null;
}) => {
  if (loading || error) {
    return <div>{loading ? "Yuklanmoqda..." : "Hatolik yuz berdi"}</div>;
  }
  return (
    <List component="span">
      {data &&
        data.rows.map((app) => {
          const labelId = `list-secondary-label-${app.id}`;
          return (
            <>
              <ListItem
                key={app.id}
                button
                onClick={() => console.log("")}
                className="border-b-2 border-black"
              >
                <ListItemText
                  id={labelId}
                  primary={
                    <Link
                      to={`/applications/${app.id}`}
                      className="text-blue-500 underline"
                    >
                      <p className="text-2xl">Ariza raqami: {app.id}</p>
                    </Link>
                  }
                  className="flex justify-between"
                />
                <ListItemAvatar>
                  <Link to={`/users/${app.createdBy}`} className=" px-2 py-1">
                    <Avatar alt={`Avatar n°`} src={""} className="" />
                  </Link>
                </ListItemAvatar>
              </ListItem>
              <Divider />
            </>
          );
        })}
    </List>
  );
};
