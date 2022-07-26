import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { useApi } from "../../hooks/useApi.hook";
import { noOfPagesAtom } from "../../recoil/atoms";

export const ApplicationsList = (props: {
  start: number;
  end: number;
  page: number;
}) => {
  const itemsPerPage = 10;
  const { start, end, page } = props;
  const [noOfPages, setNoOfPages] = useRecoilState(noOfPagesAtom);
  const { data, error, loading } = useApi(
    `/applications/paginated/${start}/${end}`
  );
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
      setNoOfPages(Math.ceil(data.length / itemsPerPage));
    }
  });

  if (loading || error) {
    return <div>{loading ? "Yuklanmoqda..." : "Hatolik yuz berdi"}</div>;
  }
  return (
    <List component="span">
      {apps &&
        apps
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((app) => {
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
