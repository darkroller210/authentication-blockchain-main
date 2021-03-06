<<<<<<< HEAD
# Blockchain-based Authentication

This project shows how the use of Blockchain allows to create a Blockchain-based authentication where the user's login data hash is stored in a smart contract.

---

## What authentication is

Authentication is a security process through which a proof of identity or ownership is required. It allows a user owning an account login credentials to login to their account while denying access to others. In most cases, the user's login information are stored in a server, therefore the authentication process is an interaction between the user and a server, and since this can give access to sensitive information, the server in which login credential are stored must be secured. A blockchain-based authentication (BBA) is proposed in order to lower malicious access and increase security to the authentication process.

## BBA schema

Blockchain can be defined as a decentralized, distributed and cryptographic secured ledger that allows to record data. One of the most important features of Blockchain is immutability, which prevents to change or alter data once they have been added to the Blockchain. Since data on the Blockchain is immutable, so is information about its owner, therefore, a BBA system can be used to secure authentication process in a decentralized and immutable way. In this project, we propose an authentication schema based on the Blockchain technology. User's login data are stored as a hash to the Blockchain via a smart contract, and each time a user request an access to a website for example, the hash derived from credentials provided by the user is compared with the hash that is stored in the smart contract, if their is a match then the user is authorized to access the website, if not, then the access is denied. What is interesting with this schema is that the user must be connected with the ethereum address that was used in the sign up process, since this address is used to generate the user's login hash. The web3 function sign is used to generate a unique signature based on the username and the user's ethereum address, and the password and a 6 digit code provided by the user are used to generate a ash which, together with the unique signature's hash are used to generate the final hash that is stored in the smart contract. To generate the same hash, the user must provide correct username, password, 6 digit code and be connected with the right ethereum address to generate the right signature.

## BBA smart contract and Javascript validation functions

During sign up process, the user's login hash must be stored to the smart contract, and since this action writes information on the Blockchain, the user must pay the transaction gas. This could demotivate users to use BBA, however, one can imagine storing this information not in a smart contract, but either on IPFS for public use or to a private Blockchain for business use. The gas fees are paid only for signing up, the login process does not require writing data in the smart contract, however, approving the data signature with the account which is free of gas is required. The smart contract is shown bellow with javascript functions that allow to validate the process.

```solidity
//===================
// Authentication.sol
//===================

// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

/**
* smart contract that allows to store login data hash
*/
contract Authentication {
    uint256 public nbOfUsers;

    struct User {
        string signatureHash;
        address userAddress;
    }

    mapping(address => User) private user;

    constructor() {
        nbOfUsers = 0;
    }

    function register(string memory _hash) public {
        require(
            user[msg.sender].userAddress ==
                address(0x0000000000000000000000000000000000000000),
            "already registered"
        );

        user[msg.sender].signatureHash = _hash;
        user[msg.sender].userAddress = msg.sender;
        nbOfUsers++;
    }

    function getSignatureHash() public view returns (string memory) {
        require(msg.sender == user[msg.sender].userAddress, "Not allowed");

        return user[msg.sender].signatureHash;
    }

    function getUserAddress() public view returns (address) {
        return user[msg.sender].userAddress;
    }
}
```
---

---

```javascript
//==================
// AuthValidation.js
//==================


import SignData from "./SignData";

const AuthValidation = async (
  username,
  accountAddress,
  password,
  digiCode,
  web3,
  contract
) => {
  let userAddress = await contract.methods
    .getUserAddress()
    .call({ from: accountAddress });

  if (userAddress.toLowerCase() !== accountAddress.toLowerCase()) {
    return false;
  } else {
    let signedData = await SignData(username, accountAddress, web3);
    let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(
      password + digiCode
    );

    let hash = await web3.eth.accounts.hashMessage(
      signedData + passwordDigiCodeHash
    );

    // get hash from the contract
    let hashFromContract = await contract.methods
      .getSignatureHash()
      .call({ from: accountAddress });

    if (hash === hashFromContract) {
      return true;
    } else {
      return false;
    }
  }
};

export default AuthValidation;
```

---

```javascript
//======================
// AuthenticationHash.js
//======================


import SignData from "./SignData";

const AuthenticationHash = async (
  username,
  accountAddress,
  password,
  digiCode,
  web3
) => {
  let signedMessage = await SignData(username, accountAddress, web3);
  let passwordDigiCodeHash = await web3.eth.accounts.hashMessage(
    password + digiCode
  );

  return await web3.eth.accounts.hashMessage(
    signedMessage + passwordDigiCodeHash
  );
};

export default AuthenticationHash;
```

---

```javascript
//============
// SignData.js
//============

/*
 * returns the unique hash based on the username and ethereum address
 */

const SignData = async (username, accountAddress, web3) => {
  let signedData;

  await web3.eth.personal.sign(username, accountAddress, (err, signature) => {
    if (err) {
      signedData = err;
    } else {
      signedData = web3.eth.accounts.hashMessage(signature);
    }
  });

  return signedData;
};

export default SignData;
```

---

## Diagram

The following diagram shows all steps to generate the user's login data hash from the username, the password, the 6 digit code and the ethereum address. To register the user must fill a form to provide the username, the password and the 6 digit code, the ethereum address is retrieved directly from the wallet. This address is associated to the username to generate a signature via the web3 function sign, the generated signature is hashed (hash1). The password is associated with the 6 digit code to generate another hash (hash2). The two hashes are combined to generated the final hash that is stored in the smart contract. To login, the user must be connected to the Blockchain with the same address used during registration, and fill the login form with right username, password and the 6 digit code. The back-end code then generates the hash with this login information and compares it with the hash that was stored in the smart contract by the ethereum address which request the login, if the two hashes match, then the user is authorized to login, if not, the access is denied.

![alt text](./client/src/img/pdf/diagram.png "BBA diagram") 


=======
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can???t go back!**

If you aren???t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you???re on your own.

You don???t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn???t feel obligated to use this feature. However we understand that this tool wouldn???t be useful if you couldn???t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
>>>>>>> 530d9cf89142512d17cda214b2a5dd6bc69f2f93
