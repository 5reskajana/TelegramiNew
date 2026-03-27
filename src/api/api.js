import axios from "axios";
 
const API_BASE = "http://192.168.102.61:8080/nm";
 
export const getAllActive = async () => {
  const response = await axios.get(`${API_BASE}/getAllActive`);
  return response.data;
};
export const getTelegramById = async (id) => {
  const response = await axios.get(`${API_BASE}/telegrama/${id}`);
  return response.data;
};