const axios = require("axios");
const cheerio = require("cheerio");

const webhook =
  "https://maker.ifttt.com/trigger/switch_restocked/with/key/iXWFnBnpABi9MVKJ0mgovKcZLMZCtrxzGleOoBSzF51";

const urls = [
  "https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-with-neon-blue-neon-red-joy-con-controllers/12245286.html",
  "https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-grey-animal-crossing-new-horizons-pack/12459924.html",
  "https://store.nintendo.co.uk/nintendo-switch-console/nintendo-switch-neon-blue-neon-red-animal-crossing-new-horizons-pack/12459923.html",
];

urls.forEach(async function (url) {
  const response = await axios.get(url);

  const dom = cheerio.load(response.data);

  if (
    !dom("button.productAddToBasket")
      .first()
      .hasClass("productAddToBasket-soldOut")
  ) {
    await axios.post(webhook, {
      value1: dom("h1.productName_title").first().text(),
      value2: url,
    });
  }
});
