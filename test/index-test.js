describe('#create-form', function() {
  var $;

  before(function(){
    $ = document.getElementById('index-frame').contentWindow.$;
  });

  beforeEach(function(){
    localStorage.clear();
    localStorage.setItem('foods', '[{"name": "turkey sandwich", "calories": "185"}, {"name": "taco", "calories": "155"}, {"name": "banana", "calories": "105"}]')
  })

  context('the four meal tables display on the page', function(){
    it('displays all of the meal tables', function(){
      var breakfastTable = $('#breakfast-table')
      var lunchTable = $('#lunch-table')
      var dinnerTable = $('#dinner-table')
      var snackTable = $('#snack-table')

      assert.isObject(breakfastTable, 'is a table')
      assert.isObject(lunchTable, 'is a table')
      assert.isObject(dinnerTable, 'is a table')
      assert.isObject(snackTable, 'is a table')
    });
  });

  context('you can add foods to a meal table', function(){
    it('can add checked food to meal table', function(){
      var foodTable = $('.all-food-table #food-row:first').text();
      assert.include(foodTable, 'banana');

      $('#food-row input:checkbox').prop('checked', true);
      $('#add-breakfast').click

      var mealItem = $('#breakfast-table tbody').text();
      assert.include(mealItem, 'turkey sandwich');
    });

    it('can add a food to meal table and it persists', function(){
      $('#food-row input:checkbox').prop('checked', true);
      $('#add-breakfast').click

      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var mealItem = $('#breakfast-table')
        assert.include(mealItem, 'turkey sandwich')
        assert.include(mealItem, 'taco')
      });
    });
  });

  context('you can see the date in the date bar', function(){
    it('displays the current date on index.html', function(){
      var date = $('.current-day section').text();
      assert.include(date, '2017');
      assert.include(date, '03')
    });
  });

  context('deleting foods from table', function() {
    xit('with one food, it will delete the food row', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('105');
      $('#add-food').click();
      var foodData = "banana105-"

      var tableData = $("tbody").text();
      assert.equal(tableData, foodData);

      $('#delete-food').click();

      var tableData = $("tbody").html();

      assert.equal(tableData, "");
    });

    xit('with many foods, it will delete the first food row', function() {
       var foodData = "pineapple452-banana105-"

      var tableData = $("tbody").text();
      assert.equal(tableData, foodData);

      $('#delete-food').click();

      var tableData = $("tbody").text();

      assert.equal(tableData, "banana105-");
    });
  });

  context('foods added to localStorage exist in all-food-table', function(){
    it('previously added foods will be loaded from localStorage', function(){
      var persistedFoods = localStorage.getItem('foods');

      assert.isString(persistedFoods, 'localStorage is a string of values');
      assert.include(persistedFoods, 'turkey sandwich');
      assert.include(persistedFoods, 'banana');
      assert.include(persistedFoods, '185');
    });
  });

  context('index.js functions', function(){
    it('knows about our functions', function(){
     assert.isFunction(addFoodToMealTable, 'this will add foods to meal tables')
     assert.isFunction(calculateAllTotals, 'this calculates total calories')
     assert.isFunction(calculateAllMealCalories, 'this calculates meal calories')
     assert.isFunction(calculateGrandTotal, 'this calculates the calories for a whole day')
     assert.isFunction(calculateRemainingCalories, 'this calculates remaining calories')
     assert.isFunction(displayDate, 'this displays the date')
     assert.isFunction(displayFoods, 'this shows foods')
    });
  });
});