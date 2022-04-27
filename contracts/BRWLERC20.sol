pragma solidity ^0.6.0;

import "@openzeppelin/contracts-ethereum-package/contracts/Initializable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/ERC20Burnable.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/GSN/Context.sol";

/**
 * @dev Vanilla upgradeable {ERC20} "BRWL" token, including:
 *
 *  - 1 trillion preminted tokens
 *
 */
contract BRWLERC20UpgradeSafe is Initializable, ContextUpgradeSafe, ERC20BurnableUpgradeSafe {
    uint8 public constant DECIMALS = 4;                         // The number of decimals for display

    /**
     * See {ERC20-constructor}.
     */

    function initialize(address escrow) public initializer {
        ERC20UpgradeSafe.__ERC20_init("Blockchain Brawlers Token", "BRWL");
        _setupDecimals(DECIMALS);
        uint256 INITIAL_SUPPLY = 1000000000000 * 10**uint256(DECIMALS);  // supply specified in base units
        _mint(escrow, INITIAL_SUPPLY);
        require(totalSupply() == INITIAL_SUPPLY, "BRWL: totalSupply must equal 1 trillion");
    }
}
