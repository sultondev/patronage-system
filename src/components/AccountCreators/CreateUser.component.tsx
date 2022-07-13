import "./styles/CreateModerator.style.css";
import { useState } from "react";
import { FastField, Field, useFormik } from "formik";
import axios from "axios";
import { Button, TextField } from "@mui/material";
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
      surename: "",
      role: "",
      email: "",
      phone: "",
    },
    onSubmit: (values) => {
      authProtectedApi()
        .post("/users", values)
        .then(function (response) {
          formik.resetForm();
        })
        .catch(function (error) {
          console.log(error);
        });

      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className="createUser h-screen flex justify-center items-center">
      <div className="container mx-auto flex justify-center flex-col gap-6 items-center">
        <h1 className="text-3xl text-white">Foydalanuchchi yaratish</h1>

        <form
          onSubmit={formik.handleSubmit}
          className="signIn-box border-[1px] border-black bg-white  flex flex-col gap-4 items-center px-6 py-4
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
            id="surename"
            name="surename"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.surename}
            label="Familyangizni kiriting"
            fullWidth
            required
          />
          <select
            value={formik.values.role}
            onChange={formik.handleChange}
            name="role"
            id="role"
          >
            <option value="">Ishlashni tanlang</option>
            {options[user.role as Roles].createUser.map((role) => (
              <option key={"role" + role} value={role}>
                {role}
              </option>
            ))}
          </select>
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
          <Button variant="outlined" fullWidth type="submit">
            Submit
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CreateUser;
