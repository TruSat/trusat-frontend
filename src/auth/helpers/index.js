import axios from "axios";
import { ethers } from "ethers";
import Web3 from "web3";
var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

export const createWallet = () => {
  return ethers.Wallet.createRandom();
};

export const retrieveNonce = async address => {
  return axios
    .post(
      "http://ec2-18-222-251-120.us-east-2.compute.amazonaws.com:8080/getNonce",
      JSON.stringify({ publicAddress: address })
    )
    .then(response => {
      return response.data.nonce;
    })
    .catch(error => console.log(error));
};

export const signMessage = async ({ nonce, wallet }) => {
  // hash the nonce
  const nonceHash = ethers.utils.id(nonce);

  // sign nonce using web3
  try {
    //a promise
    const signedMessage = await web3.eth.accounts.sign(
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

export const retrieveJwt = async ({ publicAddress, signedMessage }) => {
  console.log(signedMessage);

  return axios
    .post(
      "http://ec2-18-222-251-120.us-east-2.compute.amazonaws.com:8080/login",
      JSON.stringify({
        publicAddress: publicAddress,
        signedMessage: signedMessage.signature
      })
    )
    .then(response => {
      console.log(`JWT is = `, response.data);
      return response.data;
    })
    .catch(error => console.log(error));
};
