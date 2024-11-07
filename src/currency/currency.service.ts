import axios, { AxiosInstance } from "axios";
import dotenv from "dotenv";
import { IConverseCurrencyResult, IError, IExchangeRates, IExchangeRatesResult } from "./currency.interface";
import { TCurrency } from "./currency.type";

dotenv.config({ path: "./config/.env" });

export class CurrencyService {
  private readonly EXCHANGE_API_URL: string | undefined = process.env.EXCHANGE_API_URL;
  private readonly EXCHANGE_API_KEY: string | undefined = process.env.EXCHANGE_API_KEY;

  private readonly axiosInstance: AxiosInstance = axios.create({
    baseURL: `${this.EXCHANGE_API_URL}`,
    headers: {
      Authorization: `Bearer ${this.EXCHANGE_API_KEY}`
    }
  });

  async getExchangeRates(currency: TCurrency): Promise<IExchangeRatesResult | IError> {
    try {
      const apiRequest = await this.axiosInstance.get(`/latest/${currency}`);
      const exchangeRates: IExchangeRates = apiRequest.data.conversion_rates;
      return {
        currency: currency,
        rates: exchangeRates
      };
    } catch (error: any) {
      return {
        message: error.message,
        status: error.status
      };
    }
  }

  async converseCurrency(fromCurrency: TCurrency, toCurrency: TCurrency): Promise<IConverseCurrencyResult | IError> {
    try {
      const apiRequest = await this.axiosInstance.get(`/pair/${fromCurrency}/${toCurrency}`);
      const converceCurrencyResponse = apiRequest.data;
      return {
        base_currency: converceCurrencyResponse.base_code,
        target_currency: converceCurrencyResponse.target_code,
        conversion_rate: converceCurrencyResponse.conversion_rate
      };
    } catch (error: any) {
      return {
        message: error.message,
        status: error.status
      };
    }
  }
}
