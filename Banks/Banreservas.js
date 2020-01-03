const rp = require('request-promise');
const cheerio = require('cheerio');
const  {url} = require('../config.json')

let {banreservas} = url;

//creating the object 
let obj = {
  url: `${banreservas}`,
  transform: body => cheerio.load(body)
}


const  DoRequest =async ()=>{
      return   new Promise((resolve,reject)=>{
            try {                
                rp(obj)
                    .then(function ($) {
                          
                            let reTaza = [];    
                            let counter = 0; 
                            let currency ={}; 
                            let currencyType="";
                            let bussine = ""; 
                            let mount = "";   
                        $('.currency-box-table ').find('tbody').find('tr').find('td').each(function (i, elem) { 
                            mount = $(this).html()
                            if (i > 3  & i < 6) {
                                currencyType = "US";
                              
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
                                    } else if (i > 6  & i <= 8){
                                        
                                        currencyType = "EUR"
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
                                    
                                 });

                               
                        resolve(reTaza)
                        // console.log(reTaza);
                    })
                    .catch (ex=>{

                        reject(ex);
                    });                
                
            } catch (error) {
                reject(error);
            }
         })
    }
        
    module.exports={
        DoRequest:DoRequest
    }

