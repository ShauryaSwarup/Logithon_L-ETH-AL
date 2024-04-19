import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SupplyChainMGMT } from "../typechain-types";

describe("SupplyChainMgmt Tests", async function(){
    let contract: SupplyChainMGMT;
    let supplyChainMgmtContract: SupplyChainMGMT;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async() => {
        supplyChainMgmtContract = await ethers.getContractFactory("SupplyChainMGMT");
        [owner, addr1, addr2] = await ethers.getSigners();
        contract = await supplyChainMgmtContract.deploy();
    })

    it("Should Add a Customer, Verify & Get All", async function(){
        expect(await contract.connect(addr1).addCustomer("Aditya", "Thane")).to.emit(contract, "AddedCustomer").withArgs("Aditya", "Thane");
        expect(await contract.connect(addr1).verifyCustomer()).to.be.true;
        const allCustomers = await contract.connect(addr1).getAllCustomers();
        expect(allCustomers.length).to.equal(1);
    })

})