import { buildOrder, inferMenuItem, listMenu } from './tools.js';

export class RestaurantAgent {
  constructor() {
    this.state = {
      stage: 'welcome',
      items: []
    };
  }

  respond(text = '') {
    const message = text.toLowerCase().trim();

    if (this.state.stage === 'welcome') {
      this.state.stage = 'ordering';
      return `Bonjour 👋 Que souhaitez-vous commander ? Voici notre menu: ${listMenu()}.`;
    }

    if (message.includes('menu')) {
      return `Bien sûr. ${listMenu()}.`;
    }

    const item = inferMenuItem(message);
    if (item) {
      this.state.items.push(item);
      const order = buildOrder(this.state.items);
      return `C'est noté: ${order.items.map((i) => i.label).join(', ')}. Total provisoire: ${order.total}€. Souhaitez-vous autre chose ?`;
    }

    if (message.includes('terminé') || message.includes('valider') || message.includes('c\'est tout')) {
      const order = buildOrder(this.state.items);
      if (!order.items.length) {
        return 'Je n\'ai pas encore d\'article dans la commande. Que souhaitez-vous ?';
      }

      this.state.stage = 'confirming';
      return `Parfait. Je récapitule: ${order.items.map((i) => i.label).join(', ')}. Total ${order.total}€. Merci de confirmer l'adresse de livraison.`;
    }

    if (this.state.stage === 'confirming') {
      this.state.stage = 'done';
      return `Merci, la commande est enregistrée ✅. Un restaurateur vous rappelle si besoin.`;
    }

    return 'Je peux vous aider à commander. Dites un article du menu ou "menu" pour voir les options.';
  }
}
