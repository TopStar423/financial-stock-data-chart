import axios from 'axios';

const API_HOST = process.env.REACT_APP_ALPHA_VANTAGE_API_HOST as string;
const API_KEY = process.env.REACT_APP_ALPHA_VANTAGE_API_KEY;

const fetchData = async (endpoint: string, symbol: string) => {
    try {
        const response = await axios.get(API_HOST, {
            params: {
                function: endpoint,
                symbol: symbol,
                apikey: API_KEY,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching financial data:', error);
        throw error;
    }
};

export const fetchIncomeStatement = (symbol: string) => fetchData('INCOME_STATEMENT', symbol);
export const fetchBalanceSheet = (symbol: string) => fetchData('BALANCE_SHEET', symbol);
