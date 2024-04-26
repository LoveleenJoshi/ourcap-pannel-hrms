import { APICore } from './apiCore';

const api = new APICore();

const API_TOKEN = "452|3viDNntIwEZ0gF6QVPUDWPCGH9FMToRwVOW4tDQwc34b09e7";

function userAttendanceApi() { 
    const baseURL = "https://ourcap-hrms.ctportfolio.in/api/get-my-attendance";
    return api.create(`${baseURL}`, { headers: {Authorization: `Bearer ${API_TOKEN}`,  }});
}
export { userAttendanceApi };



