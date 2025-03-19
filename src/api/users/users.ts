import { API_URL } from "../api_URL";
import axios from "axios";
import { Email,Password } from "../creds";


export const fetchUserByEmail = async (email: string) => {
  try{ 
    const response = await axios.get(`${API_URL}/users/email/${email}`,{
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(`${Email}:${Password}`),
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  }catch (err: any) {
    console.log(err);
  }
};
