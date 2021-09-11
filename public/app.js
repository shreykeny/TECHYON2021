//  dark mode
console.log("Made with love by Computer Department :)");

function myFunction() {
const html =  document.querySelector("html");
html.classList.toggle("dark");
}

myFunction();



// back to top

            //Get the button
            var mybutton = document.getElementById("myBtn");
            window.onscroll = function() {scrollFunction()};
            
            function scrollFunction() {
              if (document.body.scrollTop > 300 || document.documentElement.scrollTop >300) {
                mybutton.style.display = "block";
              } else {
                mybutton.style.display = "none";
              }
            }
            
            // When the user clicks on the button, scroll to the top of the document
            function topFunction() {
             
              $("html, body").animate(
                { scrollTop: "0" }, 800);
            }
          
             
           
// back to top ENDDD

// SMOOTH SCROLLING
$('.smooth').on('click',function(event)
{if(this.hash !==''){
  event.preventDefault();
  const hash =this.hash;
  $('html,body').animate(
    {
      scrollTop:$(hash).offset().top   },800
  
  );
}});
//ENDD
