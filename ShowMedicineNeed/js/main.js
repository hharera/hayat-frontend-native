let see_more=document.querySelector('.donations .see a');
let elements=document.querySelector('.row-needs');
let search=document.querySelector('.needs1 .filter .filters input');
let donation1=document.querySelector('.needs1');



export let allneeds=[];
async function getNeeds(url){
    let response=await fetch(url);
    allneeds=await response.json();
    displayDonations()
}
getNeeds('http://146.190.206.136:8082/api/v1/needs/medicine/results?page=1');
function displayDonations(){
    let element="";
    for(let i=0;i<allneeds.length;i++){
        let need_date=new Date(allneeds[i].need_date);
        let current_date=new Date();
        let diff_in_ms=current_date-need_date;
        let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
        
        element+=`
        <div class="col-lg-3 col-md-6 mb-4">
              <div class="details">
                <div class="img">
                <img src="${allneeds[i].image_url}" onerror="this.src='images/default.png'" alt="" class="w-100 image">
                </div>
                <div class="detail d-flex align-items-center justify-content-between p-3">
                  <div class="title-desc">
                    <div class="title">
                      <h3 class="text-capitalize">${allneeds[i].title}</h3>
                      <p class="text-capitalize">${allneeds[i].user.firstName} ${allneeds[i].user.lastName}</p>
                    </div>
                    <div class="desc">
                      <p>${allneeds[i].description}</p>
                    </div>
                  </div>
                  <div class="see-more text-center">
                    <span class="id d-none">${allneeds[i].id}</span>
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



let page1=document.querySelector(".needs1 .see .page1");
let page2=document.querySelector(".needs1 .see .page2");
let page3=document.querySelector(".needs1 .see .page3");
let page4=document.querySelector(".needs1 .see .page4");


page1.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".needs1 .see .page1").classList.remove('notpage');
  document.querySelector(".needs1 .see .page1").classList.add('page');
  getNeeds('http://146.190.206.136:8082/api/v1/needs/medicine/results?page=1');
})
page2.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".needs1 .see .page2").classList.remove('notpage');
  document.querySelector(".needs1 .see .page2").classList.add('page');
  getNeeds('http://146.190.206.136:8082/api/v1/needs/medicine/results?page=2');
})
page3.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".needs1 .see .page3").classList.remove('notpage');
  document.querySelector(".needs1 .see .page3").classList.add('page');
  getNeeds('http://146.190.206.136:8082/api/v1/needs/medicine/results?page=3');
})
page4.addEventListener('click',function(){
  for(let i=0;i<parent.children.length;i++){
    parent.children[i].classList.add('notpage');
  }
  document.querySelector(".needs1 .see .page4").classList.remove('notpage');
  document.querySelector(".needs1 .see .page4").classList.add('page');
  getNeeds('http://146.190.206.136:8082/api/v1/needs/medicine/results?page=4');
})


let parent=document.querySelector(".needs1 .see");


search.addEventListener("keyup",function(){
    Search(this.value)
})


function Search(term){
    let chosenElemnet="";
    for(let i=0;i<allneeds.length;i++){
        if(allneeds[i].title.toLowerCase().includes(term.toLowerCase())){
            let need_date=new Date(allneeds[i].need_date);
            let current_date=new Date();
            let diff_in_ms=current_date-need_date;
            let diff_in_days=Math.floor(diff_in_ms/(1000*60*60*24));
            chosenElemnet+=`
            <div class="col-lg-3 col-md-6 mb-4">
                  <div class="details">
                    <div class="img">
                    <img src="${allneeds[i].image_url}" onerror="this.src='images/default.png'" alt="" class="w-100 image">
                    </div>
                    <div class="detail d-flex align-items-center justify-content-between p-3">
                      <div class="title-desc">
                        <div class="title">
                          <h3 class="text-capitalize">${allneeds[i].title}</h3>
                          <p class="text-capitalize">${allneeds[i].user.firstName} ${allneeds[i].user.lastName}</p>
                        </div>
                        <div class="desc">
                          <p>${allneeds[i].description}</p>
                        </div>
                      </div>
                      <div class="see-more text-center">
                        <span class="d-none">${allneeds[i].id}</span>
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

