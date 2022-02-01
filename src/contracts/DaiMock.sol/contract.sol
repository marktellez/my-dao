//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DaiMock is ERC20 {
    constructor() ERC20("Dai Stablecoin", "DAI") {}

    function faucet(address to, uint256 amount) public {
        _mint(to, amount);
    }
}
