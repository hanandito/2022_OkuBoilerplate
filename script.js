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
    start:"top bottom",     
    toggleActions: "play none none reset",
  },
});

const section = document.querySelector('section');
gsap.to('section.parallax img', { 
ScrollTrigger:{
    trigger: section,
    start: "top top", 
    pin: true, 
    pinSpacing: false 
  }
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
};;
		
		gsap.utils.toArray(".section-parallax .parallax-content").forEach((section, i) => {
          const heightDiff = section.offsetHeight - section.parentElement.offsetHeight;

      gsap.fromTo(section,{ 
        y: -heightDiff
      }, {
        scrollTrigger: {
          trigger: section.parentElement,
          scrub: true
        },
        y: 0,
        ease: "none"
      });
		});