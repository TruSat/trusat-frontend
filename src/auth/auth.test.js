import {
  createWallet,
  isAddress,
  signMessage,
  createSecret,
  decryptSecret
} from "./auth-helpers";

describe("Auth helper functions", () => {
  it("Can verify if an ethereum address is valid", () => {
    const address = "0xC41aD670CE88aD9D198e25B8A0A22227f7513F42";

    expect(isAddress(address)).toBe(true);
  });

  it("Can verify if an ethereum address is invalid", () => {
    const address = "this_is_not_an_address";

    expect(isAddress(address)).toBe(false);
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
});
