import { Request, Response, Router } from "express";
import { CurrencyService } from "./currency.service";

const router: Router = Router();

const currencyService: CurrencyService = new CurrencyService();

router.get("/:currency", async (request: Request, response: Response) => {
  const result = await currencyService.getExchangeRates(request.params.currency);
  response.status(200).json(result);
});

router.get("/converse/:fromCurrency/:toCurrency", async (request: Request, response: Response) => {
  const result = await currencyService.converseCurrency(request.params.fromCurrency, request.params.toCurrency);
  response.status(200).json(result);
});

export const currencyRouter = router;
