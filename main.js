// Import the prerequisites
const { providers, Wallet } = require('ethers');
const { default: EthersAdapter } = require('@colony/colony-js-adapter-ethers');
const { TrufflepigLoader } = require('@colony/colony-js-contract-loader-http');
const BigNumber = require('bn.js');
const IPFS = require('ipfs');
const ipfs = new IPFS();


// Import the ColonyNetworkClient
const { default: ColonyNetworkClient } = require('@colony/colony-js-client');

// Create an instance of the Trufflepig contract loader
const loader = new TrufflepigLoader();

// Create a provider for local TestRPC (Ganache)
const provider = new providers.JsonRpcProvider('http://localhost:8545/');


// Create colony and task
const main = async (OriginalCreator1, OriginalCreator2, OriginalCreator3, musicInfo, originalCreator0Payout) => {

  // Get the private key from the first account from the ganache-accounts
  // through trufflepig
  const { privateKey } = await loader.getAccount(0);
  
  // Create a wallet with the private key (so we have a balance we can use)
  const wallet = new Wallet(privateKey, provider);
  const balance = await wallet.getBalance()

  // Create an adapter (powered by ethers)
  const adapter = new EthersAdapter({
    loader,
    provider,
    wallet,
  });

  // Connect to ColonyNetwork with the adapter!
  const networkClient = new ColonyNetworkClient({ adapter });
  await networkClient.init();

  // Let's deploy a new ERC20 token for our Colony.
  const tokenAddress = await networkClient.createToken({
    name: 'Cool Colony Token',
    symbol: 'COLNY',
  });
  console.log('Token address: ' + tokenAddress);

  // Create a Colony
  const {
    eventData: { colonyId, colonyAddress },
  } = await networkClient.createColony.send({ tokenAddress });

  console.log('Colony ID: ' + colonyId);
  console.log('Colony address: ' + colonyAddress);

  const colonyClient = await networkClient.getColonyClient(colonyId);

  // Create task
  const data = Buffer.from(JSON.stringify(musicInfo));
  // upload your file to IPFS
  const files = await ipfs.files.add(data)
  // set the hash when it's returned after upload
  const { hash } = files[0];
  const { eventData: { taskId } } = await colonyClient.createTask.send({
    specificationHash: hash,
    domainId: 1,
  });

  // Retrieve user
  const { address: walletAddressOriginalCreator1 } = await colonyClient.adapter.loader.getAccount(OriginalCreator1);
  const { address: walletAddressOriginalCreator2 } = await colonyClient.adapter.loader.getAccount(OriginalCreator2);
  const { address: walletAddressOriginalCreator3 } = await colonyClient.adapter.loader.getAccount(OriginalCreator3);

  // Set the workers
  await colonyClient.setTaskRoleUser.send({
    taskId: taskId,
    role: 'MANAGER',
    user: walletAddressOriginalCreator1,
  });

  await colonyClient.setTaskRoleUser.send({
    taskId: taskId,
    role: 'MANAGER',
    user: walletAddressOriginalCreator2,
  });

  await colonyClient.setTaskRoleUser.send({
    taskId: taskId,
    role: 'MANAGER',
    user: walletAddressOriginalCreator3,
  });

  // set licence fee
  await colonyClient.setTaskManagerPayout.startOperation({ 
    taskId: taskId,
    token: tokenAddress,
    amount: originalCreator0Payout})


  // finalise task 
  await colonyClient.finalizeTask.send({
    taskId: 1,
  });   

  await colonyClient.claimPayout.send({
    taskId: 1,
    role: 'MANAGER',
    token: walletAddressOriginalCreator0,
  });

  await colonyClient.claimPayout.send({
    taskId: 1,
    role: 'MANAGER',
    token: walletAddressOriginalCreator1,
  });

  await colonyClient.claimPayout.send({
    taskId: 1,
    role: 'MANAGER',
    token: walletAddressOriginalCreator2,
  });

};


main(1, 2, 3, "musicInfo.pdf", new BigNumber(10)).catch(e => console.log(e.message))



