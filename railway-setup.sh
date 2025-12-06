#!/bin/bash
# Railway Setup Script
# Creates necessary directories and sets permissions

echo "🚀 Setting up Railway environment..."

# Create upload directories
mkdir -p uploads/equipment
mkdir -p uploads/profile
mkdir -p uploads/payment_proof
mkdir -p logs

# Set permissions
chmod 755 uploads
chmod 755 uploads/equipment
chmod 755 uploads/profile
chmod 755 uploads/payment_proof
chmod 755 logs

echo "✅ Directories created:"
echo "   - uploads/equipment"
echo "   - uploads/profile"
echo "   - uploads/payment_proof"
echo "   - logs"

# Check if database config exists
if [ -f "api/config/database.php" ]; then
    echo "✅ Database config found"
else
    echo "❌ Database config NOT found!"
fi

# Check if CORS config exists
if [ -f "api/config/cors.php" ]; then
    echo "✅ CORS config found"
else
    echo "❌ CORS config NOT found!"
fi

echo ""
echo "📋 Railway Environment Variables Needed:"
echo "   MYSQLHOST=your_mysql_host"
echo "   MYSQLPORT=3306"
echo "   MYSQLDATABASE=your_database_name"
echo "   MYSQLUSER=your_username"
echo "   MYSQLPASSWORD=your_password"
echo ""
echo "🎯 Next steps:"
echo "   1. Set environment variables in Railway dashboard"
echo "   2. Deploy to Railway"
echo "   3. Test API endpoint: https://your-domain.railway.app/api/public/equipment.php"
echo ""
