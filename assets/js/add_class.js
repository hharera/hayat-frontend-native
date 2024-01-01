// let alllis = document.querySelectorAll('a')
// let alldivs = document.querySelectorAll('div')

// alllis.forEach(function(ele){
//     ele.onclick = function(){
//        // alldivs.forEach(function(ele){
//        //     ele.classList.remove('new-class')
//        // })
//     alldivs.forEach(function(ele){
//         ele.classList.add('new-class')
//     })
// }
// })

//
// console.log("llllllllllllll")


let alldivs = document.querySelectorAll('div')

function choose_active(ele){
    // preventDefault();
    console.log('llllllllllllllll')
    event.preventDefault();
    alldivs.forEach(function(ele){
                ele.classList.add('new-class')
            })

}