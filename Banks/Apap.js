const cheerio = require('cheerio');
const  {url} = require('../config.json')
const puppeteer = require('puppeteer');


    let reTaza = [];
    let counter = 0;
    let currency ={};
    let currencyType="";
    let bussine = "";
    let mount = "";


const DoRequest = async (num, currencyt) => {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.apap.com.do/');
  if (num == 1) {
    await page.evaluate(() => document.querySelector(`#navbarSupportedContent > nav > div > div > ul:nth-child(3) > li:nth-child(3) > div > div > a:nth-child(1)`).click())
  }
  else {
    await page.evaluate(() => document.querySelector(`#navbarSupportedContent > nav > div > div > ul:nth-child(3) > li:nth-child(3) > div > div > a:nth-child(2)`).click())
  }

  let result = await page.content();
  const $ =  cheerio.load(result);
  await browser.close();
  $('.nav-item a > span').each((i, e) => {

    if (i < 3 && i > 0) {
      mount = $(e).html()
      currencyType = currencyt;
      if (counter == 0) {
        bussine = "buy";
        currency = { mount, currencyType, bussine };
        counter++
      } else {
        bussine = "sale";
        currency = { mount, currencyType, bussine }
        counter = 0;
      }
      reTaza.push(currency);

    }
  })
  return reTaza;
}

const currencyApap = () => {
  return new Promise(async (resolve, reject) => {

    try {
      let result = await DoRequest(2, 'EUR');
      let result1 = await DoRequest(1, 'US');  
      resolve(result1);

    } catch (ex) {
      reject(ex);
    }

  })
}

  module.exports={
    DoRequest: currencyApap
  }

