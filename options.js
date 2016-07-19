document.addEventListener('DOMContentLoaded', function() {

  var goal = document.getElementById('goal');
  var saveButton = document.getElementById('save');
  var resetButton = document.getElementById('reset');

  chrome.storage.sync.get('goal', function(items) {
    if (items.goal) {
      goal.value = items.goal;
    }
  });

  save.addEventListener('click', function() {

    var goalVal = goal.value;
    if (goalVal) {
      chrome.storage.sync.set({ 'goal': goalVal }, function() {
        close();
      });
    }
  });

  reset.addEventListener('click', function() {
    chrome.storage.sync.set({ 'total': 0 }, function() {
      var opt = {
        type: "basic",
        title: "Total reset",
        message: "Total has been reset to 0",
        iconUrl: "icon.png"
      }

      chrome.notifications.create('reset', opt, function() {});
    });
  });

});