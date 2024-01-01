import {allneeds} from "./main.js";


let need1=document.querySelector('.needs1');
let need2=document.querySelector('.needs2');
let type=document.querySelector('.needs2 .filter .title-back .text');
let category=document.querySelector('.needs2 .acount .need .data .category');
let doner=document.querySelector('.needs2 .acount .need .data .doner');
let publish_date=document.querySelector('.needs2 .acount .need .data .publish-date');
let desc=document.querySelector('.needs2 .acount .desc .description');
let teli =document.querySelector('.needs2 .acount .communication .icons .teli');
let whats =document.querySelector('.needs2 .acount .communication .icons .whats');
let qrImage=document.querySelector('.needs2 .filter .qr-code img');
let img=document.querySelector('.needs2 .acount img')




let personDataMed=[];
async function getMedicine(url){
    let response=await fetch(url);
    personDataMed=await response.json();
}






document.addEventListener('click',async function(event){
    let status=event.target.getAttribute('class')
    if(status === 'change text-capitalize d-block px-2'){
        let Id = event.target.previousElementSibling.innerHTML;
        for(let i=0;i<allneeds.length;i++){
            let ID=allneeds[i].id
            if(ID==Id){
                let data=allneeds[i];
                img.src=data.image_url;
                
                if(data.category=='MEDICINE')
                {
                    await getMedicine(`http://146.190.206.136:8082/api/v1/needs/medicine/${Id}`);
                    let need_date=new Date(personDataMed.need_date);
                    let current_date=new Date();
                    let diff_in_ms=current_date-need_date;
                    let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
                    publish_date.innerHTML=`published date : ${diff_in_days} daye later`;
                    type.innerHTML='medicine need';
                    document.querySelector('.needs2 .acount .medicine .ex-date').innerHTML=`Expiration Date :${personDataMed.medicine_expiration_date}`;
                    document.querySelector('.needs2 .acount .medicine .med-name').innerHTML=`medicine: ${personDataMed.medicine.english_name}`;
                    document.querySelector('.needs2 .acount .medicine .med-unit').innerHTML=`medicine unit: ${personDataMed.medicine_unit.english_name}`;
                    document.querySelector('.needs2 .acount .medicine .amount').innerHTML=`amount: ${personDataMed.quantity}`;
                    document.querySelector('.needs2 .acount .medicine .com-method').innerHTML=`Communication Method :${personDataMed.communication_method}`;



                    qrImage.src=`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${personDataMed.qr_code}`
                    category.innerHTML=personDataMed.title;
                    doner.innerHTML=`${personDataMed.user.firstName} ${personDataMed.user.lastName}`;
                    desc.innerHTML=personDataMed.description;
                    teli.href=personDataMed.telegram_link;
                    whats.href=personDataMed.whatsapp_link;


                }


                need1.classList.add('d-none');
                need2.classList.remove('d-none');

                i=allneeds.length;
                
            }
        }

    }
})








let back=document.querySelector('.needs2 .filter .title-back .back');

back.addEventListener('click',function(){
    need2.classList.add('d-none');
    need1.classList.remove('d-none');
    window.location.reload()
})

let up=document.querySelector('.needs2 .acount .need .count .up');
let down=document.querySelector('.needs2 .acount .need .count .down');
let num=document.querySelector('.needs2 .acount .need .count .num');


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

