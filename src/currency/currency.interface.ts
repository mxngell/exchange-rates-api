export interface IExchangeRates {
  [key: string]: number;
}

export interface IExchangeRatesResult {
  currency: string;
  rates: IExchangeRates;
}

export interface IConverseCurrencyResult {
  base_currency: string;
  target_currency: string;
  conversion_rate: number;
}

export interface IError {
  message: string;
  status: string;
}
