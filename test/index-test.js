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

  context('you can create a new food from the index page', function(){
    xit('will reroute you to create a new food if button is clicked', function(){
      $('#add-food').click();
      var htmlPage = document.getElementById('index-frame').contentWindow.$(document)
      assert.include('iframe', '../foods.html')
    });
  });

  context('you can add foods to a meal table', function(){
    it('can check an item on the food table', function(){
      $(':checkbox').prop('checked', true);
      var checked = $(':checked').length;
      assert.equal(checked, 3)  
    });

    it('can add checked food to breakfast table', function(done){
      var foodTable = $('.all-food-table #food-row:first').text();
      assert.include(foodTable, 'banana');

      $('#food-row input:checkbox').prop('checked', true);
      $('#add-breakfast').click

      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var mealItem = $('#breakfast-table')
        assert.include(mealItem, 'turkey sandwich')
        assert.include(mealItem, 'taco')
      });
      done();
    });

    it('can add checked food to lunch table', function(done){
      var foodTable = $('.all-food-table #food-row:first').text();
      assert.include(foodTable, 'banana');

      $('#food-row input:checkbox').prop('checked', true);
      $('#add-lunch').click

      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var mealItem = $('#lunch-table')
        assert.include(mealItem, 'turkey sandwich')
        assert.include(mealItem, 'taco')
      });
      done();
    })

    it('can add checked food to snack table', function(done){
      var foodTable = $('.all-food-table #food-row:first').text();
      assert.include(foodTable, 'banana');

      $('#food-row input:checkbox').prop('checked', true);
      $('#add-snack').click

      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var mealItem = $('#snack-table')
        assert.include(mealItem, 'turkey sandwich')
        assert.include(mealItem, 'taco')
      });
      done()
    })

    it('can add checked food to dinner table', function(done){
      var foodTable = $('.all-food-table #food-row:first').text();
      assert.include(foodTable, 'banana');

      $('#food-row input:checkbox').prop('checked', true);
      $('#add-dinner').click

      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var mealItem = $('#dinner-table')
        assert.include(mealItem, 'turkey sandwich')
        assert.include(mealItem, 'taco')
      });
      done()
    })

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

  context('foods added to meal table will change calorie counts', function(){
    it('can calculate calories for all meal tables', function(){
      calculateAllMealCalories();
      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var snacks = $('#snack-table #calorie-diff').text();
        var dinner = $('#dinner-table #calorie-diff').text();
        var lunch = $('#lunch-table #calorie-diff').text();
        var breakfast = $('#breakfast-table #calorie-diff').text();
        assert.equal(breakfast, '400')
        assert.equal(lunch, '600')
        assert.equal(snacks, '200')
        assert.equal(dinner, '800')
      });
    });

    it('will update total calories if food is added to table', function(){
      var totalCalories = $('#snack-table .food-calories').text();
      assert.equal(totalCalories, '')

      $('#food-row:first input:checkbox').prop('checked', true);
      $('#add-lunch').click

      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var mealItem = $('#snack-table')
        assert.include(mealItem, 'banana')
        var totalCalories = $('#snack-table td.total-calories').text();
        assert.equal(totalCalories, '105')
      });
    });

    it('will update remaining calories in meal once food is added', function(){
      calculateAllMealCalories();
      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var remainingCalories = $('#snack-table #calorie-diff').text();
        assert.equal(remainingCalories, '200')

        $('#food-row:first input:checkbox').prop('checked', true);
        $('#add-lunch').click

        $('iframe').attr('src', '../index.html')
        document.getElementById('index-frame').contentWindow.$(document).ready(function(){
          var mealItem = $('#snack-table')
          assert.include(mealItem, 'banana')
          var leftCalories = $('#snack-table #calorie-diff').text();
          assert.equal(leftCalories, '95')
        });
      });
    });

    it('will change grand total calories when foods are added to meal table', function(){
      calculateAllMealCalories();
      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var totalCalories = $('.total-table #goal-total').text();
        assert.equal(totalCalories, '2000')

        $('#food-row:first input:checkbox').prop('checked', true);
        $('#add-lunch').click

        $('iframe').attr('src', '../index.html')
        document.getElementById('index-frame').contentWindow.$(document).ready(function(){
          var grandTotal = $('.total-table #goal-total').text();
          assert.equal(leftCalories, '1895')
        });
      });
    })
  });

  context('you can see the date in the date bar', function(){
    it('displays the current date on index.html', function(){
      var date = $('.current-day section').text();
      assert.include(date, '2017');
      assert.include(date, '03')
    });
  });

  context('deleting foods from meal table after adding', function() {
    it('will delete by row once foods are added to a meal table', function() {
      $('#food-row input:checkbox').prop('checked', true);
      $('#add-dinner').click

      $('#dinner-table tr:first #delete-food').click();
      $('iframe').attr('src', '../index.html')
      document.getElementById('index-frame').contentWindow.$(document).ready(function(){
        var tableData = $('#dinner-table').text();
        assert.include(tableData, 'turkey sandwich')
        assert.include(tableData, 'taco')
        assert.include(tableData, '185')
        assert.notInclude(tableData, 'banana')
        assert.notInclude(tableData, '105')
      });
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