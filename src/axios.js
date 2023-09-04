import axios from  'axios'

 // const baseURL= "http://3.109.148.179/Toms_customer_connect/api/"
//const baseURL= "http://3.109.148.179/Target_BlueClick_Api_Po/api/"
//const baseURL ="http://192.168.1.162:9929/api/"
//const baseURL ="http://winserver12:1009/api/"
  // const baseURL = "http://localhost:9929/api/"
  // const baseURL = "http://localhost:9927/api/"
  // const baseURL = " http://desktop-o3684s3:9927/api"
   const baseURL = "http://103.27.85.36/tomspognerator/api/"
 //const baseURL = "http://103.27.85.36/PO_Generator_Testing_API/api/"
 //const baseURL= "http://3.109.148.179/Tomswithoutindentapi/api/"
const instance = axios.create({
    baseURL
   
})


export default  {
  instance ,   
  baseURL
}
