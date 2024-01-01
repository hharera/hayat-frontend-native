let header1=document.querySelector('.content .header .header1');
let header2=document.querySelector('.content .header .header2');
let arrow=document.querySelector('.content .header .header1 .arrow');
let parent=document.querySelector('.content .data form .basic-data .col-md-6 div .image-title .image .img');

let title=document.querySelector('.content .data form .basic-data .col-md-6 div .title input')
let description=document.querySelector('.content .data form .basic-data .col-md-6 div .description .text')
let bloodType=document.querySelector('.content .data form .basic-data .col-md-6 div .type .bloodType')
let hospital=document.querySelector('.content .data form .basic-data .col-md-6 div .hospitals .hospital')
let age=document.querySelector('.content .data form .basic-data .col-md-6 .right .ages .age')
let illness=document.querySelector('.content .data form .basic-data .col-md-6 .right .illnesses .illness')
let contact=document.querySelectorAll("input[type='radio']");
let city=document.querySelector('.content .data form .basic-data .col-md-6 .right .cities .city');
let communication_method='undefined';
let x=0,y=0,z=0,a=0,b=0,c=0,d=0,e=0,f=0,g=0;

function getContactValue(){
    contact.forEach(radioBtn=>{
        radioBtn.addEventListener('change',function(){
            communication_method=document.querySelector('input[name="communication_method"]:checked').value;
        })
    });
}

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
let bloodNeed={
    "title": "",
    "description": "",
    "communication_method": "",
    'city_id':0,
    "age":0,
    "blood_type": 0,
    "hospital":"",
    "illness":"",
    "whatsapp_link":"",
    "telegram_link":""
};

function GetUserData(){
    getContactValue();
    bloodNeed={
        'title':title.value,
        'description':description.value,
        "communication_method":communication_method,
        'city_id':Number(city.value),
        "age":age.value,
        "blood_type": bloodType.value,
        "hospital":hospital.value,
        "illness":illness.value,
        "whatsapp_link":"https://wa.me/"+whatsapp.value,
        "telegram_link":"https://t.me/"+tel.value
    }
};
function ClearUserData(){
    title.value='';
    description.value='';
    bloodType.value='Blood Type';
    city.value='';
    age.value='';
    hospital.value='';
    illness.value=''
    whatsapp.value=""
    tel.value="";
    document.querySelector('.content .data form .communication-method div div .whats div').classList.remove('d-none');
    document.querySelector('.content .data form .communication-method div div .tel div').classList.remove('d-none');

    count1.html(1);
    count2.html(4);
    for (var i = 0; i < contact.length; i++) {
        contact[i].checked = false;
      }
};


const isValidTittle = title => {
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
        x=1;
    }
    else if(Title.length<4){
        setError('it must contain 4 characters at least');
        x=1;
    }
    else if(Title.length>100){
        setError('it must contain 100 character at most');
        x=1;
    }
    else if(!isValidTittle(Title)){
        setError('Provide a valid title, it must be characters');
        x=1;
    }
    else{
        setSuccess();
        x=0;
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
        y=1;
    }
    else if(Description.length<4){
        setError('it must contain 4 characters at least');
        y=1;
    }
    else if(Description.length>800){
        setError('it must contain 800 characters at most');
        y=1;
    }
    else if(!isValidDescription(Description)){
        document.querySelector('.description').classList.add('pb-4')
        setError('Provide a valid description, it must be characters');
        y=1;
    }
    else{
        setSuccess();
        y=0;
    }


}

const isValidateHospital = value => {
    const correctHospital = /^$|^[a-zA-Z0-9أ-ي\s-,_/]+$/
    return correctHospital.test(String(value));
}
function ValidateHospital(){
    const setError = (message) => {
        document.querySelector('.errorhospital').innerText = message;
        document.querySelector('.errorhospital').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorhospital').innerText = '';
        document.querySelector('.errorhospital').classList.remove('error');
    };
    let hospitalValue=hospital.value.trim();
    if(hospitalValue === '') {
        setError('Hospital is required');
        z=1;
    }
    else if(hospitalValue.length<4){
        setError('it must contain 4 characters at least');
        z=1;
    }
    else if(hospitalValue.length>100){
        setError('it must contain 100 characters at most');
        z=1;
    }
    else if(!isValidateHospital(hospitalValue)){
        document.querySelector('.description').classList.add('pb-4')
        setError('Provide a valid description, it must be characters');
        z=1;
    }
    else{
        setSuccess();
        z=0;
    }


}

const isValidateIllness = value => {
    const correctIllness = /^$|^[a-zA-Z0-9أ-ي\s-,_/]+$/
    return correctIllness.test(String(value));
}
function ValidateIllness(){
    const setError = (message) => {
        document.querySelector('.errorillness').innerText = message;
        document.querySelector('.errorillness').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorillness').innerText = '';
        document.querySelector('.errorillness').classList.remove('error');
    };
    let illnessValue=illness.value.trim();
    if(illnessValue === '') {
        setError('Hospital is required');
        a=1;
    }
    else if(illnessValue.length<4){
        setError('it must contain 4 characters at least');
        a=1;
    }
    else if(illnessValue.length>100){
        setError('it must contain 100 characters at most');
        a=1;
    }
    else if(!isValidateIllness(illnessValue)){
        document.querySelector('.description').classList.add('pb-4')
        setError('Provide a valid description, it must be characters');
        a=1;
    }
    else{
        setSuccess();
        a=0;
    }


}

const isValidAge = age => {
    const correctAge = /^[0-9]+(\.[0-9]+)?$/;
    return correctAge.test(String(age));
}

function ValidateAge(){
    const setError = (message) => {
        document.querySelector('.errorage').innerText = message;
        document.querySelector('.errorage').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorage').innerText = '';
        document.querySelector('.errorage').classList.remove('error');
    };
    let Age=age.value.trim();
    if(Age === '') {
        setError('Age is required');
        b=1;
    }else if(!isValidAge(Age)){
        setError('Provide a valid age, it must be only number');
        b=1;
    }
    else{
        setSuccess();
        b=0;
    }


}

function ValidateType(){
    const setError = (message) => {
        document.querySelector('.errortype').innerText = message;
        document.querySelector('.errortype').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errortype').innerText = '';
        document.querySelector('.errortype').classList.remove('error');
    };
    let type=bloodType.value;
    if(type==='Blood Type') {
        setError('Blood type is required');
        c=1;
    }
    else{
        setSuccess();
        c=0;
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
        d=1;
    }
    else{
        setSuccess();
        d=0;
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
        e=1;
    }
    else{
        setSuccess();
        e=0;
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

function Whatsapp(){
    if(whatsapp.value==='')
    {
        document.querySelector('.content .data form .communication-method div div .whats div').classList.remove('d-none');
        document.querySelector('.whatserror').innerText = 'You must enter whatsapp link';
        document.querySelector('.whatserror').classList.add('error');
        f=1;
    }
    else if(!isValidWhats(whatsapp.value)){
        document.querySelector('.whatserror').innerText = 'You must enter correct whatsapp number';
        document.querySelector('.whatserror').classList.add('error');
        f=1;
    }
    else{
        document.querySelector('.whatserror').innerText = '';
        document.querySelector('.whatserror').classList.remove('error');
        f=0;
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

function teligram(){
    if(tel.value==='')
    {
        document.querySelector('.content .data form .communication-method div div .tel div').classList.remove('d-none');
        document.querySelector('.telerror').innerText = 'You must enter teligram username';
        document.querySelector('.telerror').classList.add('error');
        g=1;
    }
    else if(!isValidTel(tel.value)){
        document.querySelector('.telerror').innerText = 'You must enter correct telegram username';
        document.querySelector('.telerror').classList.add('error');
        g=1;
    }
    else{
        document.querySelector('.telerror').innerText = '';
        document.querySelector('.telerror').classList.remove('error');
        g=0;
    }
}




function ValidateData(){
    ValidateTitle();
    ValidateDescription();
    ValidateCity();
    ValidateHospital();
    ValidateIllness();
    ValidateAge();
    ValidateType();
    
}

let next=document.querySelector('.content .data form .basic-data .col-md-6 .right .next a');
next.addEventListener('click',function(){
    GetUserData();
    ValidateData();

    if(x===0&&y===0&&z===0&&a===0&&b===0&&c===0&&e===0){
        
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
    Data=await fetch('http://146.190.206.136:8080/api/v1/needs/blood', {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOUmx5aU5tMGxHRGo0WlpwS2s4XzAtY1ltQ1hFWThCMFozRXBrQjB6OGJRIn0.eyJleHAiOjE2ODg4ODU4ODEsImlhdCI6MTY4ODg0OTg4MSwianRpIjoiYjNjMjhjMGYtMGNmYy00MTlkLWI1M2EtZjAxY2EyZGI0MWU1IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgxODEvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5OTNhYzY0Ny00MGJjLTRmODYtOTBjOS01MDhlN2Y1ZDg2MzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRob3JpemF0aW9uLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiMDNiOThiNmItMThhNS00YTQ3LTk5YTktMWQ2MmYxMTI4N2Q0IiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiMDNiOThiNmItMThhNS00YTQ3LTk5YTktMWQ2MmYxMTI4N2Q0IiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjAxMDYyMjI3NzE0IiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.llgq35Of8Gu45SESTmaARY_yY7Xn-21LoRErQn6Wz1XSUm_PjB-eOe_UfN01r6fPpsNE2LaxolljILk4aFYwDPoQZdxgtppcGYDBfOFVdSM66N31jtMoIIURaoXFXQ_RKzVjRcxJHvhmtQ2AGkNfi2w5EPfcikqhTaOb0nb4weoZlQLtcMoV8SM6qszc0VR-xGxQzmQ8diTlXwKsTnijvvQeJXfHMM3s4pWUkJZBSugTRa-7Ai1tydYpeQ52Ox8e5uYtmCNzxMttLXMyIwSIDOIYqD2mdeaSbgdvq_wFoRQ7lg6SSoozLOchkZC1KYWn9TSREWcsJY9rp1mCcLrVoA'
        },
        body:JSON.stringify(bloodNeed)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.status==="REJECTED"){
            document.querySelector('.bigerror p').innerText = 'You must enter correct data';
            document.querySelector('.bigerror p').classList.add('error');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
}



let subMit=document.querySelector('.content .data form .communication-method .buttons button');
subMit.addEventListener('click',async function(event){
    document.querySelector('.content .data form .basic-data').classList.add('d-none');
    document.querySelector('.content .data form .communication-method').classList.remove('d-none');
    event.preventDefault();
    GetUserData();
    ValidateContact();
    Whatsapp();
    teligram();
    if(d===0&&f===0&&g===0){
        await SendUserData();
        ClearUserData();
    }
})
document.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();
})


var text1=$(".content .data form .basic-data .col-md-6  div .title .text"),
    count1=$(".content .data form .basic-data .col-md-6 div .title  div p .count"),
    maxLength1=text1.attr("maxlength"),
    maxLength1=Number(maxLength1);
text1.keyup(function(){
    var currentLength1=$(this).val().length;
    if(currentLength1==0)
    {
        count1.html(1);
    }
    else{
        count1.html(currentLength1);
    }
})
var text2=$(".content .data form .basic-data .col-md-6 div .description .text"),
    count2=$(".content .data form .basic-data .col-md-6 div .description div p .count"),
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



