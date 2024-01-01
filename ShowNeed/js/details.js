import {allneeds} from "./main.js";


let medicine_category=document.querySelector('.needs2 .acount .medicine');
let blood_category=document.querySelector('.needs2 .acount .blood');
let book_category=document.querySelector('.needs2 .acount .book');


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
let personDataBook=[];
async function getBook(url){
    let response=await fetch(url);
    personDataBook=await response.json();
}
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
                if(data.category=='BOOKS')
                {
                    await getBook(`http://146.190.206.136:8082/api/v1/needs/book/${Id}`);
                    type.innerHTML='book need';
                    let need_date=new Date(personDataBook.need_date);
                    let current_date=new Date();
                    let diff_in_ms=current_date-need_date;
                    let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
                    publish_date.innerHTML=`published date : ${diff_in_days} daye later`;
                    document.querySelector('.needs2 .acount .book .book-title').innerHTML=`book title: ${personDataBook.book_title}`;
                    document.querySelector('.needs2 .acount .book .book-sub-title').innerHTML=`book sub title: ${personDataBook.book_sub_title}`;
                    document.querySelector('.needs2 .acount .book .book-author').innerHTML=`book author: ${personDataBook.book_author}`;
                    document.querySelector('.needs2 .acount .book .book-publisher').innerHTML=`book publisher: ${personDataBook.book_publisher}`;
                    document.querySelector('.needs2 .acount .book .book-language').innerHTML=`book language: ${personDataBook.book_language}`;
                    document.querySelector('.needs2 .acount .book .book-publication-year').innerHTML=`book publication year:${personDataBook.book_publication_year}`;
                    document.querySelector('.needs2 .acount .book .amount').innerHTML=`amount: ${personDataBook.quantity}`;
                    document.querySelector('.needs2 .acount .book .com-method').innerHTML=`Communication Method: ${personDataBook.communication_method}`;


                    qrImage.src=`https://api.qrserver.com/v1/create-qr-code/?size=50x50&data=${personDataBook.qr_code}`
                    category.innerHTML=personDataBook.title;
                    doner.innerHTML=`${personDataBook.user.firstName} ${personDataBook.user.lastName}`;
                    desc.innerHTML=personDataBook.description;
                    teli.href=personDataBook.telegram_link;
                    whats.href=personDataBook.whatsapp_link;



                    medicine_category.classList.add('d-none');
                    blood_category.classList.add('d-none');
                    book_category.classList.add('d-block');


                }
                else if(data.category=='BLOOD')
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



                    medicine_category.classList.add('d-none');
                    blood_category.classList.add('d-block');
                    book_category.classList.add('d-none');
                
                }
                else if(data.category=='MEDICINE')
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



                    medicine_category.classList.add('d-block');
                    blood_category.classList.add('d-none');
                    book_category.classList.add('d-none');
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

