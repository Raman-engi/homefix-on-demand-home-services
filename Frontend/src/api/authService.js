import api from "./api";

const authService = {
  sendOTP: async (email) => {
    const res = await api.post("/auth/send-otp", { email });
    return res.data;
  },

  verifyOTP: async (email, otp) => {
    const res = await api.post("/auth/verify-otp", {
      email,
      otp,
    });
    return res.data;
  },

  signup: async (data) => {
    const res = await api.post("/auth/signup", data);
    return res.data;
  },

  login: async (data) => {
    const res = await api.post("/auth/login", data);
    return res.data;
  },
};

export default authService;