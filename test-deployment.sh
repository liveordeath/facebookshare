#!/bin/bash

echo "🚀 Testing deployment configuration..."

# Check if all required files exist
echo "📁 Checking required files..."
files=(
  "package.json"
  "next.config.js" 
  "vercel.json"
  "app/api/config/route.ts"
  "config-data.json"
)

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "✅ $file exists"
  else
    echo "❌ $file missing"
    exit 1
  fi
done

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build successful"
else
  echo "❌ Build failed"
  exit 1
fi

# Test API locally
echo "🌐 Testing API..."
npm run dev &
DEV_PID=$!

# Wait for server to start
sleep 5

# Test API endpoint
curl -s http://localhost:3000/api/config > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ API endpoint working"
else
  echo "❌ API endpoint failed"
  kill $DEV_PID
  exit 1
fi

# Cleanup
kill $DEV_PID

echo "🎉 All tests passed! Ready for Vercel deployment."
echo ""
echo "📋 Next steps:"
echo "1. Push code to GitHub"
echo "2. Connect to Vercel"
echo "3. Deploy automatically"
echo ""
echo "🔗 Vercel: https://vercel.com"
