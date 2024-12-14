const img = document.getElementById('img')
function get_img(input){
    if(input.files && input.files[0]){
        var reader = new FileReader();
        reader.onload = (e)=>{
            img.setAttribute('src',e.target.result)
            img.setAttribute('class','img')
        }
        reader.readAsDataURL(input.files[0])
    }
}