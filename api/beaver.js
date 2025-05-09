const fetch = require('node-fetch');

module.exports = async (req, res) => {
  try {
    const response = await fetch('https://www.swl-wc.usace.army.mil/pages/data/tabular/htm/beaver.htm');
    const html = await response.text();
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (err) {
    res.status(500).send("Error fetching data");
  }
};
