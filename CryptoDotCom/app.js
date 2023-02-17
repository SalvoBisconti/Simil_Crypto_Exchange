import { GET, qS, qSA, cE, cardGenerator, GET_convert } from "./utils.js";

const fromValue = qS("#firstValue");
const toValue = qS("#secondValue");
const fromCurrency = qS("#firstCurrency");
const toCurrency = qS("#secondCurrency");
const form = qS("#converterForm");

const crypto = qS(".crypto-sec");

GET("coins?skip=0&limit=6").then((data) => {
  console.log(data.coins);
  data.coins.map((item) =>
    crypto.appendChild(
      cardGenerator(item, "crypto", "logo", "priced", "variable-price")
    )
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const ammount = fromValue.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;
  console.log(from + ammount + to);

  GET_convert(from, to, ammount).then((data) => {
    const result = data[`${to}`];
    toValue.value = result;
  });
});
