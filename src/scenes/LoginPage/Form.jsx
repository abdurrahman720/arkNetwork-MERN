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
    
})