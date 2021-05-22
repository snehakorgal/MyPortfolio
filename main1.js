
function bodyScrollingToggle(){
    document.body.classList.toggle("stop-scrolling");
}


(()=>{
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = document.querySelector(".close-nav-menu");
    
    hamburgerBtn.addEventListener("click",showNavMenu);
    closeNavBtn.addEventListener("click",hideNavMenu);
        function showNavMenu(){
            navMenu.classList.add("open");
            bodyScrollingToggle();
        }
        function hideNavMenu(){
            navMenu.classList.remove("open");
            fadeOutEffect();
            bodyScrollingToggle();
        }
        function fadeOutEffect(){
            document.querySelector(".fade-out-effect").classList.add("active");
            setTimeout(()=>{
                document.querySelector(".fade-out-effect").classList.remove("active");
            },300)
        }
        document.addEventListener("click",(event)=>{
            if(event.target.classList.contains('link-item')){
                if(event.target.hash !==""){
                    event.preventDefault();
                    const hash= event.target.hash;
                    console.log(hash);

                    document.querySelector(".section.active").classList.add("hide");
                    document.querySelector(".section.active").classList.remove("active");

                    document.querySelector(hash).classList.add("active");
                    document.querySelector(hash).classList.remove("hide");

                    navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                    navMenu.querySelector(".active").classList.remove("active","inner-shadow");
                    if(navMenu.classList.contains("open")){
                        event.target.classList.add("active","inner-shadow");
                        event.target.classList.add("outer-shadow","hover-in-shadow");
                        hideNavMenu();
                    }
                    else{
                        let navItems = navMenu.querySelectorAll(".link-item");
                        navItems.forEach((item)=>{
                            if(hash == item.hash){
                                item.classList.add("active","inner-shadow");
                                item.classList.add("outer-shadow","hover-in-shadow");
                            }
                        })
                        fadeOutEffect();
                    }
                    window.location.hash = hash;

                }   
            }
        })
    
})();

(()=>{
    const projectItemsContainer = document.querySelector(".project-items"),
    projectItems = document.querySelectorAll(".project-item"),
    popup = document.querySelector(".project-popup"),
    prevBtn = document.querySelector(".pp-prev"),
    nextBtn = document.querySelector(".pp-next"),
    closeBtn = document.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex , slideIndex, screenshots;
    projectItemsContainer.addEventListener("click",(event)=>{
        if(event.target.closest(".project-item-inner")){
            const projectItem = event.target.closest(".project-item-inner").parentElement;
            itemIndex = Array.from(projectItem.parentElement.children).indexOf(projectItem);
            screenshots = projectItems[itemIndex].querySelector(".project-item-img img").getAttribute("data-screenshots");
            screenshots = screenshots.split(',');
            if(screenshots.length==1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }
            else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })
    
    closeBtn.addEventListener(("click"),()=>{
        popupToggle();
        if(projectItemsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            popup.querySelector(".pp-loader").classList.remove("active");
        } 
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + "of" + screenshots.length;
    }
    nextBtn.addEventListener(("click"), () =>{
        if(slideIndex == screenshots.length-1){
            slideIndex=0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })
    prevBtn.addEventListener(("click"), () =>{
        if(slideIndex == 0){
            slideIndex=screenshots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })
    projectDetailsBtn.addEventListener(("click"),()=>{
        popupDetailsToggle();
    })
    function popupDetails(){
        const details = projectItems[itemIndex].querySelector(".project-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = projectItems[itemIndex].querySelector(".project-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;
    }



    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + 'px';
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight+'px';
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }
})();


(()=>{
    const sections = document.querySelectorAll(".section");

    sections.forEach((section) =>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    })
})();

window.addEventListener("load",()=>{
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(()=>{
        document.querySelector(".preloader").style.display="none";
    },600)
})

