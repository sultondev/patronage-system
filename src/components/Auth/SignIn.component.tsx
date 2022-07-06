import "./styles/SignIn.style.css";
import { useFormik } from "formik";
import { Button, Link, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { publicApi } from "../../config/axios.config";

const SignIn = () => {
  // const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const { isSubmitting, errors, ...formik } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        const response = await publicApi.post("auth/login", {
          username: values.username,
          password: values.password,
        });
        if (response.data.access_token) {
          navigate("/", {
            replace: true,
          });
          // getUser -> set to Recoil -> redirect to / -> App (check user.authenticated) -> valid and let it go
        }
      } catch (error: any) {
        setErrors({
          password: "Invalid username or password",
        });
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <section className="signIn h-screen flex justify-center items-center">
      <div className="container mx-auto flex justify-center flex-col gap-6 items-center">
        <h1 className="text-3xl text-white">Xush kelibsiz</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="signIn-box border-[1px] border-black bg-white min-w-[500px] flex flex-col gap-4 items-center px-6 py-4"
        >
          <h2 className="text-xl">Tarmoqga kirish</h2>
          <TextField
            id="username"
            name="username"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.username}
            label="Foydalanuchi ismingizni kiriting"
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Shaxshiy kodingizni kiriting"
            fullWidth
          />
          {errors.password && <p className="text-red-500">{errors.password}</p>}
          <div className="flex w-full justify-between mt-4">
            <Link href="#">Yangi foydalanuchi yaratish</Link>
            <Link href="#">Parolni esdan chiqardim</Link>
          </div>
          <Button
            disabled={isSubmitting}
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

export default SignIn;
