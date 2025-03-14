document.addEventListener('DOMContentLoaded', function(){

    const button = document.getElementById('myButton');
    const output = document.getElementById('jsParagraph');

    button.addEventListener('click', function(){
        output.textContent = 'This is from a JavaScript File!';
    });
});