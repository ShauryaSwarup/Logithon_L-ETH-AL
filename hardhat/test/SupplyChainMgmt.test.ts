import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { SupplyChainMGMT, CartonNFT } from "../typechain-types";

describe("SupplyChainMgmt Tests", async function(){
    let contract: SupplyChainMGMT;
    let cartonContract: CartonNFT;
    let supplyChainMgmtContract: SupplyChainMGMT;
    let cartonNFTContract: CartonNFT;
    let owner: SignerWithAddress;
    let addr1: SignerWithAddress;
    let addr2: SignerWithAddress;

    beforeEach(async() => {
        [owner, addr1, addr2] = await ethers.getSigners();

        cartonNFTContract = await ethers.getContractFactory("CartonNFT");
        cartonContract = await cartonNFTContract.deploy(owner);

        supplyChainMgmtContract = await ethers.getContractFactory("SupplyChainMGMT");
        contract = await supplyChainMgmtContract.deploy(cartonContract);
    })

    it("Should Add a Customer, Verify & Get All", async function(){
        expect(await contract.connect(addr1).addCustomer("Aditya", "Thane")).to.emit(contract, "AddedCustomer").withArgs("Aditya", "Thane");
        expect(await contract.connect(addr1).verifyCustomer()).to.be.true;
        const allCustomers = await contract.connect(addr1).getAllCustomers();
        expect(allCustomers.length).to.equal(1);
    })

    it("Should Request for a Product & Review", async function(){
        expect(await contract.connect(addr1).addCustomer("Aditya", "Thane")).to.emit(contract, "AddedCustomer").withArgs("Aditya", "Thane");
        expect(await contract.connect(addr2).addSupplier("Shaurya", "Kandivli")).to.emit(contract, "AddedSupplier").withArgs("Shaurya", "Kandivli");
        expect(await contract.connect(addr1).requestSupplier(0, "Mango", 25)).to.emit(contract, "RaisedRequest").withArgs("Mango", 0, 25);
        // expect(await contract.connect(addr2).reviewRequest(0, "Accept")).to.emit(contract, "RequestReviewed").withArgs(0, "Accept");
        expect(await contract.connect(addr2).reviewRequest(0, "Deny")).to.emit(contract, "RequestReviewed").withArgs(0, "Deny");
    })

    it("Should Get The Role for a User", async function(){
        expect(await contract.connect(addr1).addCustomer("Aditya", "Thane")).to.emit(contract, "AddedCustomer").withArgs("Aditya", "Thane");
        expect(await contract.connect(addr2).addSupplier("Shaurya", "Kandivli")).to.emit(contract, "AddedSupplier").withArgs("Shaurya", "Kandivli");
        expect(await contract.connect(owner).addTransporter("Narayani", "Matunga")).to.emit(contract, "AddedTransporter").withArgs("Narayani", "Matuga");
        expect(await contract.connect(addr1).getRole()).to.equal("CUSTOMER");
        expect(await contract.connect(addr2).getRole()).to.equal("SUPPLIER");
        expect(await contract.connect(owner).getRole()).to.equal("TRANSPORTER");
    })

})