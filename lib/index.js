var time;
// Document ready starts here!
$('document').ready(function() {
  time = moment();
  deleteFood();
  displayDate();
  dateButtons();
  filterFood();
  addFoodToMealTable();
  calculateAllTotals();
  calculateAllMealCalories();
  calculateGrandTotal();
  calculateRemainingCalories();
  displayFoods();
})
// Document ready ends here!
function filterFood(){
  $('#filter-food').keyup(function(){
    var rows = $('.all-food-table > tbody').find('tr').hide();
    if (this.value.length) {
      doBlackMagic(this, rows)
    } else rows.show()
  });
}

function doBlackMagic(self, rows){
  var data = self.value.toLowerCase().split(" ");
  $.each(data, function(i, v) {
    rows.filter(":contains('" + v + "')").show();
  });
}

function addFoodToMealTable(){
  prependCheckedFood('button#add-breakfast', '#breakfast-table', 400);
  prependCheckedFood('button#add-lunch', '#lunch-table', 600);
  prependCheckedFood('button#add-dinner', '#dinner-table', 800);
  prependCheckedFood('button#add-snacks', '#snack-table', 200);
}

function calculateAllTotals(){
  calculateCalorieTotal(('.breakfast-table-header'));
  calculateCalorieTotal(('.lunch-table-header'));
  calculateCalorieTotal(('.snack-table-header'));
  calculateCalorieTotal(('.dinner-table-header'));
}

function calculateAllMealCalories(){
  calculateMealCalories('.breakfast-table-header', 400);
  calculateMealCalories('.lunch-table-header', 600);
  calculateMealCalories('.snack-table-header', 200);
  calculateMealCalories('.dinner-table-header', 800);
}

function deleteFood(){
  $(".table-head").on('click', '#delete-food', function(event){
    event.preventDefault();
    var row      = $(this).closest("tr")
    row.remove();
    afterDeleteFood();
  });
}

function afterDeleteFood(){
  calculateAllTotals();
  calculateAllMealCalories();
  calculateGrandTotal();
  calculateRemainingCalories();
}

function dateButtons() {
  addDay();
  backDay();
}

function addDay(){
  $('button#forward').on('click', function(){
    time = time.add(1, 'day');
    displayDate();
  });
}

function backDay(){
  $('button#back').on('click', function(){
    time = time.add(-1, 'day');
    displayDate();
  });
}

function displayDate() {
  $('.current-day section').html(time.format("dddd, MM Do YYYY"));
}

function displayFoods(){
  var foods = JSON.parse(localStorage.getItem('foods'));
  if(foods != null){
    foods.forEach(function(element){
      prependFood(element.name, element.calories)
    })
  }
}

function prependFood(name, calories){
  $('#food-table').prepend("<tr id='food-row'><td class='selected'><input type='checkbox'></td><td class='food-name'>" + name.toLowerCase() + 
    "</td><td class='food-calories'>" + calories + "</tr>");
}

function calculateCalorieTotal(table){
  var rows   = $(table).find('thead > #food-row');
  var total  = 0;
  $.each(rows, function(){
    var number = parseInt($(this).find('.food-calories').text());
    total      = total + number   
  });
  var totalCalories = $(table).find('#total');
  totalCalories.text(total);
}

function calculateGrandTotal(){
  var total     = 0
  var grandTotal = mealTableTotals(total);
  var grandTotalCalories = $('.total-table').find('#grand-total');
  grandTotalCalories.text(grandTotal)
}

function mealTableTotals(total){
  total = total + breakfastTotal() + lunchTotal() + dinnerTotal() + snackTotal()
  return total
}

function breakfastTotal(){
  return parseInt($('.breakfast-table-header').find('#total').text());
}

function lunchTotal(){
  return parseInt($('.lunch-table-header').find('#total').text());
}

function dinnerTotal(){
  return parseInt($('.dinner-table-header').find('#total').text());
}

function snackTotal(){
  return parseInt($('.snack-table-header').find('#total').text());
}

function calculateRemainingCalories(){
  var goalCalories       = parseInt($('.total-table').find('#goal-total').text());
  var grandTotalCalories = parseInt($('.total-table').find('#grand-total').text());
  var remainingCalories  = goalCalories - grandTotalCalories
  var finalRemainingCalories = $('.total-table').find('#remaining');
  finalRemainingCalories.text(remainingCalories)
  changeClassType(remainingCalories, finalRemainingCalories)
}

function calculateMealCalories(table, calories){
  var total      = parseInt($(table).find('#total').text());
  var finalTotal = calories - total
  var remainingCalories = $(table).find('#calorie-diff')
  remainingCalories.text(finalTotal)
  changeClassType(finalTotal, remainingCalories)
}

function changeClassType(total, htmlElement){
  if(total < 0){
    htmlElement.removeClass('positive').addClass('negative')
  } else if(total >= 0 ){
    htmlElement.removeClass('negative').addClass('positive')
  }
}

function prependCheckedFood(button, mealTable, totalCalories){
  $(button).on('click', function(){
    var rows = $('.all-food-table').find('#food-row input:checked')
    $.each(rows, function(){
      var attrs = obtainAttributes(this)
      appendFood(mealTable, attrs.food, attrs.calories)
      $(this).prop('checked', false);
    });
    var specificTable = formatTable(mealTable)
    updateTotalCounts(specificTable, totalCalories)
  });
}

function obtainAttributes(row){
  var attributes = $(row).closest('tr')
  var food     = attributes.children('.food-name').text()
  var calories = attributes.children('.food-calories').text()
  return {'food': food, 'calories': calories}
}

function formatTable(table){
  var Table = table + '-header'
  var newTable = Table.replace('#', '.')
  return newTable
}

function appendFood(table, food, calories){
  $(table).append("<tr id='food-row'><td class='food-name'>" + food + 
    "</td><td class='food-calories'>" + calories + "<td class='food-delete'>" +
    "<button id='delete-food'>-</button></td></tr>")
    createMealStorage(food, calories, table);
  // Save localStorage by DAY and by mealTable
  // Somehow localStorage will be named and accessed only by the TIME
  // I think this is where we would create the localStorage item
}

function createMealStorage(name, calories, table){
  // storageTime = time.format("dddd, MMMM do YYYY")
  // var currentMeals = localStorage.getItem(storageTime)
  // if(currentMeals === null){
  //   var currentMeals = '{}'
  //   currentMeals = { 'breakfast': '[]',
  //                 'lunch': '[]',
  //                 'dinner': '[]',
  //                 'snack': '[]'}
  //   localStorage.setItem(storageTime, JSON.stringify(currentMeals))
  // }
  var mealFood = new Food(name, calories)
  if(table === "#breakfast-table"){
    breakfastTable(mealFood);
  } else if(table === '#lunch-table'){
    lunchTable(mealFood);
  } else if(table === '#dinner-table'){
    dinnerTable(mealFood);
  } else if(table === '#snack-table'){
    snackTable(mealFood);
  }
}

function breakfastTable(food){
  var storageTime = time.format("dddd, MMMM do YYYY") + '-breakfast'
  var currentMeal = localStorage.getItem(storageTime)
  if(currentMeal === null){
    var currentMeal = '[]'
  }
  var currentMealJSON = JSON.parse(currentMeal);
  currentMealJSON.push(food);
  localStorage.setItem(storageTime, JSON.stringify(currentMealJSON));
}

function Food(name, calories){
  this.name = name;
  this.calories = calories;
}

function updateTotalCounts(table, calories){
  calculateCalorieTotal(table);
  calculateMealCalories(table, calories);
  calculateGrandTotal();
  calculateRemainingCalories();
}
