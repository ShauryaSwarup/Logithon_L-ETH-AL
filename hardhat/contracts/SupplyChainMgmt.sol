// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChainMGMT is AccessControl {
    // User Roles
    bytes32 public constant CUSTOMER_ROLE = keccak256("CUSTOMER_ROLE");
    bytes32 public constant TRANSPORTER_ROLE = keccak256("TRANSPORTER_ROLE");
    bytes32 public constant SUPPLIER_ROLE = keccak256("SUPPLIER_ROLE");

    // Structs
    struct Customer {
        uint256 customerId;
        string name;
        address walletAddress;
        string location;
    }

    struct Transporter {
        uint256 transporterId;
        string name;
        address walletAddress;
        string licensePlateNo;
    }

    struct Supplier{
        uint256 supplierId;
        string name;
        address walletAddress;
        string location;
    }

    // Mappings
    mapping(uint256 => Customer) customers;
    mapping(uint256 => Transporter) transporters;
    mapping(uint256 => Supplier) suppliers;
    
    // Counter Variables
    uint256 customerCounter;
    uint256 transporterCounter;
    uint256 supplierCounter;
    string status;

    // Events
    event AddedCustomer(string name, string location);
    event AddedTransporter(string name, string licensePlateNo);
    event AddedSupplier(string name, string location);
    
    constructor(){
        status = "ignition";
    }

    function verifyCustomer() public view returns(bool){
        return hasRole(CUSTOMER_ROLE, msg.sender);
    }

    function addCustomer(string memory _name, string memory _location) public {
        customers[customerCounter] = Customer(customerCounter, _name, msg.sender, _location);
        _grantRole(CUSTOMER_ROLE, msg.sender);
        customerCounter++;
        emit AddedCustomer(_name, _location);
    }

    function getAllCustomers() public view returns(Customer[] memory){
        uint256 totalCustomers = customerCounter;
        Customer[] memory allCustomers = new Customer[](totalCustomers);
        for(uint256 i = 0; i < totalCustomers; i++){
            Customer memory customer = customers[i];
            allCustomers[i] = customer; 
        }
        return (allCustomers);
    }

    function verifyTransporter() public view returns(bool){
        return hasRole(TRANSPORTER_ROLE, msg.sender);
    }

    function addTransporter(string memory _name, string memory _licensePlateNo) public {
        transporters[transporterCounter] = Transporter(transporterCounter, _name, msg.sender, _licensePlateNo);
        _grantRole(TRANSPORTER_ROLE, msg.sender);
        transporterCounter++;
        emit AddedTransporter(_name, _licensePlateNo);
    }

    function getAllTransporters() public view returns(Transporter[] memory){
        uint256 totalTransporters = transporterCounter;
        Transporter[] memory allTransporters = new Transporter[](totalTransporters);
        for(uint256 i = 0; i < totalTransporters; i++){
            Transporter memory transporter = transporters[i];
            allTransporters[i] = transporter; 
        }
        return (allTransporters);
    }

    function verifySupplier() public view returns(bool){
        return hasRole(SUPPLIER_ROLE, msg.sender);
    }

    function addSupplier(string memory _name, string memory _location) public {
        suppliers[supplierCounter] = Supplier(supplierCounter, _name, msg.sender, _location);
        _grantRole(SUPPLIER_ROLE, msg.sender);
        supplierCounter++;
        emit AddedSupplier(_name, _location);
    }

    function launch() public {
        status = "lift-off";
    }

}
