const MENU = {
  pizza: { label: 'Pizza margherita', price: 12 },
  burger: { label: 'Burger maison', price: 14 },
  salade: { label: 'Salade césar', price: 10 },
  eau: { label: 'Eau minérale', price: 3 },
  coca: { label: 'Coca cola', price: 4 }
};

export function listMenu() {
  return Object.entries(MENU)
    .map(([id, item]) => `${id}: ${item.label} (${item.price}€)`)
    .join(', ');
}

export function buildOrder(items) {
  const normalized = items
    .filter((id) => MENU[id])
    .map((id) => ({ id, ...MENU[id] }));

  const total = normalized.reduce((sum, item) => sum + item.price, 0);

  return {
    items: normalized,
    total
  };
}

export function inferMenuItem(text) {
  const lowered = text.toLowerCase();
  return Object.keys(MENU).find((key) => lowered.includes(key));
}
