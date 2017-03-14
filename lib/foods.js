$('document').ready(function() {
  // Add food
  $("#add-food").on('click', function(event) {
    event.preventDefault();
    console.log('Keep clicking that button, mayn...')
    var $foodName = $("#food-name").val();
    var $foodCalories = $("#calorie-count").val();
    var acceptFood = validAttributes($foodName, $foodCalories);
    if (acceptFood){
      $('#food-table').prepend("<tr id='food-row'><td class='food-name'>" + $foodName.toLowerCase() + 
        "</td><td class='food-calories'>" + $foodCalories + 
        "</td><td class='food-delete'><button id='delete-food'>-</button></td></tr>");
      // Save food to localStorage
      // prepend localStorage to the table
      $('#food-name, #calorie-count').val("");
      storeFood($foodName, $foodCalories);
      // this is a line break 
    } else {
      console.log('One or both fields are not filled in...');
    }
  });

  function storeFood(name, calories) {
    var currentFoods = localStorage.getItem('foods');
    if (currentFoods === null) {
      var currentFoods = '[]';
    } 
      // localStorage.setItem('foods', '[]');
    var currentFoodsJSON = JSON.parse(currentFoods);
    var newFood = new SaveFood(name, calories);
    currentFoodsJSON.push(newFood);
    localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
  }
  // Edit food
  $("#food-list").on('click', 'td', function(){
    var $el = $(this);
    var $input = $('<input/>').val($el.text());
    $el.replaceWith($input);

    var save = function() {
      var $p = $("<td class='food-name' />").text( $input.val());
        $input.replaceWith($p);
    };
    $input.one('blur', save).focus();
  });
  // Delete food
  $("#food-list").on('click', '#delete-food', function(event){
    event.preventDefault();
    console.log("Deleted.");
    $(this).closest("tr").remove();
  });

  $('#filter-food').keyup(function(){
    console.log('I am typing things!');
    var rows = $('#food-list > tbody').find('tr').hide();
      if (this.value.length) {
        var data = this.value.toLowerCase().split(" ");
        $.each(data, function(i, v) {
          rows.filter(":contains('" + v + "')").show();
        });
      } else rows.show()
  });
  displayFoods();
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
function SaveFood(name, calories){
  this.name = name;
  this.calories = calories;
}

function displayFoods() {
  var foods = JSON.parse(localStorage.getItem('foods'));
  if(foods != null) {
    foods.forEach(function(element){
    $('#food-table').prepend("<tr id='food-row'><td class='food-name'>" + element.name.toLowerCase() + 
        "</td><td class='food-calories'>" + element.calories + 
        "</td><td class='food-delete'><button id='delete-food'>-</button></td></tr>");
      });   
  }
}
