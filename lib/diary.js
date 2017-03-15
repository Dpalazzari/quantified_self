$('document').ready(function() {
    $('#filter-food').keyup(function(){
      var rows = $('.all-food-table > tbody').find('tr').hide();
      if (this.value.length) {
        var data = this.value.toLowerCase().split(" ");
        $.each(data, function(i, v) {
          rows.filter(":contains('" + v + "')").show();
        });
      } else rows.show()
    });
    calculateSnackTotal(('.breakfast-table-header'));
    calculateSnackTotal(('.lunch-table-header'));
    calculateSnackTotal(('.snack-table-header'));
    calculateSnackTotal(('.dinner-table-header'));
    displayFoods();
});

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

function calculateSnackTotal(table){
  var rows = $(table).find('thead > #food-row');
  var total  = 0;

  $.each(rows, function(){
    var number = parseInt($(this).find('.food-calories').text());
    total      = total + number   
  });
  var totalCalories = $(table).find('#total');
  totalCalories.text(total);
}