'use strict'


let idCard=[];
let likedCardObj=[];
// 
// PAKEMON CARD YARATUVCHI FUNKSIYA
// 
function pakemonCard(pokemon){
    $("#pakemon_cards").innerHTML="";
    pokemon.forEach((item)=>{
        let likedclass;
        if(likedCardObj.includes(item)){
            likedclass="fa-solid";
        }
        else{
            likedclass="fa-regular";
        }
        let div=document.createElement("div");
        let str="";
        item.type.forEach((e,i,mas)=>{
            if(i==mas.length-1) str+=`${e}`
            else str+=`${e}, `
        });
        div.setAttribute("class","pokemon col-3 p-2 my-3");
        div.innerHTML=`
        <div class="card p-0 card_height">
            <div class="p-5 card_images">
            <img src="${item.img}" class="card-img-top" alt="${item.name}">
            </div>
            <div class="card-body border-top border-dark px-4 py-3">
            <h4 class="card-title fw-bolder w-100 d-flex justify-content-between">${item.name} <span class=""><i class="${likedclass} fa-heart liked" data-id=${item.id}></i></h4>
            <p class="card-text fw-semibold" id="card_p">${str}</p>
            <p class="fw-bolder fs-5 w-100 d-flex justify-content-between">${item.weight} <span class="me-3">${item.avg_spawns} age</span></p>
            </div>
        </div>`;
        
        $("#pakemon_cards").appendChild(div);
        
    })

}


// 
// DEFAULT HOLATDA PAKEMON CARD YARATISH
// 
pakemonCard(pokemons);


// 
// KATEGORIYA TYPE QO'SHUVCHI FUNKSIYA
// 
function typeFunc(mas){
    let arr=[];
    mas.forEach((item)=>{
        item.type.forEach((e)=>{
            if(!arr.find(element=>element==e)){
                let option=document.createElement("option");
                option.setAttribute("class","typeoption")
                option.innerHTML=`${e}`;
                $("#typeSelect").appendChild(option);
                arr.push(e);
            }
        })
    })
}


// 
// SELECTGA OPTION QO'SHISH
// 
typeFunc(pokemons)


// 
// SAVATCHADA CARD YARATISH
// 
function createPakemonCardLiked(objects){
    
    $(".likedCard").innerHTML="";
    objects.forEach((obj)=>{
        let div=document.createElement("div");
        div.dataset.id=`${obj.id}`
        let str="";
        obj.type.forEach((e,i,mas)=>{
            if(i==mas.length-1) str+=`${e}`
            else str+=`${e}, `
        });
        div.setAttribute("class","card p-0 border-dark mb-3");
        div.setAttribute("id",`basked`);
        div.innerHTML=`<img src="${obj.img}" class="card-img-top p-5" alt="${obj.name}">
        <div class="card-body border-top border-dark px-4 py-3">
            <h4 class="card-title fw-bolder w-100 d-flex justify-content-between">${obj.name} <span ><img src="/images/delete.svg" alt="" class="deletebtn" data-id=${obj.id}></span></h4>
            <p class="card-text">${str}</p>
        <h5 class="fw-bolder ">${obj.weight} <span class="m-4">${obj.avg_spawns} age</span></h5>
        </div>`;
        $(".likedCard").appendChild(div);

    })
}


// 
// liked bosilganda objectga qo'shish
// 
function addObj(id){
    likedCardObj.push(pokemons.find((e)=>e.id==id));
    createPakemonCardLiked(likedCardObj)
}


// 
// LIKED bosish
// 
$("#pakemon_cards").addEventListener("click",(e)=>{
    if(e.target.matches('.liked')){
        $a(".liked").forEach((item)=>{
            if(e.target==item){
                if(e.target.matches(".fa-regular")){
                    item.classList.remove('fa-regular');
                    item.classList.add('fa-solid');
                    idCard.push(item.getAttribute("data-id"));
                    addObj(item.getAttribute("data-id"));
                }
                else{
                    item.classList.remove('fa-solid');
                    item.classList.add('fa-regular');
                    idCardAndLikedCardObjDelete(e.target.getAttribute("data-id"));
                    createPakemonCardLiked(likedCardObj);

                }
            }

        })
    }
})


// 
// liked o'chganida idCard va likedCardObj dan o'chirish
// 
function idCardAndLikedCardObjDelete(id){
    let deleteArr=idCard.findIndex((element)=>element==id);
    idCard.splice(deleteArr,1);
    let deleteObj;
    likedCardObj.forEach((ob,i)=>{
        if(ob.id==id){
            deleteObj=i;
        }
    })
    likedCardObj.splice(deleteObj,1);
}




// 
// liked carddan o'chirish
// 
$(".likedCard").addEventListener("click",(e)=>{
    if(e.target.matches('.deletebtn')){
        $a("#basked").forEach((item)=>{
            if(item.getAttribute("data-id")==e.target.getAttribute("data-id")){
                idCardAndLikedCardObjDelete(e.target.getAttribute("data-id"));
                createPakemonCardLiked(likedCardObj)
                deleteLiked(e.target.getAttribute("data-id"));
            }
        })
    }
})


// 
// delete bo'lganda liked yo'qolishi
// 
function deleteLiked(id){
    $a(".liked").forEach((el)=>{
        if(el.getAttribute("data-id")==id){
            el.classList.remove("fa-solid");
            el.classList.add("fa-regular")
        }
    })
}















// 
// TYPE BUYICHA QIDIRISH
// 
$("#typeSelect").addEventListener("input",()=>{
    let mass=[] ;
    pokemons.forEach((item)=>{
        let s=0;
        item.type.forEach((e)=> (e==$("#typeSelect").value)?s=1:0)
        if(s==1) mass.push(item);
    })
    pakemonCard(mass);
    
})


// 
// TITLE BO'YICHA QIDIRISH
// 
$(".search").addEventListener("input",()=>{
    let mas=pokemons.filter((item)=>item.name.toLowerCase().includes(`${$(".search").value.toLowerCase()}`))
    pakemonCard(mas);
    
})


// 
// HARF BO'YICHA QIDIRISH
// 
$("#letters").addEventListener("input",()=>{
    let arr=[],mass=[];
    if($("#letters").value=="Aa-Zz"){
        arr=pokemons.map(item=>item.name).sort();
        arr.forEach((item)=> mass.push(pokemons.find( e =>e.name==item)) )
    }
    else if($("#letters").value=="Zz-Aa"){
        arr=pokemons.map(item=>item.name).sort().reverse();
        arr.forEach((item)=> mass.push(pokemons.find( e =>e.name==item)) )
    }
    else{mass=pokemons}
    pakemonCard(mass);
})


// 
// BUTTON BOSILGANDA QIDIRISH
// 
$("#buttonsearch").addEventListener("click",()=>{
    let array=[];
    if($("#typeSelect").value!="All"){
        array=pokemons.filter((item)=>{
            let s=0;
            item.type.forEach( e => (e==$("#typeSelect").value)?s=1:0 );
            if(s==1) return item;
        })
    }
    else array=pokemons;

    if($(".search").value){
        array=array.filter((item)=>item.name.toLowerCase().includes(`${$(".search").value.toLowerCase()}`))
    }
    
    if($("#letters").value!="Mixed"){
        let arr=[];
        if($("#letters").value=="Zz-Aa") {
            arr=array.map(item=>item.name);
            arr.sort();arr.reverse();
            console.log(arr);
        }
        else{
             arr=array.map(item=>item.name);
             arr.sort();
             console.log(arr);
        }
        let mass=[];
        arr.forEach((item)=> mass.push(array.find( e =>e.name==item)) );
        array=mass;
    }
    pakemonCard(array);
})



// 
// SAVATCHANI OCHIB YOPISH
// 
$(".basket").addEventListener("click",()=>{
    $(".likedbg").style.width="100%";
    $("#closeButton").addEventListener("click",()=>{
        $(".likedbg").style.width="0%";
    })
})