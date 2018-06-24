# ongaku-mura
ongaku mura

## setup Colony Network in local environment

Following the instruction [here](https://docs.colony.io/colonyjs/docs-get-started/), set up Colony Network in local environment.

1. Clone the latest version of the contracts:

``
git clone --recursive https://github.com/JoinColony/colonyNetwork.git
``

2. Switch into the directory and check out the specific version of the contract

``
git checkout b96b30603397b0a2cbcfa42e3fa6ab8d0c175142
``

3. install packages

``
yarn
``

4. add Ganache

``
yarn global add ganache-cli
``

5. add TrufflePig

``
yarn global add trufflepig
``

6. setup local test blockchain

``
/node_modules/.bin/ganache-cli -d --gasLimit 7000000 --acctKeys ganache-accounts.json
``

7. compile with TrufflePig

``
./node_modules/.bin/truffle migrate --reset --compile-all

trufflepig --ganacheKeyFile ganache-accounts.json
``

## run 


npm install
node main.js
