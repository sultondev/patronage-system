import { useFormik } from "formik";
import { Button, TextField } from "@mui/material";
import { authProtectedApi } from "../../config/axios.config";
import { useNavigate, useParams } from "react-router-dom";
type ScheduleValue = {
  scheduleID: number;
};
export const QuestionCreator = (props: ScheduleValue) => {
  const { scheduleID } = props;
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const { isSubmitting, errors, ...formik } = useFormik({
    initialValues: {
      title: "",
      scheduleId: scheduleID,
    },
    onSubmit: (values, formikHelpers) => {
      alert(JSON.stringify(values, null, 2));
      authProtectedApi()
        .post("/questions", values)
        .then(function () {
          navigate(`/categories/${categoryId}/schedules`);
          formikHelpers.resetForm();
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          formikHelpers.setSubmitting(false);
        });
    },
  });
  return (
    <section className="questions flex justify-center items-center">
      <form
        onSubmit={formik.handleSubmit}
        className="box
        flex flex-col gap-8
        border-2 border-gray-700
        px-6 py-4
        md:min-w-[500px]
        ex-sm:max-w-full"
      >
        <h5 className="text-2xl">Savol qo'shish</h5>
        <TextField
          id="title"
          name="title"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.title}
          label="Savolni kiriting"
          fullWidth
          required
        />
        <Button
          disabled={isSubmitting}
          variant="outlined"
          fullWidth
          type="submit"
          className="mb-4"
        >
          Submit
        </Button>
      </form>
    </section>
  );
};
