const { writeFile, readFile, link, unlink } = require("fs/promises");

async function main() {
  const web3EnvFile = "../.env.local";

  const OPERATOR_ROLE =
    "0x97667070c54ef182b0f5858b034beac1b6f3089aa2d3188bb1e8929f4fa9b929";

  const provider = new ethers.providers.InfuraProvider("maticmum", {
    projectId: process.env.INFURA_PROJECT_ID,
    projectSecret: process.env.INFURA_PROJECT_SECRET,
  });

  const deployer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.dir({ deployer: deployer.address });
  console.log("Deploying Token...");
  const Token = await ethers.getContractFactory("RewardToken");
  const token = await (await Token.connect(deployer).deploy()).deployed();
  const isOperator = await token.hasRole(OPERATOR_ROLE, deployer.address);
  console.dir({
    isOperator,
  });
  console.log(
    `Deployed Token (${token.address}) with deployer (${deployer.address}) is operator: ${isOperator}`
  );

  console.log("Deploying DaiMock...");
  const DaiMock = await ethers.getContractFactory("DaiMock");
  const daiMock = await (await DaiMock.connect(deployer).deploy()).deployed();

  console.log("Deploying Staking...");
  const Staking = await ethers.getContractFactory("RewardTokenStaking");
  const staking = await (
    await Staking.connect(deployer).deploy(token.address)
  ).deployed();

  console.log("Deploying Market...");
  const Market = await ethers.getContractFactory("Market");
  const market = await (
    await Market.connect(deployer).deploy(token.address, daiMock.address)
  ).deployed();

  const env = (await readFile(web3EnvFile)).toString();

  const withAddresses = env
    .replace(
      /NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=.*$/gm,
      `NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=${staking.address}`
    )
    .replace(
      /NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=.*$/gm,
      `NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=${token.address}`
    )
    .replace(
      /NEXT_PUBLIC_DAI_CONTRACT_ADDRESS=.*$/gm,
      `NEXT_PUBLIC_DAI_CONTRACT_ADDRESS=${daiMock.address}`
    )
    .replace(
      /NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS=.*$/gm,
      `NEXT_PUBLIC_MARKET_CONTRACT_ADDRESS=${market.address}`
    );

  await writeFile(web3EnvFile, withAddresses);

  console.log(`
------------------------------------------------------------
CONTRACTS DEPLOYED:
  Token: ${token.address}
  DaiMock: ${daiMock.address}
  Market: ${market.address}
  Staking: ${staking.address}
------------------------------------------------------------
Web3 @ ${web3EnvFile} .env.local updated
  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
