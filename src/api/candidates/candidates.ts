import axios from "axios";
import { API_URL } from "../api_URL";
import { Email, Password } from "../creds";

export const createCandidate = async (reqData: any) => {
  try {
    const response = await axios.post(`${API_URL}contacts/create`, reqData, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + btoa(`${Email}:${Password}`),
      },
    });
    return response.data; // Axios automatically parses the JSON response
  } catch (err: any) {
    // Axios throws an error for non-2xx status codes, you can access `err.response`
    return err.response ? err.response.data : err.message;
  }
};

export async function uploadResume(reqData: any) {
  try {
    const response = await axios.post(`${API_URL}contacts/resume`, reqData, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + btoa(`${Email}:${Password}`),
      },
      onUploadProgress: (progressEvent: any) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(progress);
      },
    });
    return response.data;
  } catch (err: any) {
    console.error("Upload error:", err);
    return err.response ? err.response.data : err.message;
  }
}

export const updateCandidate = async (reqData: any, id: number) => {
  try {
    const response = await axios.put(
      `${API_URL}contacts/${id}`,
      reqData,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Basic " + btoa(`${Email}:${Password}`),
        },
      }
    );
    return response.data; // Axios automatically parses the JSON response
  } catch (err: any) {
    // Axios throws an error for non-2xx status codes, you can access `err.response`
    return err.response ? err.response.data : err.message;
  }
};

export const fetchCandidates = async () => {
  try {
    const response = await axios.get(`${API_URL}contacts/allContacts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + btoa(`${Email}:${Password}`),
      },
    });
    return response.data; // Axios automatically parses the JSON response
  } catch (err: any) {
    // Axios throws an error for non-2xx status codes, you can access `err.response`
    return err.response ? err.response.data : err.message;
  }
};

// Only Accessible for Super Admin
export const deleteCandidates = async (candidateId: any) => {
  try {
    const response = await axios.delete(`${API_URL}contacts/${candidateId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + btoa(`${Email}:${Password}`),
      },
    });
    return response.data; // Axios automatically parses the JSON response
  } catch (err: any) {
    // Axios throws an error for non-2xx status codes, you can access `err.response`
    return err.response ? err.response.data : err.message;
  }
};

export const fetchCandidate = async (candidateId: any) => {
  try {
    const response = await axios.get(`${API_URL}contacts/${candidateId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + btoa(`${Email}:${Password}`),
      },
    });
    return response.data; // Axios automatically parses the JSON response
  } catch (err: any) {
    // Axios throws an error for non-2xx status codes, you can access `err.response`
    return err.response ? err.response.data : err.message;
  }
};

export const searchCandidates = async (query: any) => {
  try {
    const response = await axios.post(
      `${API_URL}api/search/candidates`,
      query,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Authorization: "Basic " + btoa(`${Email}:${Password}`),
        },
      }
    );
    return response.data;
  } catch (err: any) {
    return err.response ? err.response.data : err.message;
  }
};

export const contactSearchByKeyword = async (keyword: string) => {
  try {
    const response = await axios.get(`${API_URL}contacts/searchByKeyword`, {
      method: "GET",
      params: { keyword },
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Basic " + btoa(`${Email}:${Password}`),
      },
    });
    return response.data;
  } catch (err: any) {
    return err.response ? err.response.data : err.message;
  }
};
