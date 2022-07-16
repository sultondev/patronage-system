import { useFormik } from "formik";
import { Button, FormControl, TextField } from "@mui/material";
import { authProtectedApi } from "../../config/axios.config";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";

const CreateApplication = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      dateBirth: null,
      cardNumber: "",
      personalNumber: "",
      address: "",
    },
    onSubmit: async (values) => {
      authProtectedApi()
        .post("/applications", values)
        .then(function () {
          formik.resetForm();
        })
        .catch(function (error) {
          console.log(error);
        });

      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <section className="CreateApplication h-screen flex justify-center items-center">
        <div className="container mx-auto flex justify-center flex-col gap-6 items-center">
          <h1 className="text-3xl text-black">Ariza Yuborish</h1>

          <form
            onSubmit={formik.handleSubmit}
            className="signIn-box border-[1px] border-black bg-white  flex flex-col gap-4 items-center px-6 py-4
          ex-sm:min-w-full
          md:min-w-[500px]
          "
          >
            <TextField
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
              label="Mijoz ismini kiriting"
              fullWidth
              required
            />
            <TextField
              id="surname"
              name="surname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.surname}
              label="Mijoz familiyasini kiriting"
              fullWidth
              required
            />
            <FormControl fullWidth>
              <MobileDatePicker
                label="Tug'ilgan sanasi"
                inputFormat="MM/dd/yyyy"
                value={formik.values.dateBirth}
                onChange={(e) => formik.setFieldValue("dateBirth", e, true)}
                renderInput={({ color, ...params }) => (
                  <TextField {...params} color="primary" />
                )}
              />
            </FormControl>
            <TextField
              id="cardNumber"
              name="cardNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.cardNumber}
              label="Mijoz passport raqamini kiriting"
              fullWidth
              required
            />
            <TextField
              id="personalNumber"
              name="personalNumber"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.personalNumber}
              label="Mijozning telefon raqamini kiriting"
              fullWidth
              required
            />
            <TextField
              id="address"
              name="address"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.address}
              label="Mijoz manzilini kiriting"
              fullWidth
              required
            />

            <Button variant="outlined" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </div>
      </section>
    </LocalizationProvider>
  );
};

export default CreateApplication;
