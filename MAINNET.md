# Deployment Details

```
aaron@raven:~/dev/projects/wax/brawler-erc20-token$ npm run deploy

> brawler-erc20@1.0.0 deploy /home/aaron/dev/projects/wax/brawler-erc20-token
> npx oz deploy

Nothing to compile, all contracts are up to date.
? Choose the kind of deployment upgradeable
? Pick a network mainnet
? Pick a contract to deploy BRWLERC20UpgradeSafe
✓ Contract BRWLERC20UpgradeSafe deployed
All implementations have been deployed
? Call a function to initialize the instance after creating it? Yes
? Select which function * initialize(escrow: address)
? escrow: address: 0xa7B4e8d6bAD83Bb04660171eE154c6E50c62Bf50
✓ Setting everything up to create contract instances
✓ Instance created at 0x4086E77C5E993FDB90a406285d00111a974F877a
To upgrade this instance run 'oz upgrade'
0x4086E77C5E993FDB90a406285d00111a974F877a
```

Deployment proxy address is: `0x4086E77C5E993FDB90a406285d00111a974F877a`
Initial escrow `0xa7B4e8d6bAD83Bb04660171eE154c6E50c62Bf50`