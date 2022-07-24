import { useFormik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC, memo } from "react";
import { useApi } from "../../hooks/useApi.hook";
import { Category } from "../../typing/types/Category.type";

interface Props {
  onCreate: (values: any) => void;
}

const CreateClientForm: FC<Props> = ({ onCreate }) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
      categoryId: "",
    },
    onSubmit: async (values) => {
      onCreate(values);
    },
  });

  const { data: categories, loading } = useApi<Category[]>("/categories/all");

  return (
    <section className="flex justify-center items-center">
      <div className="container mx-auto flex justify-center flex-col gap-6 items-center">
        <h1 className="text-3xl text-black">Mijoz ma'lumotlarini kiriting</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="submit-box border-[1px] bg-white flex flex-col gap-4 items-center px-6 py-4 ex-sm:min-w-full md:min-w-[500px]"
        >
          <FormControl fullWidth>
            <InputLabel id="category-label">Bo'limni tanlang</InputLabel>
            <Select
              disabled={loading}
              id="categoryId"
              name="categoryId"
              label="Bo'limni tanlang"
              fullWidth
              value={formik.values.categoryId}
              onChange={(e) =>
                formik.setFieldValue("categoryId", e.target.value)
              }
            >
              {categories &&
                categories.map((category) => (
                  <MenuItem
                    key={"cat" + category.id + category.name}
                    value={category.id}
                  >
                    {category.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <TextField
            id="comment"
            name="comment"
            type="text"
            multiline
            rows={6}
            onChange={formik.handleChange}
            value={formik.values.comment}
            label="Ariza uchun izoh kiriting"
            fullWidth
          />

          <Button variant="outlined" fullWidth type="submit">
            Keyingi qadamga o'tish
          </Button>
        </form>
      </div>
    </section>
  );
};

export default memo(CreateClientForm);
