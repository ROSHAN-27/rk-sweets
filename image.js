const sliderImg = document.getElementById('imageChange');

function slider() {
    let i =1;
    setInterval(()=>{        
            sliderImg.src= `./images/sliderImage${i}.png`
            console.log(`./images/sliderImage${i}.png`)
            if(i>=3) {
                i=0;
            } else {
                i++;
            }
              
    }, 3000)
}