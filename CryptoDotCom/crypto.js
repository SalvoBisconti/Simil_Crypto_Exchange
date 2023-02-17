import { GET, qS, qSA, cE, cardGenerator, listGenerator } from "./utils.js";

const crypto = qS(".crypto-main");
const tranding = qS(".trending-crypto");
const mostValuable = qS(".mostV-crypto");
const firstButtonEl = qS(".frt_button");
const secondButtonEl = qS(".scn_button");
const thirdButtonEl = qS(".trd_button");

const deleteCrypto = () => {
  const allCrypto = qSA(".crypto");
  allCrypto.forEach((card) => card.remove());
};
const selectedGen = () => {
  GET("coins?skip=0&limit=60").then((data) => {
    console.log(data.coins);
    data.coins.sort((x, y) => y.priceChange1d - x.priceChange1d);
    data.coins
      .filter((crypto) => crypto.priceChange1d >= 0)
      .map((crypto) =>
        tranding.appendChild(
          cardGenerator(
            crypto,
            "cryptoSelectioned",
            "logoSelectioned",
            "pricedSelectioned",
            "variable-price-selectioned"
          )
        )
      );
  });

  GET("coins?skip=0&limit=60").then((data) => {
    console.log(data.coins);
    data.coins.sort((x, y) => y.price - x.price);
    data.coins
      .filter((crypto) => crypto.price >= 1500)
      .map((crypto) =>
        mostValuable.appendChild(
          cardGenerator(
            crypto,
            "cryptoSelectioned",
            "logoSelectioned",
            "pricedSelectioned",
            "variable-price-selectioned"
          )
        )
      );
  });
};

GET("coins?skip=0&limit=20").then((data) => {
  console.log(data.coins);
  data.coins.map((item) => crypto.appendChild(listGenerator(item)));
});

selectedGen();
firstButtonEl.classList = "btn-select";
secondButtonEl.classList = "btn-unselected";
thirdButtonEl.classList = "btn-unselected";

firstButtonEl.addEventListener("click", () => {
  deleteCrypto();
  firstButtonEl.classList = "btn-select";
  secondButtonEl.classList = "btn-unselected";
  thirdButtonEl.classList = "btn-unselected";
  GET("coins?skip=0&limit=20").then((data) => {
    console.log(data.coins);
    data.coins.map((item) => crypto.appendChild(listGenerator(item)));
    selectedGen();
  });
});

secondButtonEl.addEventListener("click", () => {
  deleteCrypto();
  secondButtonEl.classList = "btn-select";
  firstButtonEl.classList = "btn-unselected";
  thirdButtonEl.classList = "btn-unselected";
  GET("coins?skip=20&limit=20").then((data) => {
    console.log(data.coins);
    data.coins.map((item) => crypto.appendChild(listGenerator(item)));
    selectedGen();
  });
});

thirdButtonEl.addEventListener("click", () => {
  deleteCrypto();
  thirdButtonEl.classList = "btn-select";
  secondButtonEl.classList = "btn-unselected";
  firstButtonEl.classList = "btn-unselected";
  GET("coins?skip=40&limit=20").then((data) => {
    console.log(data.coins);
    data.coins.map((item) => crypto.appendChild(listGenerator(item)));
    selectedGen();
  });
});
