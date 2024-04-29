// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);
}

contract Movie {
    mapping(address => mapping(uint32 => bool)) public movies;
    IERC20 public token;

    event MoviePurchased(address indexed buyer, uint32 movieId);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function setTokenAddress(address _tokenAddress) external {
        token = IERC20(_tokenAddress);
    }

    function watchMovie(uint32 _movieId) public returns (bool) {
        // Check if the user has already purchased the movie
        require(!movies[msg.sender][_movieId], "Movie already purchased");

        // Calculate the required payment 
        uint256 requiredPayment = uint256(_movieId) * 1 ether / 1000000;

        // Check if the user has approved this contract to spend tokens
        require(token.allowance(msg.sender, address(this)) >= requiredPayment, "Not enough allowance");

        // Transfer tokens from user to contract
        bool transferSuccess = token.transferFrom(msg.sender, address(this), requiredPayment);
        require(transferSuccess, "Token transfer failed");

        // Mark the movie as purchased for the user
        movies[msg.sender][_movieId] = true;

        emit MoviePurchased(msg.sender, _movieId);

        // Return true to indicate successful purchase
        return true;
    }

    function hasPurchasedMovie(address _user, uint32 _movieId) public view returns (bool) {
        return movies[_user][_movieId];
    }
}
