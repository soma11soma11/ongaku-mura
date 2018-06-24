# Ongaku mura
Ongaku mura (music village in Japanese) is a decentralized application that serves as a music platform where creators of the mashup musics can directly negotiate with original creators of sampled musics regarding the licensing fees.
If you are interested, the details can be found [here](https://medium.com/@somasuzuki/ongaku-mura-colony-hackathon-f2a2673e0b50) 

## setup Colony Network in local environment

Following the instruction [here](https://docs.colony.io/colonyjs/docs-get-started/), set up Colony Network in local environment in the directory of your choice.

#### Clone the latest version of the contracts

``
git clone --recursive https://github.com/JoinColony/colonyNetwork.git
``

#### Switch into the directory and check out the specific version of the contract

``
git checkout b96b30603397b0a2cbcfa42e3fa6ab8d0c175142
``

#### install packages

``
yarn
``

#### add Ganache

``
yarn global add ganache-cli
``

#### add TrufflePig

``
yarn global add trufflepig
``

#### setup local test blockchain

``
/node_modules/.bin/ganache-cli -d --gasLimit 7000000 --acctKeys ganache-accounts.json
``

#### compile with TrufflePig

``
./node_modules/.bin/truffle migrate --reset --compile-all
``

``
trufflepig --ganacheKeyFile ganache-accounts.json
``

## run 

``
npm install
``

``
node main.js
``
