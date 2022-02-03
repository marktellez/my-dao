const { writeFile, readFile } = require("fs/promises");

async function main() {
  const web3CongigFile = "../src/data/contracts.json";
  const web3Config = JSON.parse((await readFile(web3CongigFile)).toString());
  const chainId = "0x13881";
  const env = web3Config[chainId];

  env.dai = {
    address: "0xcb1e72786a6eb3b44c2a2429e317c8a2462cfeb1",
    symbol: "DAI",
    name: "DAI",
  };

  const OPERATOR_ROLE =
    "0x97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929";

  const provider = new ethers.providers.InfuraProvider("maticmum", {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  });

  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.dir({ deployer: deployer.address });
  console.log("Deploying DaoToken...");
  const DaoToken = await ethers.getContractFactory("DaoToken");
  const daoToken = await (await DaoToken.connect(deployer).deploy()).deployed();
  const isOperator = await daoToken.hasRole(OPERATOR_ROLE, deployer.address);
  console.dir({
    isOperator,
  });
  console.log(
    `Deployed DaoToken (${daoToken.address}) with deployer (${deployer.address}) is operator: ${isOperator}`
  );

  // console.log("Deploying DaiMock...");
  // const DaiMock = await ethers.getContractFactory("DaiMock");
  // const daiToken = await (await DaiMock.connect(deployer).deploy()).deployed();

  console.log("Deploying Staking...");
  const Staking = await ethers.getContractFactory("DaoStaking");
  const staking = await (
    await Staking.connect(deployer).deploy(daoToken.address)
  ).deployed();

  console.log("Deploying Market...");
  const Market = await ethers.getContractFactory("Market");
  const market = await (
    await Market.connect(deployer).deploy(daoToken.address, env.dai.address)
  ).deployed();
  await daoToken.connect(deployer).connectToMarket(market.address);

  env.dao = {
    address: daoToken.address,
    symbol: "TZD",
    name: "TelezDao",
  };

  env.staking = {
    address: staking.address,
  };

  env.market = {
    address: market.address,
  };

  await writeFile(
    web3CongigFile,
    JSON.stringify({
      ...web3Config,
      [chainId]: {
        ...env,
      },
    })
  );

  console.log(`
------------------------------------------------------------
CONTRACTS DEPLOYED:
  DaoToken: ${daoToken.address}
  Dai: ${env.dai.address}
  Market: ${market.address}
  Staking: ${staking.address}
------------------------------------------------------------
Web3 @ ${web3CongigFile} updated
  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
