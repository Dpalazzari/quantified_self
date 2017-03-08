$('document').ready(function() {
  // Add food
  $("#add-food").on('click', function(event) {
    event.preventDefault();
    console.log('Keep clicking that button, mayn...')
    var $foodName = $("#food-name").val();
    var $foodCalories = $("#calorie-count").val();
    var acceptFood = validAttributes($foodName, $foodCalories);
    if (validAttributes){
      $('#food-row').html("<td class='food-name'>" + $foodName + "</td><td class='food-calories'>" + $foodCalories + "</td>");
      // $('#food-row').html("<td class='food-calories'>" + $foodCalories + "</td>");
    }
    // $('#name-field .validation-error').html('Please Enter a Name');  
    // $('#calories-field .validation-error').html('Please Enter Calories');
  })
})

function validAttributes(food, calories){
  // trim makes sure to remove any excess white space that a user may unintentionally submit
  // or if the form is simply blank, will result in a 'null'
  if(food.trim() == ''){
    $('#name-field .validation-error').html('Please Enter a Name');
    return false;
  } else if (calories.trim() == ''){
    $('#calories-field .validation-error').html('Please Enter Calories');
    return false; 
  } else {
    return true;
  }
}