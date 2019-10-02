import {
  createWallet,
  isPrivateKey,
  isAddress,
  isValidPassword,
  signMessage,
  createSecret,
  decryptSecret
} from "./auth-helpers";

// Make crypto object used in encryption helpers available to test suite
const crypto = require("crypto");
Object.defineProperty(global.self, "crypto", {
  value: {
    getRandomValues: arr => crypto.randomBytes(arr.length)
  }
});

describe("Auth helpers", () => {
  it("Can verify if an ethereum address is valid", () => {
    const address = "0xC41aD670CE88aD9D198e25B8A0A22227f7513F42";

    expect(isAddress(address)).toBe(true);
  });

  it("Can verify if an ethereum address is invalid", () => {
    const address = "this_is_not_an_address";

    expect(isAddress(address)).toBe(false);
  });

  it("Can verify if an ethereum private key is valid", () => {
    const privateKey =
      "0x4b5279522ef5b9424b40780250baae310ebfade1be7174536a317a79a35f5658";

    expect(isPrivateKey(privateKey)).toBe(true);
  });

  it("Can verify if an ethereum private key is invalid", () => {
    const privateKey = "this_is_not_a_valid_private_key";

    expect(isPrivateKey(privateKey)).toBe(false);
  });

  it("Can create a wallet that holds a valid ethereum private key", () => {
    const wallet = createWallet();

    expect(isPrivateKey(wallet.privateKey)).toBe(true);
  });

  it("Can create a wallet that holds a valid ethereum address", () => {
    const wallet = createWallet();

    expect(isAddress(wallet.address)).toBe(true);
  });

  it("Can create a signed message", () => {
    const expected = {
      message: expect.any(String),
      messageHash: expect.any(String),
      r: expect.any(String),
      s: expect.any(String),
      v: expect.any(String),
      signature: expect.any(String)
    };

    const nonce = "Chancellor on brink of second bailout for banks";
    const wallet = createWallet();
    const signedMessage = signMessage({ nonce, wallet });

    expect(signedMessage).toEqual(expect.objectContaining(expected));
  });

  it("Can verify that a password is at least 8 characters in length and contains at least one number", () => {
    const password = "N0w1Q!SK$GaC";

    expect(isValidPassword(password)).toBe(true);
  });

  it("Can verify that a password os not at least 8 characters in length", () => {
    const password = "1234567";

    expect(isValidPassword(password)).toBe(false);
  });

  it("Can verify that a password does not contain at least one number", () => {
    const password = "bestpasswordever";

    expect(isValidPassword(password)).toBe(false);
  });

  it("Can encrypt and decrypt a private key with the same password", () => {
    const wallet = createWallet();
    const privateKeyToEncrypt = wallet.privateKey;
    const password = "N0w1Q!SK$GaC";
    const secret = createSecret(privateKeyToEncrypt, password);
    const decryptedPrivateKey = decryptSecret(secret, password);

    expect(privateKeyToEncrypt).toBe(decryptedPrivateKey);
  });

  it("Can not decrypt a private key with a different password that was used to encrypt it", () => {
    const wallet = createWallet();
    const privateKeyToEncrypt = wallet.privateKey;
    const password = "N0w1Q!SK$GaC";
    const wrongPassword = "fakeToshi123";
    const secret = createSecret(privateKeyToEncrypt, password);
    const decryptedPrivateKey = decryptSecret(secret, wrongPassword);

    expect(privateKeyToEncrypt).not.toBe(decryptedPrivateKey);
  });
});
