let dropDown1=document.querySelector(".show .donations-needs .donations img");
let dropDown2=document.querySelector(".show .donations-needs .needs img");
dropDown1.addEventListener('click',function(){
    if(dropDown1.getAttribute('src')=='assets/img/up-arrow-svgrepo-com.svg'){
        dropDown1.setAttribute('src','assets/img/down-arrow-svgrepo-com.svg')
    }
    else if(dropDown1.getAttribute('src')=='assets/img/down-arrow-svgrepo-com.svg'){
        dropDown1.setAttribute('src','assets/img/up-arrow-svgrepo-com.svg')
    }
    document.querySelector('.show .d-create-show').classList.toggle('d-none')
    document.querySelector('.show .n-create-show').classList.add('d-none')
    dropDown2.setAttribute('src','assets/img/down-arrow-svgrepo-com.svg')
})
dropDown2.addEventListener('click',function(){
    if(dropDown2.getAttribute('src')=='assets/img/up-arrow-svgrepo-com.svg'){
        dropDown2.setAttribute('src','assets/img/down-arrow-svgrepo-com.svg')
    }
    else if(dropDown2.getAttribute('src')=='assets/img/down-arrow-svgrepo-com.svg'){
        dropDown2.setAttribute('src','assets/img/up-arrow-svgrepo-com.svg')
    }
    dropDown1.setAttribute('src','assets/img/down-arrow-svgrepo-com.svg')
    document.querySelector('.show .d-create-show').classList.add('d-none')
    document.querySelector('.show .n-create-show').classList.toggle('d-none')
})