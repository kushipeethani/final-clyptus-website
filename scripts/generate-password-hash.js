#!/usr/bin/env node
import crypto from 'crypto';

const password = process.argv[2];

if (!password) {
  console.log('Usage: node scripts/generate-password-hash.js <password>');
  console.log('Example: node scripts/generate-password-hash.js "MyNewSecurePass123!"');
  process.exit(1);
}

const salt = crypto.randomBytes(16).toString('hex');
const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');

console.log('\n=== Clyptus Password Hash Generator ===');
console.log('Generated Salt (save to environment variable AUTH_*_SALT):');
console.log(salt);
console.log('\nGenerated Hash (save to environment variable AUTH_*_HASH):');
console.log(hash);
console.log('\nExample .env configuration for Clyptus account:');
console.log(`AUTH_CLYPTUS_SALT=${salt}`);
console.log(`AUTH_CLYPTUS_HASH=${hash}`);
console.log('\nExample .env configuration for Audit account:');
console.log(`AUTH_AUDIT_SALT=${salt}`);
console.log(`AUTH_AUDIT_HASH=${hash}`);
console.log('========================================\n');
