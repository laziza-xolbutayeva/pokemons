'use strict'


// 
// PAKEMON CARD YARATUVCHI FUNKSIYA
// 
function pakemonCard(pokemon){
    $("#pakemon_cards").innerHTML="";
    pokemon.forEach((item)=>{
        let div=document.createElement("div");
        let str="";
        item.type.forEach((e,i,mas)=>{
            if(i==mas.length-1) str+=`${e}`
            else str+=`${e}, `
        });
        div.setAttribute("class","col-3 p-2 my-3");
        div.innerHTML=`
        <div class="card p-0 card_height">
            <div class="p-5 card_images">
            <img src="${item.img}" class="card-img-top" alt="${item.name}">
            </div>
            <div class="card-body border-top border-dark px-4 py-3">
            <h4 class="card-title fw-bolder w-100 d-flex justify-content-between">${item.name} <span class=""><i class="fa-regular fa-heart liked"></i></h4>
            <p class="card-text fw-semibold" id="card_p">${str}</p>
            <p class="fw-bolder fs-5 w-100 d-flex justify-content-between">${item.weight} <span class="me-3">${item.avg_spawns} age</span></p>
            </div>
        </div>`
        $("#pakemon_cards").appendChild(div);
    })
}



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
// SAVATCHAGA CARD JOYLOVCHI FUNKSIYA
// 
function BaskedFunc(array){
    $a(".liked").forEach((item,index,m)=>{
        item.addEventListener("click",()=>{
            item.setAttribute("class","fa-solid fa-heart liked");
            let div=document.createElement("div");
            let str="";
            array[index].type.forEach((e,i,mas)=>{
                if(i==mas.length-1) str+=`${e}`
                else str+=`${e}, `
            });
            div.setAttribute("class","card p-0 border-dark mb-3");
            div.setAttribute("id",`basked`)
            div.innerHTML=`<img src="${array[index].img}" class="card-img-top p-5" alt="${array[index].name}">
            <div class="card-body border-top border-dark px-4 py-3">
                <h4 class="card-title fw-bolder w-100 d-flex justify-content-between">${array[index].name} <span class="deletebtn"><img src="/images/delete.svg" alt="" class="liked"></span></h4>
                <p class="card-text">${str}</p>
                <h5 class="fw-bolder ">${array[index].weight} <span class="m-4">${array[index].avg_spawns} age</span></h5>
            </div>`;
            $(".likedCard").appendChild(div);
        })
    })
}



// 
// DIFAULT HOLATDA PAKEMON CARD YARATISH
// 
pakemonCard(pokemons);
BaskedFunc(pokemons);


// 
// SELECTGA OPTION QO'SHISH
// 
typeFunc(pokemons)







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
    BaskedFunc(mass)
})


// 
// TITLE BO'YICHA QIDIRISH
// 
$(".search").addEventListener("input",()=>{
    let mas=pokemons.filter((item)=>item.name.toLowerCase().includes(`${$(".search").value.toLowerCase()}`))
    pakemonCard(mas);
    BaskedFunc(mas)
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
    BaskedFunc(mass)
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
    console.log(array);
    if($("#letters").value!="Mixed"){
        let arr=[];
        if(("#letters").value=="Zz-Aa") {
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
    BaskedFunc(array)
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