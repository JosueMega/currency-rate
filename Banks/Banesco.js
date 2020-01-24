
const rp = require('request-promise');
const cheerio = require('cheerio');

let obj = {
    url: `https://www.banreservas.com/`,
    "rejectUnauthorized": false,
    transform: body => cheerio.load(body)
  }

  
const banco = 'Banesco';
const addcurrency = (mount, bussine, currencyType) => {       
    currency= {mount,currencyType,bussine,banco}
    return currency;
  }

const  DoRequest =async ()=>{
    return   new Promise((resolve,reject)=>{
          try {                
              rp(obj)
                  .then(function ($) {
                        
                      let datatasas = [];    
                      let reTaza = [];                            
                      let datalimpia = "";   
                      console.log($('.banca-mobile '))
                      //.each(function (i, elem) {                           
                          //datalimpia = $(this).html()
                          console.log('found');
                         // datatasas.push(datalimpia);

                        //       });
             
                              reTaza.push(addcurrency(datatasas[4],datatasas[1],datatasas[3]));
                              reTaza.push(addcurrency(datatasas[5],datatasas[1],datatasas[6]));
                              reTaza.push(addcurrency(datatasas[7],datatasas[2],datatasas[3]));
                              reTaza.push(addcurrency(datatasas[8],datatasas[2],datatasas[6]));

                              console.log('paso por aqui');
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
 

