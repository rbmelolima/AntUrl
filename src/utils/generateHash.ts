import crypto from 'crypto';

export default function generateHash(): string {
  const newHash = crypto.randomBytes(3).toString('hex');
  return newHash;
}