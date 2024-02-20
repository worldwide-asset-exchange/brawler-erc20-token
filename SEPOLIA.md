# Deployment Details

```bash
npm run deploy

> brawler-erc20@1.0.0 deploy
> npx oz deploy

Nothing to compile, all contracts are up to date.
? Choose the kind of deployment upgradeable
? Pick a network sepolia
? Pick a contract to deploy BRWLERC20UpgradeSafe
? One or more linked dependencies are not yet deployed on dev-11155111.
Do you want to deploy them now? Yes
✓ Deploying @openzeppelin/contracts-ethereum-package dependency to network dev-11155111
✓ Contract BRWLERC20UpgradeSafe deployed
All implementations have been deployed
? Call a function to initialize the instance after creating it? Yes
? Select which function * initialize(escrow: address)
? escrow: address: 0xDc63C389e72d9f803f5c8fDe241A11e66E8D6531
✓ Setting everything up to create contract instances
✓ Instance created at 0x66d8A3100C3C338B319332f0fd8D155B90AAf6ac
To upgrade this instance run 'oz upgrade'
0x66d8A3100C3C338B319332f0fd8D155B90AAf6ac
```

And approval for the Bridge Contract:

```bash
npx oz send-tx
? Pick a network sepolia
? Pick an instance BRWLERC20UpgradeSafe at 0x66d8A3100C3C338B319332f0fd8D155B90AAf6ac
? Select which function approve(spender: address, amount: uint256)
? spender: address: 0xf8b284a0834f1f266177C8dA50C1b71b9E470ec6
? amount: uint256: 10000000000
✓ Transaction successful. Transaction hash: 0x48e30890be8fb6447376d3879062b59b663463229407891436921f7f198525bb
Events emitted: 
 - Approval(0xDc63C389e72d9f803f5c8fDe241A11e66E8D6531, 0xf8b284a0834f1f266177C8dA50C1b71b9E470ec6, 10000000000)
```