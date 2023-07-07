import * as yup from 'yup';
const passwordPattern = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$';
const errorMessage = 'your password must contain atleast one uppercase, one lowercase ,one special character and one digit'
const loginSchema = yup.object().shape({
   username:yup.string().min(5).max(30).required('username is required'),
   password:yup.string().min(8).max(25).matches(passwordPattern,{message:errorMessage}).required('password is required') 
})
export default loginSchema;