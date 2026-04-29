name: Sync LoL Esports Results

on:
  schedule:
    # Toutes les heures entre 15h et 23h UTC (17h-01h heure fr) les jours de match
    - cron: '0 15-23 * * *'
  workflow_dispatch: # Permet de lancer manuellement

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install @supabase/supabase-js
      - run: node scripts/sync-esports.js
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_KEY: ${{ secrets.SUPABASE_KEY }}
