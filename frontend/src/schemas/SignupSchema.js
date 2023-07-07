import * as yup from 'yup';
//time 7:05:00
const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
const errorMessage = 'your password must contain atleast one uppercase, one lowercase , one digit and one special character'
const signupSchema = yup.object().shape({
    name: yup.string().max(30).required('name is required'),
    username: yup.string().min(5).max(30).required('username is required'),
    email: yup.string().email('Enter a Valid Email').required('email is required'),
    password: yup.string().min(8).max(25).matches(passwordPattern,{message:errorMessage}).required('password is required'),
    confirmPassword:yup.string().oneOf([yup.ref('password')],'passwords must match').required('password is required'),
});

export default signupSchema;