let header1=document.querySelector('.content .header .header1');
let header2=document.querySelector('.content .header .header2');
let arrow=document.querySelector('.content .header .header1 .arrow');
let parent=document.querySelector('.content .data form .basic-data .col-md-6 div .image-title .image .img');


let img=document.querySelector('input[type="file"]');
let title=document.querySelector('.content .data form .basic-data .col-md-6 div .image-title .title2 div input');
let description=document.querySelector('.content .data form .basic-data .col-md-6 div .description .text');
let clothingCategory=document.querySelector('.content .data form .basic-data .col-md-6 div .category .clothing_category');
let season=document.querySelector('.content .data form .basic-data .col-md-6 div .season .clothing_season');
let condition=document.querySelector('.content .data form .basic-data .col-md-6 .right .condition .clothing_condition');
let type=document.querySelector('.content .data form .basic-data .col-md-6 .right .type .clothing_type');
let amount=document.querySelector('.content .data form .basic-data .col-md-6 .right .amount-size .amounts .amount')
let size=document.querySelector('.content .data form .basic-data .col-md-6 .right .amount-size .sizes .size')
let contact=document.querySelectorAll("input[type='radio']");
let city=document.querySelector('.content .data form .basic-data .col-md-6 .right .cities .city');
let communication_method='undefined';
let x=0,y=0,z=0,a=0,b=0,c=0,d=0,e=0,f=0,g=0,h=0,k=0,m=0,n=0;

let categories=[];
async function getCategories(){
    let response=await fetch('http://146.190.206.136:8085/api/v1/clothing/categories');
    categories=await response.json();
    displayCategories()
}
getCategories()

function displayCategories(){
    for(let i=0;i<categories.length;i++){
        let option=document.createElement('option');
        option.innerHTML=categories[i].englishName;
        option.value=categories[i].id;
        clothingCategory.appendChild(option)
    }
}

let seasons=[];
async function getSeasons(){
    let response=await fetch('http://146.190.206.136:8085/api/v1/clothing/seasons');
    seasons=await response.json();
    displaySeasons();
}
getSeasons()

function displaySeasons(){
    for(let i=0;i<seasons.length;i++){
        let option=document.createElement('option');
        option.innerHTML=seasons[i].englishName;
        option.value=seasons[i].id;
        season.appendChild(option)
    }
}


let conditions=[];
async function getCondition(){
    let response=await fetch('http://146.190.206.136:8085/api/v1/clothing/conditions');
    conditions=await response.json();
    displayConditions();
}
getCondition()

function displayConditions(){
    for(let i=0;i<conditions.length;i++){
        let option=document.createElement('option');
        option.innerHTML=conditions[i].englishName;
        option.value=conditions[i].id;
        condition.appendChild(option)
    }
}


let types=[];
async function getType(){
    let response=await fetch('http://146.190.206.136:8085/api/v1/clothing/types');
    types=await response.json();
    displayType();
}
getType()

function displayType(){
    for(let i=0;i<types.length;i++){
        let option=document.createElement('option');
        option.innerHTML=types[i].englishName;
        option.value=types[i].id;
        type.appendChild(option)
    }
}
let sizes=[];
async function getSize(){
    let response=await fetch('http://146.190.206.136:8085/api/v1/clothing/sizes');
    sizes=await response.json();
    displaySize();
}
getSize()

function displaySize(){
    for(let i=0;i<sizes.length;i++){
        let option=document.createElement('option');
        option.innerHTML=sizes[i].englishName;
        option.value=sizes[i].id;
        size.appendChild(option)
    }
}

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

let clothingDonation={
  "title": "",
  "description": "",
  "communication_method": "",
  "city_id": 0,
  "image_url": "",
  "quantity": 0,
  "clothing_season_id": 0,
  "clothing_size_id": 0,
  "clothing_category_id": 0,
  "clothing_type_id": 0,
  "clothing_condition_id": 0,
  "whatsapp_link":"",
  "telegram_link":"",
};

function GetUserData(){
    getContactValue();
    clothingDonation={
        "title": title.value,
        "description": description.value,
        "communication_method": communication_method,
        "city_id": Number(city.value),
        "image_url": img.value,
        "quantity": Number(amount.value),
        "clothing_season_id": Number(season.value),
        "clothing_size_id": Number(size.value),
        "clothing_category_id": Number(clothingCategory.value),
        "clothing_type_id": Number(type.value),
        "clothing_condition_id": Number(condition.value),
        "whatsapp_link":"https://wa.me/"+whatsapp.value,
        "telegram_link":"https://t.me/"+tel.value
    }
};
function ClearUserData(){
    img.value='';
    title.value='';
    description.value='';
    amount.value='';
    city.value='';
    condition.value='';
    type.value='';
    clothingCategory.value='';
    size.value='';
    season.value='';
    whatsapp.value="";
    tel.value="";
    document.querySelector('.content .data form .communication-method div div .whats div').classList.remove('d-none');
    document.querySelector('.content .data form .communication-method div div .tel div').classList.remove('d-none');

    if(parent.children.length>=3){
        parent.removeChild(parent.children[2]);
        file2='';
        document.querySelector('.content .data form .basic-data .img .imgs').style.display='block';
    }
    count1.html(1);
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
        document.querySelector('.errortittle').innerText = message;
        document.querySelector('.errortittle').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errortittle').innerText = '';
        document.querySelector('.errortittle').classList.remove('error');
    };
    let Title=title.value.trim();
    if(Title === '') {
        setError('Tittle is required');
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
        setError('Provide a valid tittle, it must be characters');
        y=1;
    }
    else{
        setSuccess();
        y=0;
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
        z=1;
    }
    else if(Description.length<4){
        setError('it must contain 4 characters at least');
        z=1;
    }
    else if(Description.length>800){
        setError('it must contain 800 characters at most');
        z=1;
    }
    else if(!isValidDescription(Description)){
        document.querySelector('.description').classList.add('pb-4')
        setError('Provide a valid description, it must be characters');
        z=1;
    }
    else{
        setSuccess();
        z=0;
    }


}

function ValidateCategory(){
    const setError = (message) => {
        document.querySelector('.errorcategory').innerText = message;
        document.querySelector('.errorcategory').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorcategory').innerText = '';
        document.querySelector('.errorcategory').classList.remove('error');
    };
    let Category=clothingCategory.value;
    if(Category==='') {
        setError('Clothing category is required');
        a=1;
    }
    else{
        setSuccess();
        a=0;
    }
}
function ValidateSeason(){
    const setError = (message) => {
        document.querySelector('.errorseason').innerText = message;
        document.querySelector('.errorseason').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorseason').innerText = '';
        document.querySelector('.errorseason').classList.remove('error');
    };
    let Season=season.value;
    if(Season==='') {
        setError('Season is required');
        b=1;
    }
    else{
        setSuccess();
        b=0;
    }
}
function ValidateCondition(){
    const setError = (message) => {
        document.querySelector('.errorcondition').innerText = message;
        document.querySelector('.errorcondition').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorcondition').innerText = '';
        document.querySelector('.errorcondition').classList.remove('error');
    };
    let Condition=condition.value;
    if(Condition==='') {
        setError('Condition is required');
        c=1;
    }
    else{
        setSuccess();
        c=0;
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
    let Type=type.value;
    if(Type==='') {
        setError('Type is required');
        d=1;
    }
    else{
        setSuccess();
        d=0;
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
        e=1;
    }else if(!isValidAmount(Amount)){
        setError('Provide a valid amount, it must be only number');
        e=1;
    }
    else{
        setSuccess();
        e=0;
    }


}

function ValidateSize(){
    const setError = (message) => {
        document.querySelector('.errorsize').innerText = message;
        document.querySelector('.errorsize').classList.add('error');
    };
    const setSuccess = () => {
        document.querySelector('.errorsize').innerText = '';
        document.querySelector('.errorsize').classList.remove('error');
    };
    let Size=size.value;
    if(Size==='') {
        setError('Size is required');
        f=1;
    }
    else{
        setSuccess();
        f=0;
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
        h=1;
    }
    else{
        setSuccess();
        h=0;
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
        g=1;
    }
    else{
        setSuccess();
        g=0;
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
    ValidateDescription();
    ValidateCategory();
    ValidateSeason();
    ValidateCondition();
    ValidateType();
    ValidateAmount();
    ValidateSize()
    ValidateCity();
}



let next=document.querySelector('.content .data form .basic-data .col-md-6 .right .next a');
next.addEventListener('click',function(){

    GetUserData();
    ValidateData();

    if(x===0&&y===0&&z===0&&a===0&&b===0&&c===0&&d===0&&e===0&&f===0&&g===0){
        
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
    Data=await fetch('http://146.190.206.136:8084/api/v1/donations/clothing', {
        method:"POST",
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOUmx5aU5tMGxHRGo0WlpwS2s4XzAtY1ltQ1hFWThCMFozRXBrQjB6OGJRIn0.eyJleHAiOjE2ODgzNDQyMDcsImlhdCI6MTY4ODMwODIwNywianRpIjoiYTBiMGU3MWItM2Q5NS00MWQ2LWE3MzYtNzZhYWYwMjI4MjcyIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgxODEvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5OTNhYzY0Ny00MGJjLTRmODYtOTBjOS01MDhlN2Y1ZDg2MzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRob3JpemF0aW9uLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiOWQ2YTBhNWQtNDhlYS00MGZkLWJhMGItMGMzNmZhNjEyMmExIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiOWQ2YTBhNWQtNDhlYS00MGZkLWJhMGItMGMzNmZhNjEyMmExIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjAxMDYyMjI3NzE0IiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.XnFWIxOaiTqG7ncICdanW0BfL-iJt2G2PmadZg2qEDF8MlYO_DIJuaZwcKjKbzh8ji1IaTqV6cYiqGk31NAg8gJrlVCRju5JVJR5s00NGyUlhCkE2ZLg7Smuq1lSLQWAPywGL5SZyerM8TMsT2iFdw6IFqvwGmC_CXQsM386K0RmlgXQsKZmQc0XV99AM9gk-ZQB7_dkNCBES-B_qNWRPtpIIpnGQ1ue3npHza9IvsGqLKk11ywQijyjbHujEn3dm8dE__TFTTPou4jDikrObNrep1xbKU6IK8dimKLZ95mikWT3XcDs5BOVAOoHQWnaiyI3hsBD4akrq_8Ou6_dgA'
        },
        body:JSON.stringify(clothingDonation)
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        url=`http://146.190.206.136:8084/api/v1/donations/clothing/${data.id}/images`;
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
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJOUmx5aU5tMGxHRGo0WlpwS2s4XzAtY1ltQ1hFWThCMFozRXBrQjB6OGJRIn0.eyJleHAiOjE2ODgzNDQyMDcsImlhdCI6MTY4ODMwODIwNywianRpIjoiYTBiMGU3MWItM2Q5NS00MWQ2LWE3MzYtNzZhYWYwMjI4MjcyIiwiaXNzIjoiaHR0cDovL2tleWNsb2FrOjgxODEvcmVhbG1zL21hc3RlciIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiI5OTNhYzY0Ny00MGJjLTRmODYtOTBjOS01MDhlN2Y1ZDg2MzMiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJhdXRob3JpemF0aW9uLXNlcnZpY2UiLCJzZXNzaW9uX3N0YXRlIjoiOWQ2YTBhNWQtNDhlYS00MGZkLWJhMGItMGMzNmZhNjEyMmExIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIvKiJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwic2lkIjoiOWQ2YTBhNWQtNDhlYS00MGZkLWJhMGItMGMzNmZhNjEyMmExIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInByZWZlcnJlZF91c2VybmFtZSI6IjAxMDYyMjI3NzE0IiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.XnFWIxOaiTqG7ncICdanW0BfL-iJt2G2PmadZg2qEDF8MlYO_DIJuaZwcKjKbzh8ji1IaTqV6cYiqGk31NAg8gJrlVCRju5JVJR5s00NGyUlhCkE2ZLg7Smuq1lSLQWAPywGL5SZyerM8TMsT2iFdw6IFqvwGmC_CXQsM386K0RmlgXQsKZmQc0XV99AM9gk-ZQB7_dkNCBES-B_qNWRPtpIIpnGQ1ue3npHza9IvsGqLKk11ywQijyjbHujEn3dm8dE__TFTTPou4jDikrObNrep1xbKU6IK8dimKLZ95mikWT3XcDs5BOVAOoHQWnaiyI3hsBD4akrq_8Ou6_dgA'
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
    if(h===0&&m===0&&n===0){
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
        count1.html(1);
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
