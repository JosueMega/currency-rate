const rp = require('request-promise');
const cheerio = require('cheerio');
const  {url} = require('../config.json')

let {banreservas} = url;

//creating the object 
let obj = {
  url: `https://www.banreservas.com/`,
  "rejectUnauthorized": false,
  transform: body => cheerio.load(body)
}

function addcurrency(mount, bussine, currencyType) {          
   
  
    currency= {mount,currencyType,bussine}
    return currency;
  
}

const  DoRequest =async ()=>{
      return   new Promise((resolve,reject)=>{
            try {                
                rp(obj)
                    .then(function ($) {
                          
                        let datatasas = [];    
                        let reTaza = [];    
                        let counter = 0; 
                        let currency ={}; 
                        let datalimpia = "";   
                        $('.currency-box-table ').find('tbody').find('tr').find('td').each(function (i, elem) { 
                            datalimpia = $(this).html()

                            datatasas.push(datalimpia);

                                 });
               
                                reTaza.push(addcurrency(datatasas[4],datatasas[1],datatasas[3]));
                                reTaza.push(addcurrency(datatasas[5],datatasas[1],datatasas[6]));
                                reTaza.push(addcurrency(datatasas[7],datatasas[2],datatasas[3]));
                                reTaza.push(addcurrency(datatasas[8],datatasas[2],datatasas[6]));

                               
                        resolve(reTaza)
                    })
                    .catch (ex=>{

                        reject(ex);
                    });                
                
            } catch (error) {
                reject(error);
            }
         })
    }
    DoRequest();
    module.exports={
        DoRequest:DoRequest
    }

