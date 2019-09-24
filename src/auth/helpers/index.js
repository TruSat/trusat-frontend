import axios from "axios";
import { API_ROOT } from "../../app/helpers";
import { ethers } from "ethers";
import Web3 from "web3";
import pbkdf2 from "pbkdf2";
import aesjs from "aes-js";
var web3 = new Web3(Web3.givenProvider || window.ethereum);

export const createWallet = () => {
  return ethers.Wallet.createRandom();
};

export const retrieveNonce = async address => {
  return await axios
    .post(`${API_ROOT}/getNonce`, JSON.stringify({ address: address }))
    .then(response => {
      return response.data.nonce;
    })
    .catch(error => console.log(error));
};

export const handleMetamaskConnect = () => {
  // user has metamask but they are not signed in to the plugin
  if (window.ethereum.selectedAddress === undefined) {
    alert("Please sign in to MetaMask plugin and try again!");
    window.ethereum.enable().catch(console.error);
    // metamask plugin not found
  } else {
    alert(
      "Please check permissions on your MetaMask plugin by navigating to the Settings tab via your avatar icon and then clicking Connections. From there click the connect button to grant TruSat.org access!"
    );
  }
};

// Used for email/password and burner auth
export const signMessage = ({ nonce, wallet }) => {
  // hash the nonce
  const nonceHash = ethers.utils.id(nonce);

  // sign nonce using web3
  try {
    //a promise
    const signedMessage = web3.eth.accounts.sign(
      nonceHash,
      wallet.signingKey.privateKey
    );

    // TODO remove web3 as a dependency for signing messages
    // const signedMessage = await wallet.signMessage(nonceHash);

    return signedMessage;
  } catch (error) {
    // TODO
    // dispatch({ type: "AUTHENTICATING", payload: false });
    alert(`Message signing failed, please try again`);
  }
};

// Used for email/password and burner auth
export const retrieveJwt = async ({ address, signedMessage }) => {
  return await axios
    .post(
      `${API_ROOT}/login`,
      JSON.stringify({
        address: address,
        signedMessage: signedMessage.signature
      })
    )
    .then(response => {
      return response.data.jwt;
    })
    .catch(error => console.log(error));
};

// Used for metamask auth
export const metamaskSignMessage = async ({ nonce, address }) => {
  const nonceHash = ethers.utils.id(nonce);

  try {
    //a promise
    const signedMessage = await web3.eth.personal.sign(nonceHash, address);

    return signedMessage;
    // will return an error is user clicks cancel on metamask
  } catch (error) {
    return error;
  }
};

// used for metamask auth
export const retrieveMetamaskJwt = async ({
  address,
  metamaskSignedMessage
}) => {
  return await axios
    .post(
      `${API_ROOT}/login`,
      JSON.stringify({
        address: address,
        signedMessage: metamaskSignedMessage
      })
    )
    .then(response => {
      return response.data.jwt;
    })
    .catch(error => console.log(error));
};

export const createSecret = (privateKey, password) => {
  // create a salt of 10 random numbers
  const salt = window.crypto.getRandomValues(new Uint32Array(1))[0].toString();
  // use salt and users password to create key
  const key = pbkdf2.pbkdf2Sync(password, salt, 1, 256 / 8, "sha512");
  // create iv
  const iv = window.crypto.getRandomValues(new Uint8Array(16));
  // create 14 random numbers to be used as a pad on the private key
  const pad = window.crypto
    .getRandomValues(new Uint32Array(2))
    .join("")
    .substring(0, 14);
  // add pad to private key and convert string to bytes
  const privateKeyBytes = aesjs.utils.utf8.toBytes(`${pad}${privateKey}`);
  // encryption utilizing key and iv
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const encryptedPrivateKeyBytes = aesCbc.encrypt(privateKeyBytes);
  // convert encrypted privateKey in bytes to a hex string
  const encryptedPrivateKeyBytesAsHex = aesjs.utils.hex.fromBytes(
    encryptedPrivateKeyBytes
  );
  // convert iv in bytes to a hex string
  const ivAsHex = aesjs.utils.hex.fromBytes(iv);
  // create secret string to email to user
  const secret = `${salt}/${ivAsHex}/${encryptedPrivateKeyBytesAsHex}`;

  return secret;
};

export const decryptSecret = (secret, password) => {
  // split secret and obtain salt, iv and the encrypted privateKeyBytes as a hex string
  const splitSecret = secret.split("/");
  const salt = splitSecret[0];
  const iv = aesjs.utils.hex.toBytes(splitSecret[1]);
  const encryptedPrivateKeyBytesAsHex = splitSecret[2];
  // use password and salt to generate key
  const key = pbkdf2.pbkdf2Sync(password, salt, 1, 256 / 8, "sha512");
  // convert to bytes
  const encryptedPrivateKeyBytes = aesjs.utils.hex.toBytes(
    encryptedPrivateKeyBytesAsHex
  );
  // decrypt the private key using key and iv
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const decryptedPrivateKeyBytes = aesCbc.decrypt(encryptedPrivateKeyBytes);
  // convert to string, which includes the pad that was added during encryption
  const decryptedPrivateKeyWithPad = aesjs.utils.utf8.fromBytes(
    decryptedPrivateKeyBytes
  );
  // remove pad
  const privateKey = decryptedPrivateKeyWithPad.substring(
    14,
    decryptedPrivateKeyWithPad.length
  );
  return privateKey;
};
