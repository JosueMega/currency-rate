
const rp = require('request-promise');
const cheerio = require('cheerio');

let url = {
    url:"https://banesco.com.do/",
    transform:body=>cheerio.load(body)
}

function DoRequest(){
    let Tasa = {};
    return new Promise((resolve, reject)=>{
        rp(url)
            .then(($=>{
                try{
                $(".values-currency").find('span').each(function(i,elem){
                    switch (i) {
                        case 2:         
                           Tasa["linea" +i] = Object.assign({"Compra":$(this).text()})
                            break;
                            case 4:
                            Tasa["linea" +i] = Object.assign({"Venta":$(this).text()})
                            break;  
                    }
                    resolve(Tasa);
                    console.log(Tasa);
                }).html();  
            }catch(ex){
                reject(ex);
            }
            }));             
    });
}

// jQuery('.view-content')[2].getElementsByTagName("p")[1]getElementsByTagName('span')

module.exports= {
    DoRequest:DoRequest
};


 

