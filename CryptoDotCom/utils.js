const cE = (type) => document.createElement(type);
const qS = (element) => document.querySelector(element);
const qSA = (element) => document.querySelectorAll(element);

const BASE_URL = "https://api.coinstats.app/public/v1/";

const GET = async (endpoint) => {
  const res = await fetch(BASE_URL + endpoint);
  const data = await res.json();
  return data;
};

const GET_convert = async (from, to, ammount) => {
  const res = await fetch(
    `https://api.coinconvert.net/convert/${from}/${to}?amount=${ammount}`
  );
  const data = await res.json();
  return data;
};

const cardGenerator = (data, nameCla, logoCla, priceCla, varCla) => {
  const card = cE("div");
  const firstPart = cE("div");
  const secondPart = cE("div");
  const rank = cE("h3");
  const logo = cE("img");
  const name = cE("p");
  const price = cE("p");
  const priceChange = cE("p");

  card.className = `${nameCla}`;
  logo.className = `${logoCla}`;
  firstPart.className = "first-part";
  priceChange.className = `${varCla}`;
  rank.className = "rank-trending";
  rank.textContent = data.rank;
  logo.src = data.icon;
  name.textContent = data.name;
  price.textContent = `$ ${data.price.toFixed(2)}`;
  priceChange.textContent = data.priceChange1d;
  if (data.priceChange1d < 0) {
    priceChange.style.color = "red";
    priceChange.textContent = `▼ ${data.priceChange1d}% `;
  } else if (data.priceChange1d > 0) {
    priceChange.style.color = "green";
    priceChange.textContent = `▲ ${data.priceChange1d}%`;
  } else {
    priceChange.textContent = `✚ ${data.priceChange1d}%`;
  }
  secondPart.appendChild(priceChange);
  firstPart.append(rank, logo, name, price);
  card.append(firstPart, secondPart);
  return card;
};

const listGenerator = (data) => {
  const card = cE("div");
  const rank = cE("p");
  const logo = cE("img");
  const name = cE("p");
  const price = cE("p");
  const priceChangeHour = cE("p");
  const priceChangeDay = cE("p");
  const priceChangeWeek = cE("p");
  const marketCap = cE("p");
  const volume = cE("p");
  const supply = cE("p");

  card.className = "crypto";
  logo.className = "logo";
  rank.className = "rank";

  name.className = "name";
  price.className = "price";
  priceChangeHour.className = "priceH-text";
  priceChangeDay.className = "priceD-text";
  priceChangeWeek.className = "priceW-text";
  marketCap.className = "marketCap-text";
  volume.className = "volume-text";
  supply.className = "supply-text";

  rank.textContent = data.rank;
  logo.src = data.icon;
  name.textContent = data.name;

  price.textContent = `$ ${data.price.toFixed(2)}`;
  priceChangeDay.textContent = data.priceChange1d;
  if (data.priceChange1d < 0) {
    data.priceChange1d = data.priceChange1d * -1;
    priceChangeDay.style.color = "red";
    priceChangeDay.textContent = `▼ ${data.priceChange1d}%`;
  } else if (data.priceChange1d > 0) {
    priceChangeDay.style.color = "green";
    priceChangeDay.textContent = `▲ ${data.priceChange1d}%`;
  } else {
    priceChangeDay.textContent = `✚ ${data.priceChange1d}%`;
  }
  priceChangeHour.textContent = data.priceChange1h;
  if (data.priceChange1h < 0) {
    data.priceChange1h = data.priceChange1h * -1;
    priceChangeHour.style.color = "red";
    priceChangeHour.textContent = `▼ ${data.priceChange1h}%`;
  } else if (data.priceChange1h > 0) {
    priceChangeHour.style.color = "green";
    priceChangeHour.textContent = `▲ ${data.priceChange1h}%`;
  } else {
    priceChangeHour.textContent = `✚ ${data.priceChange1h}%`;
  }
  priceChangeWeek.textContent = data.priceChange1w;
  if (data.priceChange1w < 0) {
    data.priceChange1w = data.priceChange1w * -1;
    priceChangeWeek.style.color = "red";
    priceChangeWeek.textContent = `▼ ${data.priceChange1w}%`;
  } else if (data.priceChange1w > 0) {
    priceChangeWeek.style.color = "green";
    priceChangeWeek.textContent = `▲ ${data.priceChange1w}%`;
  } else {
    priceChangeWeek.textContent = `✚ ${data.priceChange1w}%`;
  }
  marketCap.textContent = `$ ${data.marketCap.toFixed(2)}`;

  volume.textContent = `$ ${data.volume.toFixed(2)}`;
  supply.textContent = `$ ${data.totalSupply.toFixed(2)}`;

  card.append(
    logo,
    rank,
    name,
    price,
    priceChangeHour,
    priceChangeDay,
    priceChangeWeek,
    marketCap,
    volume,
    supply
  );
  return card;
};
export { cE, qS, qSA, GET, cardGenerator, listGenerator, GET_convert };
