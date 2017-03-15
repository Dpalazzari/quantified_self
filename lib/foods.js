$('document').ready(function() {
  // Add food
  $('#add-food').on('click', function(event) {
    event.preventDefault();
    var foodName = $('#food-name').val();
    var foodCalories = $('#calorie-count').val();
    var acceptFood = validAttributes(foodName, foodCalories);
    if (acceptFood){
      prependFood(foodName, foodCalories)
      $('#food-name, #calorie-count').val('');
      storeFood(foodName, foodCalories);
    }
  });

  function storeFood(name, calories) {
    var currentFoods = localStorage.getItem('foods');
    if (currentFoods === null) {
      var currentFoods = '[]';
    } 
    var currentFoodsJSON = JSON.parse(currentFoods);
    var saveFood = new Food(name, calories);
    currentFoodsJSON.push(saveFood);
    localStorage.setItem('foods', JSON.stringify(currentFoodsJSON));
  }

  // Edit food name
  $('#food-list').on('click', '.food-name', function(){
    var element = $(this);
    var input = $('<input/>').val(element.text());
    editAttributes(element, input)
    // var foods = JSON.parse(localStorage.getItem('foods'));
    // var editedFood = $.grep(foods, function(food) {
    //   return food === input; 
    // });
    // foods = $.grep(foods, function(not){
    //   return not != editedFood;
    // });
    // foods.push(editedFood);
    // localStorage.setItem('foods', JSON.stringify(foods));
    // input.parent().remove();
    // Need to edit individual data.name in localStorage
  });

  // Edit food calories
  $('#food-list').on('click', '.food-calories', function(){
    var element = $(this);
    var input = $('<input/>').val(element.text());
    editAttributes(element, input)
    // Need to edit individual data.calories in localStorage
  });

  // Delete food
  $('#food-list').on('click', '#delete-food', function(event){
    event.preventDefault();
    var row      = $(this).closest('tr')
    var foodName = row[0].firstElementChild.innerHTML
    var allFood  = JSON.parse(localStorage.getItem('foods'))
    row.remove();
    for (var i = 0; i< allFood.length; i++) {
      var food = allFood[i];
      if (food.name.toLowerCase() === foodName) {
        allFood.splice(i, 1);
      }
    }
    var newFoods = JSON.stringify(allFood)
    localStorage.setItem('foods', newFoods)
  });

  $('#filter-food').keyup(function(){
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

function Food(name, calories){
  this.name = name;
  this.calories = calories;
}

function prependFood(name, calories){
  $('#food-table').prepend("<tr id='food-row'><td class='food-name'>" + name.toLowerCase() + 
      "</td><td class='food-calories'>" + calories + 
      "</td><td class='food-delete'><button id='delete-food'>-</button></td></tr>");
}

function editAttributes(self, input){
  self.replaceWith(input);
    var save = function() {
    if(self[0].className === 'food-name'){
      var newInput = $("<td class='food-name' />").text( input.val());
        input.replaceWith(newInput);
    } else if(self[0].className === 'food-calories'){
      var newInput = $("<td class='food-calories' />").text( input.val());
        input.replaceWith(newInput);
      }
    };
  input.one('blur', save).focus();
}

function displayFoods() {
  var foods = JSON.parse(localStorage.getItem('foods'));
  if(foods != null) {
    foods.forEach(function(element){  
    prependFood(element.name, element.calories)
  })
 }
}
