import { string, array, ref } from 'yup'

export const stringValidator = (value) => {
    return string()
        .required(`${value ? value : 'this field'} is required`)
}

export const emailValidator = () => {
    return string()
        .required("email is required")
        .matches(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "email is invalid")
}

export const passwordValidator = () => {
    return string()
        .required("password is required")
        .matches(/^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "password is invalid")
}

export const compareValueValidator = (compareTo) => {
    return string()
        .oneOf([ref(compareTo), null], "values must match")
}

export const arrayValidator = (message) => {
    return array()
        .test({
            message: `${message ? message : 'this field is required'}`,
            test: (arr) => arr.length !== 0
        })
}