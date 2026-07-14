#!/bin/bash

echo "🚀 نصب AZ VPN - پنل مدیریت پیشرفته"
echo "====================================="

# بررسی وجود Docker
if ! command -v docker &> /dev/null; then
    echo "❌ Docker نصب نیست! لطفاً اول Docker را نصب کنید."
    exit 1
fi

# ساخت فایل‌های مورد نیاز
echo "📁 ایجاد ساختار پروژه..."
mkdir -p backend/app/{api/v1/endpoints,core,models,schemas,services}
mkdir -p frontend/app/{\(auth\),\(dashboard\)}
mkdir -p frontend/components/{ui,charts,layout}
mkdir -p nginx/ssl

# نصب وابستگی‌ها
echo "📦 نصب پکیج‌های Python..."
cd backend
cat > requirements.txt << 'EOF'
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
asyncpg==0.29.0
pydantic==2.5.3
pydantic-settings==2.1.0
python-jose[cryptography]==3.3.0
passlib[bcrypt]==1.7.4
python-multipart==0.0.6
redis==5.0.1
celery==5.3.4
python-dotenv==1.0.0
email-validator==2.1.0
EOF

cd ..

echo "📦 نصب پکیج‌های Node.js..."
cd frontend
cat > package.json << 'EOF'
{
  "name": "az-vpn-frontend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.0.4",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.5",
    "@tanstack/react-query": "^5.17.1",
    "recharts": "^2.10.3",
    "framer-motion": "^10.17.0",
    "tailwindcss": "^3.3.6",
    "lucide-react": "^0.309.0",
    "sonner": "^1.4.0"
  },
  "devDependencies": {
    "@types/node": "^20.10.5",
    "@types/react": "^18.2.45",
    "@types/react-dom": "^18.2.18",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "typescript": "^5.3.3"
  }
}
EOF
cd ..

# اجرای Docker Compose
echo "🐳 اجرای Docker Compose..."
docker-compose up -d

echo ""
echo "✅ AZ VPN با موفقیت نصب شد!"
echo "🌐 دسترسی به:"
echo "   - Frontend: http://localhost:3000"
echo "   - Backend API: http://localhost:8000"
echo "   - API Docs: http://localhost:8000/docs"
echo ""
echo "📝 کاربر پیش‌فرض: admin@azvpn.com / Admin123!"