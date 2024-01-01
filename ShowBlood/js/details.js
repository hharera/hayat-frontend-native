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



let personDatablood=[];
async function getblood(url){
    let response=await fetch(url);
    personDatablood=await response.json();
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
                
                if(data.category=='BLOOD')
                {
                    await getblood(`http://146.190.206.136:8082/api/v1/needs/blood/${Id}`);
                    type.innerHTML='blood need';
                    let need_date=new Date(personDatablood.need_date);
                    let current_date=new Date();
                    let diff_in_ms=current_date-need_date;
                    let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
                    publish_date.innerHTML=`published date : ${diff_in_days} daye later`;


                    document.querySelector('.needs2 .acount .blood .age').innerHTML=`age: ${personDatablood.age}`;
                    document.querySelector('.needs2 .acount .blood .blood-type').innerHTML=`blood type: ${personDatablood.blood_type}`;
                    document.querySelector('.needs2 .acount .blood .illness').innerHTML=`illness: ${personDatablood.illness}`;
                    document.querySelector('.needs2 .acount .blood .hospital').innerHTML=`hospital: ${personDatablood.hospital}`;
                    document.querySelector('.needs2 .acount .blood .com-method').innerHTML=`communication method: ${personDatablood.communication_method}`;

                    


                    qrImage.src=`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${personDatablood.qr_code}`
                    category.innerHTML=personDatablood.title;
                    doner.innerHTML=`${personDatablood.user.firstName} ${personDatablood.user.lastName}`;
                    desc.innerHTML=personDatablood.description;
                    teli.href=personDatablood.telegram_link;
                    whats.href=personDatablood.whatsapp_link;

                
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

