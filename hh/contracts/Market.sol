//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./RewardToken.sol";

contract Market {
    RewardToken private _token;
    IERC20 private _stable;

    event Buy(address to, uint256 amount);

    constructor(address token, address stable) {
        require(token != address(0), "Invalid token address");
        require(stable != address(0), "Invalid token address");

        _token = RewardToken(token);
        _stable = IERC20(stable);
    }

    function swapStableForToken(uint256 amount) public {
        require(
            _stable.balanceOf(msg.sender) >= amount,
            "Buyer doesn't have enough stablecoin"
        );

        _stable.transferFrom(msg.sender, address(this), amount);
        _token.mint(msg.sender, amount);

        emit Buy(msg.sender, amount);
    }
}
