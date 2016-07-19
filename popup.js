document.addEventListener('DOMContentLoaded', function() {

  var submit = document.getElementById("addAmount");
  var total = document.getElementById("total");
  var goal = document.getElementById("goal");
  var amount = document.getElementById("amount");

  chrome.storage.sync.get(['goal', 'total'], function(items) {
    total.innerHTML = items.total;
    goal.innerHTML = items.goal;
  })
  
  submit.addEventListener('click', function() {
    chrome.storage.sync.get(['goal', 'total'], function(items) {
      var newTotal = 0;

      if (items.total) {
        newTotal += parseInt(items.total);
      }

      var amountVal = amount.value;
      if (amountVal) {
        newTotal += parseInt(amountVal);
      }

      chrome.storage.sync.set({ 'total': newTotal });
      total.innerHTML = newTotal;
      amount.value = '';

      if (newTotal >= items.goal) {
        var opt = {
          type: "basic",
          title: "Goal reached!",
          message: "Congratulations! You've reached your protein goal for today!",
          iconUrl: "icon.png"
        }
        chrome.notifications.create('success', opt, function() {});
      }
    });  
  });

});