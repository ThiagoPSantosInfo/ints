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