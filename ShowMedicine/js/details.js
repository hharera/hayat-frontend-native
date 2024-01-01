import { allDonations} from "./main.js";



let donation1=document.querySelector('.donations1');
let donation2=document.querySelector('.donations2');
let type=document.querySelector('.donations2 .filter .title-back .text');
let category=document.querySelector('.donations2 .acount .donation .data .category');
let doner=document.querySelector('.donations2 .acount .donation .data .doner');
let publish_date=document.querySelector('.donations2 .acount .donation .data .publish-date');
let desc=document.querySelector('.donations2 .acount .desc .description');
let teli =document.querySelector('.donations2 .acount .communication .icons .teli');
let whats =document.querySelector('.donations2 .acount .communication .icons .whats');
let qrImage=document.querySelector('.donations2 .filter .qr-code img');
let img=document.querySelector('.donations2 .acount img')




let personDataMed=[];
async function getMedicine(url){
    let response=await fetch(url);
    personDataMed=await response.json();
}





document.addEventListener('click',async function(event){
    let status=event.target.getAttribute('class')
    if(status === 'change text-capitalize d-block px-2'){
        let Id = event.target.previousElementSibling.innerHTML;
        for(let i=0;i<allDonations.length;i++){
            let ID=allDonations[i].id
            if(ID==Id){
                let data=allDonations[i];
                img.src=data.image_url;
                
                if(data.category=='MEDICINE')
                {
                    await getMedicine(`http://146.190.206.136:8084/api/v1/donations/medicine/${Id}`);
                    let donation_date=new Date(personDataMed.donation_date);
                    let current_date=new Date();
                    let diff_in_ms=current_date-donation_date;
                    let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
                    publish_date.innerHTML=`published date : ${diff_in_days} daye later`;
                    type.innerHTML='medicine donation';
                    document.querySelector('.donations2 .acount .medicine .ex-date').innerHTML=`Expiration Date :${personDataMed.medicine_expiration_date}`;
                    document.querySelector('.donations2 .acount .medicine .med-name').innerHTML=`medicine: ${personDataMed.medicine.english_name}`;
                    document.querySelector('.donations2 .acount .medicine .med-unit').innerHTML=`medicine unit: ${personDataMed.medicine_unit.english_name}`;
                    document.querySelector('.donations2 .acount .medicine .amount').innerHTML=`amount: ${personDataMed.quantity}`;
                    document.querySelector('.donations2 .acount .medicine .com-method').innerHTML=`Communication Method :${personDataMed.communication_method}`;



                    qrImage.src=`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${personDataMed.qr_code}`
                    category.innerHTML=personDataMed.title;
                    doner.innerHTML=`${personDataMed.user.firstName} ${personDataMed.user.lastName}`;
                    desc.innerHTML=personDataMed.description;
                    teli.href=personDataMed.telegram_link;
                    whats.href=personDataMed.whatsapp_link;



                    
                }


                donation1.classList.add('d-none');
                donation2.classList.remove('d-none');

                i=allDonations.length;
                
            }
        }

    }
})








let back=document.querySelector('.donations2 .filter .title-back .back');

back.addEventListener('click',function(){
    donation2.classList.add('d-none');
    donation1.classList.remove('d-none');
    window.location.reload()
})

let up=document.querySelector('.donations2 .acount .donation .count .up');
let down=document.querySelector('.donations2 .acount .donation .count .down');
let num=document.querySelector('.donations2 .acount .donation .count .num');


up.addEventListener('click',function(){
    let number=Number(num.innerHTML);
    number++;
    num.innerHTML=number;
})
down.addEventListener('click',function(){
    let number=Number(num.innerHTML);
    if(number!=0)
    {
        number--;
        num.innerHTML=number;
    }
})

