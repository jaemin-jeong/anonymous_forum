import crypto from 'crypto';

const getSalt = async () => {
  try {
    const buffer =  await crypto.randomBytes(64);
    return buffer.toString('base64');
  } catch (e) {
    return new Error(e);
  }
}

export const encrypt = async (string, salt) => {
  try {
    let incodingSalt = salt;
    if (!salt) {
      incodingSalt = await getSalt();
    };

    let derivedKey = crypto.pbkdf2Sync(string, incodingSalt, 100000, 64, 'sha512');
    return { pawssword: derivedKey.toString('base64'), salt: incodingSalt };
  } catch (e) {
    return new Error(e);
  }
}