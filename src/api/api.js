import axios from "axios";
 
const API_BASE = "http://localhost:9090/telegrami-api/nm";
 
export const getAllActive = async () => {
  const response = await axios.get(`${API_BASE}/getAllActive`);
  return response.data;
};
export const getTelegramById = async (id) => {
  const response = await axios.get(`${API_BASE}/telegrama/${id}`);
  return response.data;
};