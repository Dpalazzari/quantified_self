$('document').ready(function() {
  // Add food
  $("#add-food").on('click', function(event) {
    event.preventDefault();
    console.log('Keep clicking that button, mayn...')
    var $foodName = $("#food-name").val();
    var $foodCalories = $("#calorie-count").val();
    var acceptFood = validAttributes($foodName, $foodCalories);
    if (acceptFood){
      console.log('Both fields are true!');
      $('#food-table').prepend("<tr id='food-row'><td class='food-name'>" + $foodName + 
        "</td><td class='food-calories'>" + $foodCalories + 
        "</td><td class='food-delete'><button id='delete-food'>-</button></td></tr>");
      $('#food-name, #calorie-count').val("");
    } else {
      console.log('One or both fields are not filled in...');
    }
  });

  // Delete food
  $("#food-list").on('click', 'button', function(event){
    event.preventDefault();
    console.log("Deleted.");
    $(this).closest("tr").remove();
    // Search is tricky. Make sure to format the prepend well enough that 
    // it's nested TR and the TD inside. 
    // For searching your gonna search the tbody for all TRs and filter() each
    // Also use .hide() and .show()
  });

  $('#filter-food').keyup(function(){
    console.log('I am typing things!');
    console.log(this.value.length);
    // Search the table body for all table rows containing #filter-food data

  });
});

function validAttributes(food, calories){
  // trim makes sure to remove any excess white space that a user may unintentionally submit
  // or if the form is simply blank, will result in a 'null'
  if(food.trim() == ''){
    $('#name-field .validation-error').html('Please Enter a Name');
    $('#calories-field .validation-error').html('');
    return false;
  } else if (calories.trim() == ''){
      $('#calories-field .validation-error').html('Please Enter Calories');
      $('#name-field .validation-error').html('');
      return false; 
  } else {
      $('#calories-field .validation-error').html('');
      $('#name-field .validation-error').html('');
      return true;
  } 
}