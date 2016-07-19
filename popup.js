document.addEventListener('DOMContentLoaded', function() {

  var submit = document.getElementById("addAmount");
  var total = document.getElementById("total");
  var amount = document.getElementById("amount");

  chrome.storage.sync.get('total', function(items) {
    total.innerHTML = items.total;
  })
  
  submit.addEventListener('click', function() {
    chrome.storage.sync.get('total', function(items) {
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
    });  
  });

});