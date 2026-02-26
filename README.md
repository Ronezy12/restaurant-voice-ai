# Restaurant Voice AI (MVP)

Prototype d'assistant conversationnel pour aider un restaurateur à prendre des commandes rapidement.

## Ce que fait ce MVP
- Serveur HTTP + WebSocket.
- Agent conversationnel simple (français) orienté prise de commande.
- Menu local + total automatique.
- Base de schéma SQL prête pour persistance.

## Démarrage
```bash
npm install
npm start
```

Puis ouvrir une connexion WebSocket sur `ws://localhost:3000/ws` et envoyer:
```json
{"text":"Je veux une pizza"}
```

## Prochaines étapes conseillées
1. Brancher STT/TTS (Twilio, Deepgram, ElevenLabs, etc.).
2. Ajouter une vraie base de données + dashboard live.
3. Ajouter paiement + CRM + notifications cuisine.
