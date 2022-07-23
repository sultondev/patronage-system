// import { authProtectedApi } from "../../config/axios.config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi.hook";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
} from "@mui/material";
import { Box } from "@mui/system";
const Applications = () => {
  const { data, error, loading } = useApi("/applications/all");
  const itemsPerPage = 10;
  const [page, setPage] = useState(1);
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

  const [noOfPages, setNoOfPages] = useState(1);

  const handleChange = (e: any, value: number) => {
    console.log(value);
    setPage(value);
  };

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
    <section>
      <h6 className="text-2xl">Arizalar Bo'limi</h6>
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
                      <Link
                        to={`/users/${app.createdBy}`}
                        className=" px-2 py-1"
                      >
                        <Avatar alt={`Avatar n°`} src={""} className="" />
                      </Link>
                    </ListItemAvatar>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
      </List>

      <Box component="span">
        <Pagination
          count={noOfPages}
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

export default Applications;
