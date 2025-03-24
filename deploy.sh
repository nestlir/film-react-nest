#!/bin/bash

echo "🚀 DEPLOY STARTED..."

# Перейти в проект
cd ~/film-react-nest || { echo "❌ Папка ~/film-react-nest не найдена"; exit 1; }

# Обновить код
echo "📥 Pulling latest changes from GitHub..."
git fetch origin
git reset --hard origin/review-3

# Сборка и запуск
echo "🐳 Building Docker images..."
docker compose down -v
docker compose build --no-cache
docker compose up -d

echo "✅ DONE! Проект успешно обновлён и запущен."
