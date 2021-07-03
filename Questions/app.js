//using selectors inside the element
// traversing the dom

const btns = document.querySelectorAll(".question-btn");

btns.forEach( (btn) => {
    btn.addEventListener("click", (e) => {
       const question = e.currentTarget.parentElement.parentElement;
       question.classList.toggle("show-text");

       btns.forEach((btn2) => {
           if(btn2 !== btn){
               btn2.parentElement.parentElement.classList.remove("show-text");
           }
       })
    })
});