// // import { useCookie } from "h3";
// export const useFetchResponse = async (body: {
//   url: string;
//   methods: string;
//   body: any;
//   params: any;
// }) => {
//   // 封装fetch请求
//   // 设置baseUrk
//   const baseUrl = process.env.BASEURL || "http://localhost:20000";
//   // 获取token的Cookles
//   const Token = useCookie("token");
//   // 判断Token
//   const { url, methods, params } = body;
//   const HeaderOption: { Authorization?: string } = {};
//   // if (Token) {
//   //   HeaderOption.Authorization = "Bearer" + Token;
//   // }
//   clog("统一拦截1");
//   HeaderOption.Authorization = "Bearer eyJhbGciOiJIUzI1NiJ9.NjA0NzhmNGFhNjk5MGQwYmQwMGUyNTJj.LHSChktNbIzMo8BtdGr7olGIDNbFE3e8A4V9ZhB6GSE";
//   const response  =  $fetch(url, {
//     method: methods,
//     headers: HeaderOption,
//     // baseURL: baseUrl,
//     params: params,
//   });

//   return await $fetch(API, {
// 		method: methods,
// 		// headers: useRequestHeaders(['cookie']),
//     headers: HeaderOption,
// 		async onResponseError({ response }) {
// 			// if (response.status === 401) {
// 			// 	clog('auth');
// 			// 	await useRequest('/api/auth/refresh');
// 			// 	return await request(API, method, body);
// 			// } else {
// 			// 	throw new Error(response._data.message);
// 			// }
//       throw new Error(response._data.message);
// 		},
// 	});
//   // 统一拦截
//   if (response.status == 200) {
//     return response;
//   }
// };
