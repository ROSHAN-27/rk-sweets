const sliderImg = document.getElementById('imageChange');

function slider() {
    let i =1;
    setInterval(()=>{        
            sliderImg.src= `./images/sliderImage${i}.png`
            console.log(`./images/sliderImage${i}.png`)
            if(i>=7) {
                i=1;
            } else {
                i++;
            }
              
    }, 1000)
}