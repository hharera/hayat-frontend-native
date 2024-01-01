import { allDonations} from "./main.js";
import { person,qrimg} from "./indetails.js";


// let seeMore=document.querySelectorAll('.change');
// let doner=document.querySelector('.donations .acount .food-donation .data .doner');
// let amount=document.querySelector('.donations .acount .details .amount');
// let ex_date=document.querySelector('.donations .acount .details .ex-date');
// let com_method=document.querySelector('.donations .acount .details .com-method');
// let description=document.querySelector('.donations .acount .desc .description');
// let iMage=document.querySelector('.donations .acount img');



// for(let n=0;n<allDonations.length;n++){
//   seeMore[n].addEventListener("click",function(event){
//     window.open('indetails.html')
//     let iD=document.querySelector('.donations .row .col-lg-3 .details .detail .see-more .id').innerHTML;
//     let Id=seeMore[n].previousElementSibling.innerHTML;
//     console.log(Id);
//     for(let i=0;i<allDonations.length;i++){
//       if(iD==allDonations[i].id){
//         qrimg.setAttribute('src',`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${allDonations[i].qr_code}`);
//         // iMage.src=allDonations[i].image_url;
//         doner.innerHTML=allDonations[i].user.firstName+' '+ allDonations[i].user.lastName;
//         amount.innerHTML='Amount: '+allDonations[i].amount;
//         ex_date.innerHTML='Expiration Date: '+allDonations[i].donation_expiration_date;
//         com_method.innerHTML='Communication Method: '+allDonations[i].communication_method;
//         description.innerHTML=allDonations[i].description;
//       }

//     }
//     console.log("hallo")
//     console.log(event.target);
//   })
// }


document.addEventListener('click',function(event){
    if(event.target.getAttribute('class').includes('change')){
        let Id = event.target.previousElementSibling.innerHTML;
        for(let i=0;i<allDonations.length;i++){
            let ID=allDonations[i].id
            if(ID==Id){
                let data=allDonations[i];
                let element=`
                <div class="acount pb-5">
                <img src="images/Photo.jpg" alt="" class="w-100">
                <div class="food-donation my-3 d-flex justify-content-between align-items-center pe-4">
                <div class="data py-4 px-4">
                    <h2 class="text-capitalize">food donation</h2>
                    <p class="text-capitalize mb-0 doner">${data.user.firstName} ${data.user.lastName}</p>
                    <p class="text-capitalize mb-0">publish date</p>
                </div>
                <div class="count d-flex flex-column  justify-content-center align-items-center">
                    <span><i class="fa-solid fa-arrow-up"></i></span>
                    <span>20</span>
                    <span><i class="fa-solid fa-arrow-down"></i></span>
                </div>
                </div>
                <div class="details my-3  py-4 px-4">
                <h2 class="text-capitalize">details</h2>
                <p class="text-capitalize mb-0">Food Category :</p>
                <p class="text-capitalize mb-0 amount">Amount :</p>
                <p class="text-capitalize mb-0 ex-date">Expiration Date :${data.donation_expiration_date}</p>
                <p class="text-capitalize mb-0 com-method">Communication Method :${data.communication_method}</p>
                </div>
                <div class="desc my-3  py-4 px-4">
                <h2 class="text-capitalize">Description</h2>
                <p class="text-capitalize mb-0 description">${data.description}</p>
                </div>
                <div class="text-center">
                <div class="icons  mt-5">
                    <a href="#"><span class="mx-5 what"><i class="fa-brands fa-whatsapp"></i></span></a>
                    <a href="#"><span class="mx-5"><i class="fa-brands fa-telegram"></i></span></a>
                </div>
                </div>
                </div>
                `
                console.log(person);
            }
        }
    }
})


// document.addEventListener('click',function(event){
//     if(event.target.getAttribute('class').includes('change')){
//         let Id = event.target.previousElementSibling.innerHTML;
//         for(let i=0;i<allDonations.length;i++){
//             let ID=allDonations[i].id
//             if(ID==Id){
//                 console.log(allDonations[i]);
//                 window.open('indetails.html')
//                 qrimg.setAttribute('src',`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${allDonations[i].qr_code}`);
//                 // iMage.src=allDonations[i].image_url;
//                 iMage.setAttribute('src',"images/Photo.jpg");
//                 doner.innerHTML=`${allDonations[i].user.firstName} ${allDonations[i].user.lastName}`;
//                 amount.innerHTML=`Amount: ${allDonations[i].amount}`;
//                 ex_date.innerHTML=`Expiration Date: ${allDonations[i].donation_expiration_date}`;
//                 com_method.innerHTML=`Communication Method: ${allDonations[i].communication_method}`;
//                 description.innerHTML=allDonations[i].description;
//             }
//         }
//     }
// })