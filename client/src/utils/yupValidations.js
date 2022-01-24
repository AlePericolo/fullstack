import { number, string, bool, array, date, ref } from 'yup'

export const numberValidator = (field) => {
    return number()
        .required(`${field ? field : 'this field'} is required`)
        .typeError(`${field ? field : 'this field'} must be a number`)
}

export const numberPositiveValidator = (field) => {
    return number()
        .positive()
        .required(`${field ? field : 'this field'} is required and must be positive`)
        .typeError(`${field ? field : 'this field'} must be a number and must be positive`)
}

export const doubleValidator = (field) => {
    return number()
        .required(`${field ? field : 'this field'} is required`)
        .typeError(`${field ? field : 'this field'} must be a decimal number`)
}

export const stringValidator = (field) => {
    return string()
        .required(`${field ? field : 'this field'} is required`)
}

export const checkboxValidator = (field) => {
    return bool()
        .oneOf([true], `${field ? field : 'this field'} is required`)
}

export const radioValidator = (field) => {
    return string()
        .required(`${field ? field : 'this field'} is required`)
        .typeError(`${field ? field : 'this field'} must be selected`)
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
            test: (value) => value && value.length !== 0
        })
}

export const dateValidator = (field) => {
    return date()
        .required(`${field ? field : 'this field'} is required`)
        .typeError(`${field ? field : 'this field'} must be a date`)
}