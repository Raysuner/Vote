import crypto from "crypto";

export const encryptionPassword = (password: string) => {
  const sha256 = crypto.createHash("sha256");
  const result = sha256.update(String(password)).digest("hex");
  return result;
};
