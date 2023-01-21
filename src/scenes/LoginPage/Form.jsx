import { useMediaQuery, useTheme } from "@mui/material";
import { Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";


const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password:  yup.string().required("required"),
        location: yup.string().required("required"),
    occupation:  yup.string().required("required"),
    picture:  yup.string().required("required"),

})

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password:  yup.string().required("required")
})

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: ""
}

const initialValuesLogin = {
    email: "",
    password: ""
}

const Form = () => {
    const [pageType, setPageType] = useState("login");
    const theme = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const handleFormSubmit = async (values, onSubmitProps) => {
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema = {isLogin ? loginSchema : registerSchema}
        >

        </Formik>
    )
   
};

export default Form;