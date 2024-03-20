
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Movie {
    mapping(address => mapping(uint32 => bool)) public movies;
   
    function watchMovie(uint32 _movieId) public payable returns (bool) {
        // Check if the user has already purchased the movie
        if (movies[msg.sender][_movieId]) {
            // Movie already purchased, return true
            return true;
        }

        // Calculate the required payment 
        uint256 requiredPayment = uint256(_movieId) * 1 ether / 1000000;

        // Check if the payment is correct
        require(msg.value == requiredPayment, "Please pay the exact amount");

        // Mark the movie as purchased for the user
        movies[msg.sender][_movieId] = true;

        // Return true to indicate successful purchase
        return true;
    }
    
}

