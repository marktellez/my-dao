//SPDX-License-Identifier:MIT

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract DaoToken is ERC20, AccessControl, ERC20Burnable {
    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant MARKET_ROLE = keccak256("MARKET_ROLE");

    uint256 private _circulatingSupply;

    address private _market;

    mapping(address => uint256) private _balances;

    event Reward(address to, uint256 amount);
    event Mint(address to, uint256 amount);

    constructor() ERC20("TellezDAO", "TZD") {
        _setRoleAdmin(OPERATOR_ROLE, DEFAULT_ADMIN_ROLE);
        _setupRole(OPERATOR_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MARKET_ROLE) {
        _mintTo(to, amount);

        emit Mint(to, amount);
    }

    function faucet(address to, uint256 amount) public {
        _mint(to, amount);
    }

    function connectToMarket(address market) public onlyRole(OPERATOR_ROLE) {
        _market = market;
        _setupRole(MARKET_ROLE, _market);
    }

    function connectedMarket() public view returns (address) {
        return _market;
    }

    function reward(address to, uint256 amount) public onlyRole(OPERATOR_ROLE) {
        _mintTo(to, amount);

        emit Reward(to, amount);
    }

    function burnedSupply() public view returns (uint256) {
        return _balances[address(0)];
    }

    function circulatingSupply() public view returns (uint256) {
        return _circulatingSupply;
    }

    function _mintTo(address to, uint256 amount) internal {
        _mint(to, amount);
        _balances[to] += amount;
        _circulatingSupply += amount;
    }
}
