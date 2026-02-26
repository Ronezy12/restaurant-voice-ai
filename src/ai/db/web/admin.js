const ordersEl = document.getElementById('orders');

ordersEl.innerHTML = '';
['#1034 - en préparation', '#1033 - livré'].forEach((label) => {
  const li = document.createElement('li');
  li.textContent = label;
  ordersEl.append(li);
});
