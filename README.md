# Kwikswap Interface


An open source interface for Kwikswap -- a protocol for decentralized exchange of Ethereum tokens.

- Website: [kwikswap.org](https://kwikswap.org/)
- Interface: [app.kwikswap.org](https://app.kwikswap.org)
- Docs: [kwikswap.org/docs/](https://kwikswap.org/docs/)
- Reddit: [/r/kwikswap](https://www.reddit.com/r/Kwikswap/)
- Email: [admin@kwikswap.org](mailto:admin@kwikswap.org)

## Accessing the Kwikswap Interface

To access the Kwikswap Interface, use an IPFS gateway link from the
[latest release](https://github.com/Kwikswap/kwikswap-interface/releases/latest), 
or visit [app.kwikswap.org](https://app.kwikswap.org).

## Listing a token

Please see the
[@kwikswap/default-token-list](https://github.com/kwikswap/default-token-list) 
repository.

## Development

### Install Dependencies

```bash
yarn
```

### Run

```bash
yarn start
```

### Configuring the environment (optional)

To have the interface default to a different network when a wallet is not connected:

1. Make a copy of `.env` named `.env.local`
2. Change `REACT_APP_NETWORK_ID` to `"{YOUR_NETWORK_ID}"`
3. Change `REACT_APP_NETWORK_URL` to e.g. `"https://{YOUR_NETWORK_ID}.infura.io/v3/{YOUR_INFURA_KEY}"` 

Note that the interface only works on testnets where both 
[Kwikswap V1](https://kwikswap.org/docs/v1/smart-contracts/factory/) and 
[multicall](https://github.com/makerdao/multicall) are deployed.
The interface will not work on other networks.

## Contributions

**Please open all pull requests against the `master` branch.** 
CI checks will run against all PRs.

## Accessing Kwikswap Interface 

The Kwikswap Interface supports swapping against, and migrating or removing liquidity from Kwikswap . However,
if you would like to use Kwikswap, the Kwikswap interface for mainnet and testnets is accessible via IPFS gateways 
linked from the [v1.0.0 release](https://github.com/kwikswap/Kwikswap-interface/releases/tag/v1.0.0).
