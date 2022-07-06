import "./styles/CreateUser.style.css";
import { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Button, Link, TextField } from "@mui/material";
const CreateUser = () => {
  const [token, setToken] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      name: "",
      surename: "",
      role: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      axios
        .post("https://patronage-system-uz.herokuapp.com/api/auth/login", {
          username: values.username,
          password: values.password,
        })
        .then(function (response) {
          setToken(response.data.access_token);
          setLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        })
        .finally(() => {
          if (token) {
            axios
              .post(
                "https://patronage-system-uz.herokuapp.com/api/auth/token/check",
                {
                  access_token: token,
                }
              )
              .then(function (response) {
                console.log(response);
              });
          }
        });
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="createUser h-screen flex justify-center items-center">
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
            <Link href="#"></Link>
            <Link href="#">Yaratilgan akkauntga kirish</Link>
          </div>
          <Button variant="outlined" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
