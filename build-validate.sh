#!/bin/bash

# Build validation script
echo "🔍 Running TypeScript type check..."
npm run type-check

if [ $? -ne 0 ]; then
  echo "❌ TypeScript check failed"
  exit 1
fi

echo "✅ TypeScript check passed"

echo "🔍 Running ESLint..."
npm run lint

if [ $? -ne 0 ]; then
  echo "⚠️ ESLint warnings found (non-blocking)"
fi

echo "🔨 Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed"
  exit 1
fi

echo "✅ Build completed successfully"
echo "🚀 Ready for deployment!"
