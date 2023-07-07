import axios from "axios";
const api = axios.create({
    baseURL:process.env.REACT_APP_INTERNAL_API_PATH,
    withCredentials:true,
    headers:{
        "Content-Type":'application/json',
    },
});

export const login = async (data)=>{
    let response;
    try{
        response = await api.post('./login',data);
    }
    catch(error){
        return error;
    }
    return response;
}
export const signup = async(data)=>{
let response;
try{
response = await api.post('/register',data); //this register is backend endpoint for signup
}
catch(error){
return error;
}
return response;
}
export const signout = async ()=>{
    let response;
    try{
        response = await api.post('/logout');
    }
    catch(error){
        return error;
    }
    return response;
}
export const getAllBlogs = async ()=>{
    let response;
    try{
        response = await api.get('/blog/all');
    }
    catch(err){
        console.log(err);
    }
    return response;
}

export const submitBlog = async(data)=>{
    let response;
    try{
        response = await api.post('/blog',data);
    }
    catch(err){
        console.log(err)
    }
    return response;
}

export const getBlogById = async (id)=>{
    let response;
    try{
        response = await api.get(`/blog/${id}`);
    }
    catch(err){
     console.log(err);
    }
    return response;
}
export const getCommentsById = async (id)=>{
let response;
try{
response = await api.get(`/comment/${id}`, {
    validateStatus:false
});
}
catch(err){
console.log(err);
}
return response;
}

export const postComment = async (data)=>{
    let response;
    try{
        response = await api.post('/comment', data);
    }
    catch(err){
        console.log(err);
    }
    return response;
}

export const deleteBlog = async(id)=>{
    let response;
    try{
        response = await api.delete(`/blog/${id}`);
    }
    catch(err){
        console.log(err);
    }
    return response;
}

export const updateBlog = async(data)=>{
    let response;
    try{
        response = await api.put('/blog/update',data);
    }
    catch(err){
        console.log(err);
    }
    return response;
}; 

export const FavoriteApi = async(data)=>{
    let response;
    try{
        response = await api.post('favoriteCurrency',data);
    }
    catch(err){
        console.log(err);
    }
    return response;
}; 

export const AllFavoriteApis = async (data)=>{
    let response;
    try{
        response = await api.post('/AllfavoriteCurrency',data);
        console.log(response);
    }
    catch(err){
        console.log(err);
    }
    return response;
}