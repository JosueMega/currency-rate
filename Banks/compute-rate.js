const apap = require('./Apap');
const reserva  = require('./Banreservas');
const banesco  = require('./Banesco');

    const getRateList =async () => {


            let  banescoresult = await  banesco.DoRequest();
            //let reservaResult =await   reserva.DoRequest();                

            //let GetCurencymount = getCurencymounts("USD", "Compra");
            let GetCurencymount = getCurencymounts("USD", "ALL");
            //let list = GetCurencymount(reservaResult, apapResult)
            let list = GetCurencymount( banescoresult)
            list = list.sort((a, b) => {
                if (a.mount > b.mount) {
                    return 1;
                }
                if (a.mount < b.mount) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            }
            )
            return list;
         
        // return new Promise((resolve,reject) => {

        //     let  apapResult = await  apap.DoRequest();
        //     let reservaResult =await   reserva.DoRequest();                

        //     let GetCurencymount = getCurencymounts("US", "buy");
        //     let list = GetCurencymount(reservaResult, apapResult)
        //     list = list.sort((a, b) => {
        //         if (a.mount > b.mount) {
        //             return 1;
        //         }
        //         if (a.mount < b.mount) {
        //             return -1;
        //         }
        //         // a must be equal to b
        //         return 0;
        //     }
        //     )
        //     resolve(list)
        //     reject("esto es un error");
        // })
    }

    function getCurencymounts( currencyType, bussine) {          
        return function get() {
            var args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments));
            var currencyList = [];
            args.filter(element => {
                element.filter(obj => {
                    if (
                        (obj.currencyType == currencyType && obj.bussine == bussine) ||
                        (obj.currencyType == currencyType &&  bussine==="ALL") ||
                        ( currencyType==="ALL" && obj.bussine == bussine)
                    
                    ){
                       currencyList.push(obj);
                    }
                })
            });
            return currencyList;
        }
    }
     

    
//   (async()=>{
//     const result = await getRateList()
//         .catch(ex=>{
//             console.log(`Ha ocurrido un error... ${ex}`);
//         });
//     if(result){
//         return result;
//     }
// })();

    module.exports= {
        getRateList:getRateList
    };


