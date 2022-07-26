// import { authProtectedApi } from "../../config/axios.config";
import { useState } from "react";
import { Pagination } from "@mui/material";
import { Box } from "@mui/system";
// import { noOfPagesAtom } from "../../recoil/atoms";
// import { useRecoilState } from "recoil";
import { ApplicationsList } from "./ApplicationsList.component";
const Applications = () => {
  const [page, setPage] = useState(1);
  // const [startStack, setStartStack] = useRecoilState(startStackAtom);
  // const [endStack, setEndStack] = useRecoilState(endStackAtom);
  // const [noOfPages, setNoOfPages] = useRecoilState(noOfPagesAtom);
  let startStack = 1;
  let endStack = 10;
  const handleChange = (e: any, value: number) => {
    console.log(value);
    console.log(page);
    setPage(value);
    if (page < value) {
      startStack = endStack;
      endStack += 10;
      console.log(startStack, endStack);
    } else if (page > value) {
      // startStack = startStack - 10;
      // endStack = startStack;
      endStack -= 10;
      startStack -= endStack;
      console.log(startStack, endStack);
    }
  };

  return (
    <section>
      <h6 className="text-2xl">Arizalar Bo'limi</h6>
      <ApplicationsList start={startStack} end={endStack} page={page} />
      <Box component="span">
        <Pagination
          count={4}
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
