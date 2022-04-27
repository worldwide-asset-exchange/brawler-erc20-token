# Deployment Details

```
aaron@raven:~/dev/projects/wax/brawler-erc20-token$ npm run deploy 

> brawler-erc20@1.0.0 deploy /home/aaron/dev/projects/wax/brawler-erc20-token
> npx oz deploy

Nothing to compile, all contracts are up to date.
? Choose the kind of deployment upgradeable
? Pick a network ropsten
? Pick a contract to deploy BRWLERC20UpgradeSafe
✓ Linked dependency @openzeppelin/contracts-ethereum-package 3.0.0
✓ Contract BRWLERC20UpgradeSafe deployed
All implementations have been deployed
? Call a function to initialize the instance after creating it? Yes
? Select which function * initialize(escrow: address)
? escrow: address: 0xDc63C389e72d9f803f5c8fDe241A11e66E8D6531
✓ Setting everything up to create contract instances
✓ Instance created at 0xc353A48b144eA989cC229a4dd1b1d44c1ff84091
To upgrade this instance run 'oz upgrade'
0xc353A48b144eA989cC229a4dd1b1d44c1ff84091
```

And approval for the Bridge Contract:

```
aaron@raven:~/dev/projects/wax/brawler-erc20-token$ npx oz send-tx
? Pick a network ropsten
? Pick an instance BRWLERC20UpgradeSafe at 0xc353A48b144eA989cC229a4dd1b1d44c1ff84091
? Select which function approve(spender: address, amount: uint256)
? spender: address: 0x1dbB9924b5b961e671A86EE45Fd949B23aE441C7
? amount: uint256: 100000000000000
✓ Transaction successful. Transaction hash: 0x700ed252b999b18279483f9821b898cca17ad39c4fd69641bad6d021cfff8dc6
Events emitted: 
 - Approval(0xDc63C389e72d9f803f5c8fDe241A11e66E8D6531, 0x1dbB9924b5b961e671A86EE45Fd949B23aE441C7, 100000000000000)
```

Upgrade Apr 27:

```
aaron@raven:~/dev/projects/wax/brawler-erc20-token$ npm run upgrade
npm run upgrade

> brawler-erc20@1.0.0 upgrade /home/aaron/dev/projects/wax/brawler-erc20-token
> npx oz upgrade

? Pick a network ropsten
? Which instances would you like to upgrade? Choose by address
? Pick an instance to upgrade BRWLERC20UpgradeSafe at 0xc353A48b144eA989cC229a4dd1b1d44c1ff84091
? Call a function on the instance after upgrading it? No
Nothing to compile, all contracts are up to date.
- New variable 'uint256[50] __gap' was added in contract ERC20BurnableUpgradeSafe in @openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol:1 at the end of the contract.
See https://docs.openzeppelin.com/upgrades/2.6//writing-upgradeable#modifying-your-contracts for more info.
✓ Contract BRWLERC20UpgradeSafe deployed
All implementations have been deployed
✓ Instance upgraded at 0xc353A48b144eA989cC229a4dd1b1d44c1ff84091. Transaction receipt: 0x7722342a10bf882b64297ef2c2ec3e336e3f90be249deecd76f47b010c8fb6aa
✓ Instance at 0xc353A48b144eA989cC229a4dd1b1d44c1ff84091 upgraded
```