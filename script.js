gsap.registerPlugin(ScrollTrigger);

// Setup
const scroller = document.querySelector('.scroller');

const bodyScrollBar = Scrollbar.init(scroller, { damping: 0.1, delegateTo: document, alwaysShowTracks: true });

ScrollTrigger.scrollerProxy(".scroller", {
  scrollTop(value) {
    if (arguments.length) {
      bodyScrollBar.scrollTop = value;
    }
    return bodyScrollBar.scrollTop;
  }
});

bodyScrollBar.addListener(ScrollTrigger.update);

ScrollTrigger.defaults({ scroller: scroller });


// The actual animations and ScrollTriggers
gsap.to('section.grey .text', { 
  scrollTrigger: {
    trigger: "section.grey",
    start: "top top", 
    end: () => "+=" + innerHeight,
    pin: true,
    scrub: true,
    markers: true
  }
});

gsap.from("section.red .text", {
  x: -500,
  opacity: 0,
  scrollTrigger: {
    trigger: "section.red",
    start:"top 50%",     
    toggleActions: "play none none reset",
    // markers:true
  },
});





// Only necessary to correct marker position - not needed in production
if (document.querySelector('.gsap-marker-scroller-start')) {		
  const markers = gsap.utils.toArray('[class *= "gsap-marker"]');	

  bodyScrollBar.addListener(({ offset }) => {  
    gsap.set(markers, { marginTop: -offset.y })
  });
}

gsap.registerPlugin(ScrollTrigger);

{
  const process = document.querySelector('.process');
  if ((typeof(process) != 'undefined' && process != null)) {
    let sections = gsap.utils.toArray('.process__item');
    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: process,
        markers: false,
        scrub: 1,
        pin: true,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + document.querySelector(".process").offsetWidth
      },
    });
  }
};S

function parallax() {
	var $slider = document.getElementById("slider");

	var yPos = window.pageYOffset / $slider.dataset.speed;
	yPos = -yPos;
	
	var coords = '0% '+ yPos + 'px';
	
	$slider.style.backgroundPosition = coords;
}

window.addEventListener("scroll", function(){
	parallax();	
});