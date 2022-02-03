//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./DaoToken.sol";

contract Market {
    DaoToken private _daoToken;
    IERC20 private _ercToken;

    event Buy(address to, uint256 amount);

    constructor(address daoToken, address ercToken) {
        require(daoToken != address(0), "Invalid token address");
        require(ercToken != address(0), "Invalid token address");

        _daoToken = DaoToken(daoToken);
        _ercToken = IERC20(ercToken);
    }

    function swapERCForDao(uint256 amount) public {
        require(
            _ercToken.balanceOf(msg.sender) >= amount,
            "Buyer doesn't have enough stablecoin"
        );

        _ercToken.transferFrom(msg.sender, address(this), amount);
        _daoToken.mint(msg.sender, amount);

        emit Buy(msg.sender, amount);
    }
}
