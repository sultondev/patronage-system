import "./styles/CreateModerator.style.css";
import { useFormik } from "formik";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { userAtom } from "../../recoil/atoms";
import { useRecoilState } from "recoil";
import { Roles } from "../../typing/enums/Role.enum";
import { authProtectedApi } from "../../config/axios.config";
const options = {
  [Roles.SUPERUSER]: {
    createUser: [Roles.SUPERUSER, Roles.EMPLOYEE, Roles.MODERATOR],
  },
  [Roles.EMPLOYEE]: {
    createUser: [Roles.MODERATOR],
  },
  [Roles.MODERATOR]: {
    createUser: [],
  },
};
const CreateUser = () => {
  const [user] = useRecoilState(userAtom);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      surname: "",
      role: "",
      email: "",
      phone: "",
    },
    onSubmit: (values, formikHelpers) => {
      if (Object.values(formik.errors).some((v) => v)) return;

      authProtectedApi()
        .post("/users", values)
        .then(function () {
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
    <section className="createUser my-20  h-screen flex justify-center items-center">
      <div className="container  mx-auto flex justify-center flex-col gap-6 items-center">
        <h1 className="text-3xl">Foydalanuvchi yaratish</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="signIn-box border-[1px] border-black bg-white  flex flex-col gap-4 items-center px-6 py-10
          ex-sm:min-w-full
          md:min-w-[500px]
          "
        >
          <TextField
            // html input attribute
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            // pass down to FormLabel as children
            label="Foydalanuchi ismingizni kiriting"
            fullWidth
            required
          />
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            label="ko'd yarating kiriting"
            fullWidth
            required
          />
          <TextField
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            label="Ism kiriting"
            fullWidth
            required
          />
          <TextField
            id="surname"
            name="surname"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.surname}
            label="Familyangizni kiriting"
            fullWidth
            required
          />

          <FormControl fullWidth>
            <InputLabel id="role-label">Ishlashni tanlang</InputLabel>
            <Select
              id="role"
              labelId="role-label"
              label="Ishlashni tanlang"
              fullWidth
              value={formik.values.role}
              onChange={(e) => formik.handleChange("role")(e.target.value)}
            >
              {options[user.role as Roles].createUser.map((role) => (
                <MenuItem key={"role" + role} value={role}>
                  {role}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            // html input attribute
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            // pass down to FormLabel as children
            label="email kiriting"
            fullWidth
            required
          />
          <TextField
            // html input attribute
            id="phone"
            name="phone"
            type="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            // pass down to FormLabel as children
            label="telefon raqam kiriting"
            fullWidth
            required
          />

          <div className="flex w-full justify-between mt-4"></div>
          <Button
            disabled={formik.isSubmitting}
            variant="outlined"
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
