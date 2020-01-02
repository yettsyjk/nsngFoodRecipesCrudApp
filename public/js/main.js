// //creating a variable to add button ingredient
// const addButton = document.querySelector('.add_ingredient');
// //adding an event listener to button that new ingredient
// addButton.addEventListener('click', (event) => {
//     const ingredientContainer = document.getElementById('ingredientList');
//     const newIngredient = document.createElement('input');
//     newIngredient.setAttribute('class', 'item');
//     ingredientContainer.appendChild(newIngredient);
// })

// //creating a variable submit button
// const submitButton = document.querySelector('#submit1');
// //adding eventListenerbutton default action
// submitButton.addEventListener('click', (event)=> {
//     event.preventDefault();
//     //creating variable for all ingredients
//     const ingredients = document.querySelectorAll('.item');
//     //setting an empty string
//     const itemString = '';
//     //concatenate empty string
//     ingredients.forEach(function(ingredient, index){
//         if(index === (ingredients.length-1)){
//             itemString = itemString.concat(`${ingredient.value}`);
//         } else {
//             itemString = itemString.concat(`${ingredient.value}`);
//         }
//     })
// //setting variable for hidden ingredients
// const ingredientInput = document.querySelector('#ingredients');
// //changing value ingredient input
// ingredientInput.value = `{${itemString}}`;
// //accessing value 
// const myForm = document.getElementById('input_form');
// //reinit submit button
// myForm.submit();
// })