const BASE =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// console.log("pp", fromCurr, toCurr);
// console.log("happy");

// for (code in countryList) {
//   console.log(code, countryList[code]);
// }

// console.log(dropdown);

for (let select of dropdown) {
  for (codes in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = codes;
    newOption.value = codes;
    select.append(newOption);
    if (select.name === "from" && codes === "USD")
      newOption.selected = "selected";
    if (select.name === "to" && codes === "INR")
      newOption.selected = "selected";
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateExchangeRate = async () => {
  let amt = document.querySelector(".amount input");
  if (amt === "" || amt < 0) {
    amt = 1;
    amt.value = "1";
  }
  //   console.log(amt);
  //   console.log(amt.value);
  //   console.log("pp", fromCurr.value, toCurr.value);
  //   console.log("happy");
  const URL = `${BASE}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  //   console.log(URL);
  let respone = await fetch(URL);
  //   console.log(respone);
  let exchangeRate = respone[toCurr.value.toLowerCase()];
  //   console.log(exchangeRate);
  let finalAmount = exchangeRate * amt;
  msg.innerText = `${amt.value} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

const updateFlag = (element) => {
  //   console.log(element);
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// btn.addEventListener("click", async (evt) => {
//   evt.preventDefault();
//   updateExchangeRate();
// });
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", (evt) => {
  updateExchangeRate();
});
