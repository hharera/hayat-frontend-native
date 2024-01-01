let see_more=document.querySelector('.donations .see a');
let elements=document.querySelector('.row-donations');
let search=document.querySelector('.donations1 .filter .filters input');
let donation1=document.querySelector('.donations1');


export let allDonations=[];
async function getDonations(url){
    let response=await fetch(url);
    allDonations=await response.json();
    displayDonations()
}
getDonations('http://146.190.206.136:8084/api/v1/donations/clothing/results?page=1');
function displayDonations(){
    let element="";
    for(let i=0;i<allDonations.length;i++){
        let donation_date=new Date(allDonations[i].donation_date);
        let current_date=new Date();
        let diff_in_ms=current_date-donation_date;
        let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
        
        element+=`
        <div class="col-lg-3 col-md-6 mb-4">
              <div class="details">
                <div class="img">
                <img src="${allDonations[i].image_url}" onerror="this.src='images/default.png'" alt="" class="w-100 image">
                </div>
                <div class="detail d-flex align-items-center justify-content-between p-3">
                  <div class="title-desc">
                    <div class="title">
                      <h3 class="text-capitalize">${allDonations[i].title}</h3>
                      <p class="text-capitalize">${allDonations[i].user.firstName} ${allDonations[i].user.lastName}</p>
                    </div>
                    <div class="desc">
                      <p>${allDonations[i].description}</p>
                    </div>
                  </div>
                  <div class="see-more text-center">
                    <span class="id d-none">${allDonations[i].id}</span>
                    <span class="change text-capitalize d-block px-2">see more</span>
                    <span>${diff_in_days} days later</span>
                  </div>
                </div>
              </div>
        </div>
        `
    }
    if(elements != null)
    {
      elements.innerHTML=element;
    }
}



let page1=document.querySelector(".donations1 .see .page1");
let page2=document.querySelector(".donations1 .see .page2");
let page3=document.querySelector(".donations1 .see .page3");
let page4=document.querySelector(".donations1 .see .page4");


page1.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".donations1 .see .page1").classList.remove('notpage');
  document.querySelector(".donations1 .see .page1").classList.add('page');
  getDonations('http://146.190.206.136:8084/api/v1/donations/clothing/results?page=1');
})
page2.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".donations1 .see .page2").classList.remove('notpage');
  document.querySelector(".donations1 .see .page2").classList.add('page');
  getDonations('http://146.190.206.136:8084/api/v1/donations/clothing/results?page=2');
})
page3.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".donations1 .see .page3").classList.remove('notpage');
  document.querySelector(".donations1 .see .page3").classList.add('page');
  getDonations('http://146.190.206.136:8084/api/v1/donations/clothing/results?page=3');
})
page4.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".donations1 .see .page4").classList.remove('notpage');
  document.querySelector(".donations1 .see .page4").classList.add('page');
  getDonations('http://146.190.206.136:8084/api/v1/donations/clothing/results?page=4');
})


let parent=document.querySelector(".donations1 .see");


search.addEventListener("keyup",function(){
    Search(this.value)
})


function Search(term){
    let chosenElemnet="";
    for(let i=0;i<allDonations.length;i++){
        if(allDonations[i].title.toLowerCase().includes(term.toLowerCase())){
            let donation_date=new Date(allDonations[i].donation_date);
            let current_date=new Date();
            let diff_in_ms=current_date-donation_date;
            let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
            chosenElemnet+=`
            <div class="col-lg-3 col-md-6 mb-4">
                  <div class="details">
                    <div class="img">
                    <img src="${allDonations[i].image_url}" onerror="this.src='images/default.png'" alt="" class="w-100 image">
                    </div>
                    <div class="detail d-flex align-items-center justify-content-between p-3">
                      <div class="title-desc">
                        <div class="title">
                          <h3 class="text-capitalize">${allDonations[i].title}</h3>
                          <p class="text-capitalize">${allDonations[i].user.firstName} ${allDonations[i].user.lastName}</p>
                        </div>
                        <div class="desc">
                          <p>${allDonations[i].description}</p>
                        </div>
                      </div>
                      <div class="see-more text-center">
                        <span class="d-none">${allDonations[i].id}</span>
                        <span class="change text-capitalize d-block px-2">see more</span>
                        <span>${diff_in_days} days later</span>
                      </div>
                    </div>
                  </div>
            </div>
            `
        }
    }
    if(elements != null)
    {
      elements.innerHTML=chosenElemnet;
    }
}






