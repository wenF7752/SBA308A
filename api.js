const API_URL = 'https://min-api.cryptocompare.com';
const API_KEY = 'db11830bf86e61982e7348d597361a2456c3b339647e66a36ae3d58101d095f5';

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: { "Content-type": "application/json; charset=UTF-8" },

});

export const fetchPrice = async (params) => {
    try {
        const response = await axiosInstance.get('/data/pricemulti', {
            params: {
                ...params,
                api_key: API_KEY  // Include api_key in params
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchCoinsList = async () => {
    try {
        const response = await axiosInstance.get('/data/blockchain/list', {
            params: {
                api_key: API_KEY  // Include api_key in params
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchNews = async (params) => {
    try {
        const response = await axiosInstance.get('/data/v2/news/', {
            params: {
                ...params,
                api_key: API_KEY  // Include api_key in params
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchTop10Coins = async (params) => {
    try {
        const response = await axiosInstance.get('/data/top/totalvolfull', {
            params: {
                ...params,
                api_key: API_KEY  // Include api_key in params
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const fetchSignal = async (params) => {
    try {
        const response = await axiosInstance.get('/data/tradingsignals/intotheblock/latest', {
            params: {
                ...params,
                api_key: API_KEY  // Include api_key in params
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}