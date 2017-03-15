// var time = moment();

$('document').ready(function() {
  // displayDate();
  // dateButtons();
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

  calculateGrandTotal();

  displayFoods();
})

// function dateButtons() {
//   $('.button#forward').on('click', function(){
//     time = time.add(1, 'day');
//     displayDate();
//   });

//   $('.button#back').on('click', function(){
//     time = time.add(-1, 'day');
//     displayDate();
//   });
// }

// function displayDate() {
//   $('.current-day section').html(time.format("dddd, MM Do YYYY"));
// }

// function getDay() {
//   var time = moment();
//   console.log(time);
//   $('.current-day section').html(time.day(1).format("dddd, MM Do YYYY"));

//   // $('.current-day section').on('click', function() {
//   //   $('.current-day section').html(time.day(1).format("dddd, MM Do YYYY"));
//   // });
//   $('button#forward').on('click', function() {
//     $('.current-day section').html(time.day(2).format("dddd, MM Do YYYY"));
//   });
//   $('button#back').on('click', function() {
//     $('.current-day section').html(time.day(0).format("dddd, MM Do YYYY"));
//   });
// };

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

function calculateGrandTotal(){
  var grandTotal     = 0
  var breakfastTotal = parseInt($('.breakfast-table-header').find('#total').text());
  var lunchTotal     = parseInt($('.lunch-table-header').find('#total').text());
  var dinnerTotal    = parseInt($('.dinner-table-header').find('#total').text());
  var snackTotal     = parseInt($('.snack-table-header').find('#total').text());
  grandTotal = grandTotal + breakfastTotal + lunchTotal + dinnerTotal + snackTotal
  var grandTotalCalories = $('.total-table').find('#grand-total');
  grandTotalCalories.text(grandTotal)
}