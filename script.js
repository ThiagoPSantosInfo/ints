let slide = 1
document.getElementById("radio1").checked = true;

setInterval(function(){
    transicao();
}, 4000)

function transicao(){
    slide++;
    if(slide>4){
        slide = 1;
    }

    document.getElementById("radio"+slide).checked = true
}

let slider = 1
document.getElementById("rdio1").checked = true;

setInterval(function(){
    transic();
}, 10000)

function transic(){
    slider++;
    if(slider>4){
        slider = 1;
    }

    document.getElementById("rdio"+slider).checked = true;
}