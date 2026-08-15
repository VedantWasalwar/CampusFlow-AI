const jwt = require('jsonwebtoken');

const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || 'campusflow_ai_super_secret_jwt_key_2026_production',
    { expiresIn: '30d' }
  );
};

module.exports = generateToken;
