const crypto = require("crypto")

const encryptionPassword = (password) => {
  const sha256 = crypto.createHash("sha256")
  const result = sha256.update(String(password)).digest("hex")
  return result
}

module.exports = {
  encryptionPassword,
}