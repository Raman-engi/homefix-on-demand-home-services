import api from "./api";

const providerService = {
  getAllProviders: async () => {
    const response = await api.get("/providers");
    return response.data;
  },

  getProviderById: async (id) => {
    const response = await api.get(`/providers/${id}`);
    return response.data;
  },
};

export default providerService;