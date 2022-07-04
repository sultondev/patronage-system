import "./styles/SignIn.style.css";
import { useFormik } from "formik";
import { Button, Link, TextField } from "@mui/material";

const SignIn = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <section className="signIn h-screen flex justify-center items-center">
      <div className="container mx-auto flex justify-center flex-col gap-6 items-center">
        <h1 className="text-3xl text-white">Hush kelibsiz</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="signIn-box border-[1px] border-black bg-white min-w-[500px] flex flex-col gap-4 items-center px-6 py-4"
        >
          <h2 className="text-xl">Tarmoqga kirish</h2>
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
          />
          <TextField
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            label="Shaxshiy ko'dingizni kiriting"
            fullWidth
          />
          <div className="flex w-full justify-between mt-4">
            <Link href="#">Yangi foydalanuchi yaratish</Link>
            <Link href="#">Parolni esdan chiqardim</Link>
          </div>
          <Button variant="outlined" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
