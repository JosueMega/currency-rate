
const rp = require('request-promise');
const cheerio = require('cheerio');
const  {url} = require('../config.json')
const puppeteer = require('puppeteer');
let reTaza = [];    
                            let counter = 0; 
                            let currency ={}; 
                            let currencyType="";
                            let bussine = ""; 
                            let mount = "";   

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://www.apap.com.do/');
//   await page.click(".dropdown-item .currency");
//    const contex = page.content;

//   await browser.close();
// })();
// //get de url from the config
// let {apap} = url;

// //creating the object 
// let obj = {
//   url: `${apap}`,
//   transform: body => cheerio.load(body)
// }


// let apapTaza = [];
const DoRequest = async (num,currencyt) => {   


  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  await page.goto('https://www.apap.com.do/');
  await page.click("body > div.ui-page.ui-page-theme-a.ui-page-active > nav.navbar.navbar-expand-xl.navbar-light.nav-sub.mobile_logos > div > button");
  // await page.click("#currency-label");  
  await page.click("#currency-label-1");
  // await page.click(`#navbarSupportedContent > nav > div > div > ul:nth-child(2) > li:nth-child(2) > div > div > a:nth-child(${num})`);

  let result = await page.content();
   const  $ = await cheerio.load(result);
   console.log($);
   await browser.close();
   $('.nav-item a > span').each((i, e) => {  
     
     if (i < 2) {
      mount = $(e).html()
      currencyType=currencyt;
      if (counter==0) {
        bussine ="buy";                                    
         currency  = {mount,currencyType,bussine};
         counter++
        }else{
            bussine ="sale";
            currency= {mount,currencyType,bussine}
            counter=0;
        } 
        reTaza.push(currency);
       
     }
   })
  return reTaza;
}

 const currencyApap =  () => {   
   return new Promise(async(resolve, reject) => {
        
     try {
       let result = await DoRequest(2,'EUR');
       let result1 = await DoRequest(1,'US');
       
       resolve(result1);

     } catch (ex) {
       reject(ex);
     }
       
   })
 }

 
  module.exports={
    DoRequest: currencyApap
  }

