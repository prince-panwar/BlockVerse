const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Movie contract", function () {
  let movie;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    movie = await ethers.deployContract("Movie");
    [owner] = await ethers.getSigners();

    await movie.waitForDeployment();
  });

  describe("watchMovie", function () {
    it("should allow user to watch a movie if payment is correct", async function () {
      // Calculate the required payment for movie ID 1
      const requiredPayment = ethers.parseEther("0.000001");

      // Send payment and call watchMovie function
      await  movie.connect(owner).watchMovie(1, { value: requiredPayment });
        

      // Check if movie was marked as purchased for user
      expect(await movie.movies(owner.address , 1)).to.be.true;
    });

    it("should revert if payment is incorrect", async function () {
      // Calculate the required payment for movie ID 1
      const requiredPayment = ethers.parseEther("0.00000001");

      // Send incorrect payment and call watchMovie function
      await expect(  movie.connect(owner).watchMovie(1, { value: requiredPayment }))
        .to.be.revertedWith('Please pay the exact amount');

   
    });

    it("should allow user to watch a movie again if already purchased", async function () {
      // Calculate the required payment for movie ID 1
      const requiredPayment = ethers.parseEther("0.000001");

      // Send correct payment and call watchMovie function
      await  movie.connect(owner).watchMovie(1, { value: requiredPayment });

      

      // Check if movie was marked as purchased for user
      expect(await movie.movies(owner.address, 1)).to.be.true;
    });
  });
});
