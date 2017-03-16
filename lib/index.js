var time = moment();

$('document').ready(function() {
    displayDate();
    dateButtons();
    $('#filter-food').keyup(function(){
      var rows = $('.all-food-table > tbody').find('tr').hide();
      if (this.value.length) {
        var data = this.value.toLowerCase().split(" ");
        $.each(data, function(i, v) {
          rows.filter(":contains('" + v + "')").show();
        });
      } else rows.show()
    });

  $('button#add-breakfast').on('click', function(){
    var rows = $('.all-food-table').find('#food-row input:checked')
    $.each(rows, function(){
      var attributes = $(this).closest('tr')
      var food = attributes.children('.food-name').text()
      var calories = attributes.children('.food-calories').text()
      $('#breakfast-table').prepend("<tr id='food-row'><td class='food-name'>" + food + 
    "</td><td class='food-calories'>" + calories + "<td class='food-delete'><button id='delete-food'>-</button></td></tr>")
    });
  });

  $('button#add-lunch').on('click', function(){
    var rows = $('.all-food-table').find('#food-row input:checked')
    $.each(rows, function(){
      var attributes = $(this).closest('tr')
      var food = attributes.children('.food-name').text()
      var calories = attributes.children('.food-calories').text()
      $('#lunch-table').prepend("<tr id='food-row'><td class='food-name'>" + food + 
    "</td><td class='food-calories'>" + calories + "<td class='food-delete'><button id='delete-food'>-</button></td></tr>")
    });
  });

  $('button#add-dinner').on('click', function(){
    var rows = $('.all-food-table').find('#food-row input:checked')
    $.each(rows, function(){
      var attributes = $(this).closest('tr')
      var food = attributes.children('.food-name').text()
      var calories = attributes.children('.food-calories').text()
      $('#dinner-table').prepend("<tr id='food-row'><td class='food-name'>" + food + 
    "</td><td class='food-calories'>" + calories + "<td class='food-delete'><button id='delete-food'>-</button></td></tr>")
    });
  });

   $('button#add-snacks').on('click', function(){
    var rows = $('.all-food-table').find('#food-row input:checked')
    $.each(rows, function(){
      var attributes = $(this).closest('tr')
      var food = attributes.children('.food-name').text()
      var calories = attributes.children('.food-calories').text()
      $('#snack-table').prepend("<tr id='food-row'><td class='food-name'>" + food + 
    "</td><td class='food-calories'>" + calories + "<td class='food-delete'><button id='delete-food'>-</button></td></tr>")
    });
  });

  displayFoods();
})

function dateButtons() {
  $('.button#forward').on('click', function(){
    time = time.add(1, 'day');
    displayDate();
  });

  $('.button#back').on('click', function(){
    time = time.add(-1, 'day');
    displayDate();
  });
}

function displayDate() {
  $('.current-day section').html(time.format("dddd, MM Do YYYY"));
}

function getDay() {
  var time = moment();
  $('.current-day section').html(time.day(1).format("dddd, MM Do YYYY"));

  $('.current-day section').on('click', function() {
    $('.current-day section').html(time.day(1).format("dddd, MM Do YYYY"));
  });
  $('button#forward').on('click', function() {
    $('.current-day section').html(time.day(2).format("dddd, MM Do YYYY"));
  });
  $('button#back').on('click', function() {
    $('.current-day section').html(time.day(0).format("dddd, MM Do YYYY"));
  });
};

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