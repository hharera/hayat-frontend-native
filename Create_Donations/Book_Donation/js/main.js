let header1=document.querySelector('.content .header .header1');
let header2=document.querySelector('.content .header .header2');
let arrow=document.querySelector('.content .header .header1 .arrow');
let parent=document.querySelector('.content .data form .basic-data .col-md-6 div .image-title .image .img');


let img=document.querySelector('input[type="file"]');
let title=document.querySelector('.content .data form .basic-data .col-md-6 div .image-title .title2 div input');
let bookTitle=document.querySelector('.content .data form .basic-data .col-md-6 div .booktitle input');
let bookSubtitle=document.querySelector('.content .data form .basic-data .col-md-6 div .subtitle input');
let description=document.querySelector('.content .data form .basic-data .col-md-6 div .description .text');
let city=document.querySelector('.content .data form .basic-data .col-md-6 div .cities .city');
let amount=document.querySelector('.content .data form .basic-data .col-md-6 .right .amounts .amount');
let author=document.querySelector('.content .data form .basic-data .col-md-6 .right .authors .author');
let publicationYear=document.querySelector('.content .data form .basic-data .col-md-6 .right .publicationYear .publication_year');
let language=document.querySelector('.content .data form .basic-data .col-md-6 .right .languages .language');
let bookPublisher=document.querySelector('.content .data form .basic-data .col-md-6 div .bookPublisher input');
let contact=document.querySelectorAll("input[type='radio']");
let communication_method='undefined';
let x=0,y=0,z=0,a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,i=0,m=0,n=0;


let cities;
async function getCities(){
    let response=await fetch('http://146.190.206.136:8085/api/v1/cities');
    cities=await response.json();
    displayCities();
}
getCities();
function displayCities(){
    for(let i=0;i<cities.length;i++){
        let option=document.createElement('option');
        option.innerHTML=cities[i].englishName;
        option.value=cities[i].id;
        city.appendChild(option)
    }
}
function getContactValue(){
    contact.forEach(radioBtn=>{
        radioBtn.addEventListener('change',function(){
            communication_method=document.querySelector('input[name="communication_method"]:checked').value;
        })
    });
}

let bookDonation={
  "title": "",
  "description": "",
  "communication_method": "",
  "city_id": 0,
  "quantity": 0,
  "book_title": "string",
  "book_sub_title": "string",
  "book_author": "string",
  "book_publisher": "string",
  "book_publication_year": "2023-04-12",
  "book_language": "string",
  'image_url':"",
  "whatsapp_link":"",
  "telegram_link":"",
};

function GetUserData(){
    getContactValue();
    bookDonation={
        "title": title.value,
        "description": description.value,
        "communication_method": communication_method,
        "city_id": Number(city.value),
        "quantity": Number(amount.value),
        "book_title": bookTitle.value,
        "book_sub_title": bookSubtitle.value,
        "book_author": author.value,
        "book_publisher": bookPublisher.value,
        "book_publication_year":publicationYear.value+'-01-01',
        "book_language": language.value,
        'image_url':img.value,
        "whatsapp_link":"https://wa.me/"+whatsapp.value,
        "telegram_link":"https://t.me/"+tel.value
    }
};

//@buth1305
function ClearUserData(){
    title.value='';
    description.value='';
    city.value='';
    amount.value='';
    bookTitle.value='';
    bookSubtitle.value='';
    author.value='';
    bookPublisher.value='';
    publicationYear.value='';
    language.value='';
    img.value='';
    whatsapp.value="";
    tel.value="";
    document.querySelector('.content .data form .communication-method div div .whats div').classList.remove('d-none');
    document.querySelector('.content .data form .communication-method div div .tel div').classList.remove('d-none');

    if(parent.children.length>=3){
        parent.removeChild(parent.children[2]);
        file2='';
        document.querySelector('.content .data form .basic-data .img .imgs').style.display='block';
    }
    count1.html(4);
    count2.html(4);
    for (var i = 0; i < contact.length; i++) {
        contact[i].checked = false;
      }
};


function ValidateImage(){
    const setError = (message) => {
        document.querySelector('.errorimg').innerText = message;
        document.querySelector('.errorimg').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorimg').innerText = '';
        document.querySelector('.errorimg').classList.remove('error');
    };
    let image=img.value;
    if(image === '') {
        setError('Image is required');
        x=1;
    }
    else{
        setSuccess();
        x=0;
    }


}


const isValidTitle = title => {
    const correctTitle = /^$|^[a-zA-Z0-9أ-ي\s-,_/]+$/
    return correctTitle.test(String(title));
}

function ValidateTitle(){
    const setError = (message) => {
        document.querySelector('.errortitle').innerText = message;
        document.querySelector('.errortitle').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errortitle').innerText = '';
        document.querySelector('.errortitle').classList.remove('error');
    };
    let Title=title.value.trim();
    if(Title === '') {
        setError('Title is required');
        y=1;
    }
    else if(Title.length<4){
        setError('it must contain 4 characters at least');
        y=1;
    }
    else if(Title.length>100){
        setError('it must contain 100 character at most');
        y=1;
    }
    else if(!isValidTitle(Title)){
        setError('Provide a valid title, it must be characters');
        y=1;
    }
    else{
        setSuccess();
        y=0;
    }


}

const isValidBookTitle = title => {
    const correctTitle = /^$|^[a-zA-Z0-9أ-ي\s-,_/]+$/
    return correctTitle.test(String(title));
}

function ValidateBookTitle(){
    const setError = (message) => {
        document.querySelector('.errorbooktitle').innerText = message;
        document.querySelector('.errorbooktitle').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorbooktitle').innerText = '';
        document.querySelector('.errorbooktitle').classList.remove('error');
    };
    let BookTitle=bookTitle.value.trim();
    if(BookTitle === '') {
        setError('Book Title is required');
        z=1;
    }
    else if(BookTitle.length<3){
        setError('it must contain 3 characters at least');
        z=1;
    }
    else if(BookTitle.length>100){
        setError('it must contain 100 character at most');
        z=1;
    }
    else if(!isValidBookTitle(BookTitle)){
        setError('Provide a valid book title, it must be characters');
        z=1;
    }
    else{
        setSuccess();
        z=0;
    }


}
const isValidBookSubtitle = title => {
    const correctTitle = /^$|^[a-zA-Z0-9أ-ي\s-,_/]+$/
    return correctTitle.test(String(title));
}

function ValidateBookSubtitle(){
    const setError = (message) => {
        document.querySelector('.errorsubtitle').innerText = message;
        document.querySelector('.errorsubtitle').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorsubtitle').innerText = '';
        document.querySelector('.errorsubtitle').classList.remove('error');
    };
    let BookSubtitle=bookSubtitle.value.trim();
    if(BookSubtitle === '') {
        setError('Book subtitle is required');
        a=1;
    } else if(!isValidBookSubtitle(BookSubtitle)){
        setError('Provide a valid book subtitle, it must be characters');
        a=1;
    }
    else{
        setSuccess();
        a=0;
    }


}

const isValidDescription = discription => {
    const correctTittle = /^$|^[a-zA-Z0-9أ-ي\s-,_/]+$/
    return correctTittle.test(String(discription));
}

function ValidateDescription(){
    const setError = (message) => {
        document.querySelector('.errordescription').innerText = message;
        document.querySelector('.errordescription').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errordescription').innerText = '';
        document.querySelector('.errordescription').classList.remove('error');
    };
    let Description=description.value.trim();
    if(Description === '') {
        setError('Description is required');
        b=1;
    }
    else if(Description.length<4){
        setError('it must contain 4 characters at least');
        b=1;
    }
    else if(Description.length>800){
        setError('it must contain 800 character at most');
        b=1;
    }
    else if(!isValidDescription(Description)){
        document.querySelector('.description').classList.add('pb-4')
        setError('Provide a valid description, it must be characters');
        b=1;
    }
    else{
        setSuccess();
        b=0;
    }
}

function ValidateCity(){
    const setError = (message) => {
        document.querySelector('.errorcity').innerText = message;
        document.querySelector('.errorcity').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorcity').innerText = '';
        document.querySelector('.errorcity').classList.remove('error');
    };
    let yourCity=city.value;
    if(yourCity==='') {
        setError('City is required');
        c=1;
    }
    else{
        setSuccess();
        c=0;
    }
}

const isValidAmount = amount => {
    const correctTittle = /^[0-9]+(\.[0-9]+)?$/;
    return correctTittle.test(String(amount));
}

function ValidateAmount(){
    const setError = (message) => {
        document.querySelector('.erroramount').innerText = message;
        document.querySelector('.erroramount').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.erroramount').innerText = '';
        document.querySelector('.erroramount').classList.remove('error');
    };
    let Amount=amount.value.trim();
    if(Amount === '') {
        setError('Amount is required');
        d=1;
    }else if(!isValidAmount(Amount)){
        setError('Provide a valid amount, it must be only number');
        d=1;
    }
    else{
        setSuccess();
        d=0;
    }


}


const isValidAuthor = author => {
    const correctAuthor = /^$|^[a-zA-Z\s-]+$/
    return correctAuthor.test(String(author));
}

function ValidateAuthor(){
    const setError = (message) => {
        document.querySelector('.errorauthor').innerText = message;
        document.querySelector('.errorauthor').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorauthor').innerText = '';
        document.querySelector('.errorauthor').classList.remove('error');
    };
    let Author=author.value.trim();
    if(Author === '') {
        setError('Author is required');
        e=1;
    } else if(!isValidAuthor(Author)){
        setError('Provide a valid author, it must be characters');
        e=1;
    }
    else{
        setSuccess();
        e=0;
    }


}
const isValidBookPublisher = publisher => {
    const correctPublisher = /^$|^[a-zA-Z\s-]+$/
    return correctPublisher.test(String(publisher));
}

function ValidateBookPublisher(){
    const setError = (message) => {
        document.querySelector('.publisherror').innerText = message;
        document.querySelector('.publisherror').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.publisherror').innerText = '';
        document.querySelector('.publisherror').classList.remove('error');
    };
    let BookPublisher=bookPublisher.value.trim();
    if(BookPublisher === '') {
        setError('Book Publisher is required');
        f=1;
    } else if(!isValidBookPublisher(BookPublisher)){
        setError('Provide a valid book publisher, it must be characters');
        f=1;
    }
    else{
        setSuccess();
        f=0;
    }


}

function ValidateYear(){
    const setError = (message) => {
        document.querySelector('.errordate').innerText = message;
        document.querySelector('.errordate').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errordate').innerText = '';
        document.querySelector('.errordate').classList.remove('error');
    };
    let Year=publicationYear.value;
    if(Year==='Publication Year') {
        setError('Publication Year is required');
        g=1;
    }
    else{
        setSuccess();
        g=0;
    }
}

function ValidateLanguage(){
    const setError = (message) => {
        document.querySelector('.errorlanguage').innerText = message;
        document.querySelector('.errorlanguage').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorlanguage').innerText = '';
        document.querySelector('.errorlanguage').classList.remove('error');
    };
    let Language=language.value;
    if(Language==='Book Language') {
        setError('Language is required');
        h=1;
    }
    else{
        setSuccess();
        h=0;
    }
}

function ValidateContact(){
    const setError = (message) => {
        document.querySelector('.errorcontact').innerText = message;
        document.querySelector('.errorcontact').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorcontact').innerText = '';
        document.querySelector('.errorcontact').classList.remove('error');
    };
    if(communication_method=='undefined'){
        setError('you must select the method of communication')
        i=1;
    }
    else{
        setSuccess();
        i=0;
    }

}

let whatsapp=document.querySelector('.content .data form .communication-method div div .whats .whatsapp')
let contentwats=document.querySelector('.content .data form .communication-method div div .whats div')

document.addEventListener("click", function(event){
    if(event.target===whatsapp){
        document.querySelector('.content .data form .communication-method div div .whats div').classList.add('d-none');
    }
    else if(event.target!=whatsapp && whatsapp.value==''){
        document.querySelector('.content .data form .communication-method div div .whats div').classList.remove('d-none');
    }
})

const isValidWhats = values => {
    const correctLink = /^01[0125][0-9]{8}$/
    return correctLink.test(String(values));
}

function validateWhatsapp(){
    if(whatsapp.value==='')
    {
        document.querySelector('.content .data form .communication-method div div .whats div').classList.remove('d-none');
        document.querySelector('.whatserror').innerText = 'You must enter whatsapp link';
        document.querySelector('.whatserror').classList.add('error');
        m=1;
    }
    else if(!isValidWhats(whatsapp.value)){
        document.querySelector('.whatserror').innerText = 'You must enter correct whatsapp link';
        document.querySelector('.whatserror').classList.add('error');
        m=1;
    }
    else{
        document.querySelector('.whatserror').innerText = '';
        document.querySelector('.whatserror').classList.remove('error');
        m=0;
    }
}
let tel=document.querySelector('.content .data form .communication-method div div .tel .teli')
let contenttel=document.querySelector('.content .data form .communication-method div div .tel div')

document.addEventListener("click", function(event){
    if(event.target===tel){
        contenttel.classList.add('d-none');
    }
    else if(event.target!=tel && tel.value==''){
        contenttel.classList.remove('d-none');
    }
})

const isValidTel = values => {
    const correctLink = /^[a-zA-Z0-9_@.-]*$/
    return correctLink.test(String(values));
}

function validateteligram(){
    if(tel.value==='')
    {
        document.querySelector('.content .data form .communication-method div div .tel div').classList.remove('d-none');
        document.querySelector('.telerror').innerText = 'You must enter teligram link';
        document.querySelector('.telerror').classList.add('error');
        n=1;
    }
    else if(!isValidTel(tel.value)){
        document.querySelector('.telerror').innerText = 'You must enter correct telegram link';
        document.querySelector('.telerror').classList.add('error');
        n=1;
    }
    else{
        document.querySelector('.telerror').innerText = '';
        document.querySelector('.telerror').classList.remove('error');
        n=0;
    }
}

function ValidateData(){
    ValidateTitle();
    ValidateImage();
    ValidateBookTitle();
    ValidateBookSubtitle();
    ValidateDescription();
    ValidateCity();
    ValidateAmount();
    ValidateAuthor();
    ValidateBookPublisher();
    ValidateYear();
    ValidateLanguage();
}



let next=document.querySelector('.content .data form .basic-data .col-md-6 .right .next a');
next.addEventListener('click',function(){
    GetUserData();
    ValidateData();

    if(x===0&&y===0&&z===0&&a===0&&b===0&&c===0&&d===0&&e===0&&f===0&&g===0&&h===0){
        
        document.querySelector('.content .data form .basic-data').classList.add('d-none');
        document.querySelector('.content .data form .communication-method').classList.remove('d-none');
        header2.style.backgroundColor='#FEC38F'
        header1.style.backgroundColor='#F2F2F2'
        document.querySelector('.content .header .header1 .text').style.color='#999999';
        document.querySelector('.content .header .header2 .text').style.color='#E6E6E6';
        document.querySelector('.content .header .header2 .num').style.backgroundColor='#e5b081';
        document.querySelector('.content .header .header1 .num').style.backgroundColor='#E6E6E6';
        document.querySelector('.content .header .header1 .num').style.color='#999999';
        document.querySelector('.content .header .header2 .num').style.color='#E6E6E6';
        arrow.style.borderLeftColor='#F2F2F2';
        document.querySelector('.content .data h3').innerHTML='communication method';
    }
})


let back=document.querySelector('.content .data form .communication-method .buttons a');
back.addEventListener('click',function(event){
    document.querySelector('.content .data form .basic-data').classList.remove('d-none');
    document.querySelector('.content .data form .communication-method').classList.add('d-none');
    header2.style.backgroundColor='#F2F2F2'
    header1.style.backgroundColor='#FEC38F'
    document.querySelector('.content .header .header1 .text').style.color='#E6E6E6';
    document.querySelector('.content .header .header2 .text').style.color='#999999';
    document.querySelector('.content .header .header2 .num').style.backgroundColor='#E6E6E6';
    document.querySelector('.content .header .header1 .num').style.backgroundColor='#e5b081';
    document.querySelector('.content .header .header1 .num').style.color='#E6E6E6';
    document.querySelector('.content .header .header2 .num').style.color='#999999';
    arrow.style.borderLeftColor='#FEC38F';
    document.querySelector('.content .data h3').innerHTML='Basic information'
    event.preventDefault();
})


let Id ,url,Data;
async function SendUserData(){
    Data=await fetch('http://146.190.206.136:8084/api/v1/donations/book', {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOUmx5aU5tMGxHRGo0WlpwS2s4XzAtY1ltQ1hFWThCMFozRXBrQjB6OGJRIn0.eyJleHAiOjE2ODgwNjM2MTYsImlhdCI6MTY4ODAyNzYxNiwianRpIjoiM2U5MWMxZmQtYmJjMy00ZTRhLWI5NTAtOTlmZGM5YzQxZDk1IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgxODEvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5OTNhYzY0Ny00MGJjLTRmODYtOTBjOS01MDhlN2Y1ZDg2MzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRob3JpemF0aW9uLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiMDBiOGU4OTctZTU1NC00NmQ5LTg3ZjMtZTQzNGVlMDIwMzc4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMDBiOGU4OTctZTU1NC00NmQ5LTg3ZjMtZTQzNGVlMDIwMzc4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjAxMDYyMjI3NzE0IiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.LDA5U7XbBw_CqLYXOv_ZbiXdfv1wyrPRlLGX_5Q5xgtjyh8f6PuAPjTrdLKND0oM17zQU-FtmQEnoucR8ZulgfC7mcajrQD3hVF0bSQB0Fv76ge66ciyJWsTGYqf8mmkP9bPdz9UP-6xS3-zm-Gl3uzLRCaVzxfK0xJ_0iyz57xI_npPZ9FyonYQH4SdE4xEmcH0TpaebZTZc6SrLTg2YeDiDxPDuBn-tc4f4hM33IbPck4Jwq_JuKP8IU5dK2GpDaSAIXo65FaQszDJswULdxQH3VT54jbmFaVH2gzjtrPcM9ULGWlYcToesmXXANuvzV7DzMwTk3ac4IKKZD_CEA'
        },
        body:JSON.stringify(bookDonation)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        url=`http://146.190.206.136:8084/api/v1/donations/book/${data.id}/images`;
        if(data.status==="REJECTED"){
            document.querySelector('.bigerror p').innerText = 'You must enter correct data';
            document.querySelector('.bigerror p').classList.add('error');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
}
async function updateImage(){
    const file = img.files[0];
    const formData = new FormData();
    formData.append('file', file); 
      
    res=await fetch(url, {
        method: 'POST',
        body: formData,
        headers:{
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOUmx5aU5tMGxHRGo0WlpwS2s4XzAtY1ltQ1hFWThCMFozRXBrQjB6OGJRIn0.eyJleHAiOjE2ODgwNjM2MTYsImlhdCI6MTY4ODAyNzYxNiwianRpIjoiM2U5MWMxZmQtYmJjMy00ZTRhLWI5NTAtOTlmZGM5YzQxZDk1IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgxODEvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5OTNhYzY0Ny00MGJjLTRmODYtOTBjOS01MDhlN2Y1ZDg2MzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRob3JpemF0aW9uLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiMDBiOGU4OTctZTU1NC00NmQ5LTg3ZjMtZTQzNGVlMDIwMzc4IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMDBiOGU4OTctZTU1NC00NmQ5LTg3ZjMtZTQzNGVlMDIwMzc4IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjAxMDYyMjI3NzE0IiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.LDA5U7XbBw_CqLYXOv_ZbiXdfv1wyrPRlLGX_5Q5xgtjyh8f6PuAPjTrdLKND0oM17zQU-FtmQEnoucR8ZulgfC7mcajrQD3hVF0bSQB0Fv76ge66ciyJWsTGYqf8mmkP9bPdz9UP-6xS3-zm-Gl3uzLRCaVzxfK0xJ_0iyz57xI_npPZ9FyonYQH4SdE4xEmcH0TpaebZTZc6SrLTg2YeDiDxPDuBn-tc4f4hM33IbPck4Jwq_JuKP8IU5dK2GpDaSAIXo65FaQszDJswULdxQH3VT54jbmFaVH2gzjtrPcM9ULGWlYcToesmXXANuvzV7DzMwTk3ac4IKKZD_CEA'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error uploading file:', error);
    });
}

let subMit=document.querySelector('.content .data form .communication-method .buttons button');
subMit.addEventListener('click',async function(event){
    document.querySelector('.content .data form .basic-data').classList.add('d-none');
    document.querySelector('.content .data form .communication-method').classList.remove('d-none');
    event.preventDefault();
    GetUserData();
    ValidateContact();
    validateWhatsapp();
    validateteligram();
    if(e===0&&f===0&&g===0){
        await SendUserData();
        await updateImage();
        ClearUserData();
    }
})
document.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();
})


let file2='',file1;
img.addEventListener('change',function(eventinfo){
    let file=img.files[0];
    let reader=new FileReader();
    reader.addEventListener('load',function(){
        file1=reader.result;
        let image=document.createElement('img');
        if(file1 != file2){
            image.src=file1;
            if(parent.children.length>=3){
                parent.removeChild(parent.children[2]);
                parent.appendChild(image);
            }
            if(parent.children.length===2){
                parent.appendChild(image);
            }
            file2=file1;
        }
        // document.querySelector('.content .data form .basic-data  .col-md-6 div .image-tittle').classList.remove('d-flex');
        // document.querySelector('.content .data form .basic-data .col-md-6 .image-tittle .tittle2 div').classList.remove('ms-4');
        // document.querySelector('.content .data form .basic-data .col-md-6 .image-tittle .tittle2 div').classList.add('mt-5');
        // document.querySelector('.content .data form .basic-data .col-md-6 .image-tittle .tittle2').classList.add('w-100');
        // parent.style.width='365px';
        // parent.style.height='290px';
        image.style.width='100%';
        image.style.height='100%';
        image.style.borderRadius='7px';
        document.querySelector('.content .data form .basic-data .img .imgs').style.display='none';
        
    })
    reader.readAsDataURL(file);
})


var text1=$(".content .data form .basic-data .col-md-6 .image-title .title2 div .text"),
    count1=$(".content .data form .basic-data .col-md-6 .image-title .title2 div div p .count"),
    maxLength1=text1.attr("maxlength"),
    maxLength1=Number(maxLength1);
text1.keyup(function(){
    var currentLength1=$(this).val().length;
    if(currentLength1==0)
    {
        count1.html(4);
    }
    else{
        count1.html(currentLength1);
    }
})
var text2=$(".content .data form .basic-data .col-md-6 .description .text"),
    count2=$(".content .data form .basic-data .col-md-6 .description div p .count"),
    maxLength2=text2.attr("maxlength"),
    maxLength2=Number(maxLength2);
text2.keyup(function(){
    var currentLength2=$(this).val().length;
    if(currentLength2==0)
    {
        count2.html(4);
    }
    else{
        count2.html(currentLength2);
    }
})
var text3=$(".content .data form .basic-data .col-md-6 div .booktitle .text"),
    count3=$(".content .data form .basic-data .col-md-6 div .booktitle div p .count"),
    maxLength3=text3.attr("maxlength"),
    maxLength3=Number(maxLength3);
text3.keyup(function(){
    var currentLength3=$(this).val().length;
    if(currentLength3==0)
    {
        count3.html(3);
    }
    else{
        count3.html(currentLength3);
    }
})
var text4=$(".content .data form .basic-data .col-md-6 div .subtitle .text"),
    count4=$(".content .data form .basic-data .col-md-6 div .subtitle div p .count"),
    maxLength4=text4.attr("maxlength"),
    maxLength4=Number(maxLength4);
text4.keyup(function(){
    var currentLength4=$(this).val().length;
    if(currentLength4==0)
    {
        count4.html(3);
    }
    else{
        count4.html(currentLength4);
    }
})
