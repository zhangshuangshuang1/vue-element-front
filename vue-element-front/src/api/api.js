import axios from 'axios';



let productionApi = 'http://10.43.208.19:5001'

let developmentApi = 'http://localhost:80/fishbone/api/v1.0'  //修改为后端服务器ip，本地调试为localhost 

let testApi = 'http://127.0.0.1:5000'



let base = testApi

export const testRouter = params => { return axios.get(`${base}/`, params).then(res => res.data); };

export const requestLogin = params => { return axios.post(`${base}/login`, params).then(res => res.data); };


export const getUserListPage = params => { return axios.get(`${base}/users`, { params: params }); }; //查询用户 

export const addUser = params => { return axios.post(`${base}/users`,{ params: params }); };   //新增用户

export const deleteUser = params => { return axios.delete(`${base}/users`,{ params: params }); };//删除用户 

export const updateUser = params => { return axios.put(`${base}/users`,{ params: params }); };//跟新用户 


export const getRichText = params => { return axios.get(`${base}/articles`, { params: params }); }; //查询文章
export const postRichText = params => { return axios.post(`${base}/articles`,{ params: params }); };   //增加文章

export const getLmVulnsApi = params => { return axios.get(`${base}/lmVulns`, { params: params }); };

export const getSafeVulnsApi = params => { return axios.get(`${base}/safeVulns`, { params: params }); };

export const updateSafeVulnsApi  = params => { return axios.put(`${base}/safeVulns`,{ params: params }); };

export const getRawDatas = params => { return axios.get(`${base}/rawDatas`, { params: params }); };

export const importRawData = params => { return axios.post(`${base}/rawDatas`, params, { headers:{'Content-Type':'multipart/form-data'}}); };

export const getRefreshToken = params => { return axios.post(`${base}/auth/refresh`, params).then(res => res.data); };

export const createProjectApi = params => { return axios.post(`${base}/projects`,{ params: params }); };

export const getProjectListPage  = params => { return axios.get(`${base}/projects`, { params: params }); };

export const deleteProject = params => { return axios.delete(`${base}/projects`,{ params: params }); };

export const updateProject = params => { return axios.put(`${base}/projects`,{ params: params }); };

export const getProjectComponentApi = params => { return axios.get(`${base}/components`, { params: params }); };

export const updateProjectComponentApi = params => { return axios.put(`${base}/components`,{ params: params }); };

export const getVulnAlarmsApi = params => { return axios.get(`${base}/vulnAlarms`, { params: params }); };

export const updateVulnAlarmsApi = params => { return axios.put(`${base}/vulnAlarms`,{ params: params }); };

export const exportVulnAlarmAPI = params => { return axios.post(`${base}/exportVulnAlarms`,{ params: params}, {responseType:'arraybuffer'}); };

export const RequestUacAuth = params => { return axios.post(`${base}/uacAuth`, params).then(res => res.data); };





// axios.interceptors.request.use(

//     config => {

//           if (config.url.indexOf("refresh")>-1)  {

//             let token =sessionStorage.getItem('refresh_token')

//               if (token) {

//                   config.headers.Authorization = 'Bearer '+token;

//               }

//               return config

//           } else {

//             let token =sessionStorage.getItem('access_token')

//               if (token) {

//                   config.headers.Authorization = 'Bearer '+token;

//               }

//               return config

//           }

       

//         },err => {

//           return Promise.reject(err); 

//         }

// )



// function clearToken() {

//     sessionStorage.removeItem('user');

//     sessionStorage.removeItem('access_token');

//     sessionStorage.removeItem('refresh_token');

// }



// axios.interceptors.response.use(undefined, function (err) {

//       if (typeof err.response =='undefined') {

//              clearToken();

//              window.location.href = '#/login'

//              window.isRefreshing = false

//       } else if (err.response.status === 401 && err.config && !window.isRefreshing) {

//             window.isRefreshing = true

//             return getRefreshToken({}).then(data =>{               

//                 window.isRefreshing = false

//                 let {access_token} = data;

//                 sessionStorage.setItem('access_token', access_token);

//                 err.config.headers.Authorization = 'Bearer ' + access_token;

//                 return axios(err.config);

//             })

//             .catch(function (error) {

//                 clearToken();

//                 window.location.href = '#/login'

//                 window.isRefreshing = false

//             });

//       } else if(err.response.status === 403 || err.response.status === 500) {

//             return err.response

//       } else {

//           window.isRefreshing = false

//           throw err;

//       }

        

// });