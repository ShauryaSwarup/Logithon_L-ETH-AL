// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import './CartonNFT.sol';

interface ICartonNFT {
    function mint(address, string memory, uint256, string memory, string memory, string memory) external returns(uint256);
    function getCartonAttributes(uint256) external view returns (uint256, string memory, uint256, string memory, string memory, string memory, int256);
}

contract SupplyChainMGMT is AccessControl {
    ICartonNFT cartonNFT;

    string status;
    constructor(address cartonNFTContract) {
        cartonNFT = ICartonNFT(cartonNFTContract);
        status = "ignition";
    }

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
        // uint256 shipments;
        // uint256 deliveries;
    }

    struct Supplier {
        uint256 supplierId;
        string name;
        address walletAddress;
        string location;
    }

    struct Request {
        uint256 requestId;
        string product;
        uint256 supplierId;
        string supplierAddress;
        string customerAddress;
        uint256 quantity;
        string status;
    }

    // Mappings
    mapping(address => uint256) customerAddrToId;
    mapping(uint256 => Customer) customers;
    mapping(uint256 => Transporter) transporters;
    mapping(address => uint256) supplierAddrToId;
    mapping(uint256 => Supplier) suppliers;
    mapping(uint256 => Request[]) requests;
    mapping(uint256 => Request) idToRequest;

    // Counter Variables
    uint256 customerCounter;
    uint256 transporterCounter;
    uint256 supplierCounter;
    uint256 requestCounter;

    // Events
    event AddedCustomer(string name, string location);
    event AddedTransporter(string name, string licensePlateNo);
    event AddedSupplier(string name, string location);
    event RaisedRequest(string product, uint256 supplierId, uint256 quantity);
    event RequestReviewed(uint256 requestId, string requestStatus);

    // Customer Functions

    function verifyCustomer() public view returns (bool) {
        return hasRole(CUSTOMER_ROLE, msg.sender);
    }

    function addCustomer(string memory _name, string memory _location) public {
        customers[customerCounter] = Customer(
            customerCounter,
            _name,
            msg.sender,
            _location
        );
        customerAddrToId[msg.sender] = customerCounter;
        _grantRole(CUSTOMER_ROLE, msg.sender);
        customerCounter++;
        emit AddedCustomer(_name, _location);
    }

    function getAllCustomers() public view returns (Customer[] memory) {
        uint256 totalCustomers = customerCounter;
        Customer[] memory allCustomers = new Customer[](totalCustomers);
        for (uint256 i = 0; i < totalCustomers; i++) {
            Customer memory customer = customers[i];
            allCustomers[i] = customer;
        }
        return (allCustomers);
    }

    function requestSupplier(uint256 _supplierId, string memory _product, uint256 _quantity) public {
        uint256 customerId = customerAddrToId[msg.sender];
        Supplier memory supplier = suppliers[_supplierId];
 
        idToRequest[requestCounter] = Request(
            requestCounter,
            _product,
            _supplierId,
            supplier.location,
            customers[customerId].location,
            _quantity, 
            "Awaiting Review"
        );

        requests[_supplierId].push(idToRequest[requestCounter]);
        requestCounter++;
        emit RaisedRequest(_product, _supplierId, _quantity);
    } 

    // Transporter Functions

    function verifyTransporter() public view returns (bool) {
        return hasRole(TRANSPORTER_ROLE, msg.sender);
    }

    function addTransporter(
        string memory _name,
        string memory _licensePlateNo
    ) public {
        transporters[transporterCounter] = Transporter(
            transporterCounter,
            _name,
            msg.sender,
            _licensePlateNo
        );
        _grantRole(TRANSPORTER_ROLE, msg.sender);
        transporterCounter++;
        emit AddedTransporter(_name, _licensePlateNo);
    }

    function getAllTransporters() public view returns (Transporter[] memory) {
        uint256 totalTransporters = transporterCounter;
        Transporter[] memory allTransporters = new Transporter[](
            totalTransporters
        );
        for (uint256 i = 0; i < totalTransporters; i++) {
            Transporter memory transporter = transporters[i];
            allTransporters[i] = transporter;
        }
        return (allTransporters);
    }

    // Supplier Functions

    function verifySupplier() public view returns (bool) {
        return hasRole(SUPPLIER_ROLE, msg.sender);
    }

    function addSupplier(string memory _name, string memory _location) public {
        suppliers[supplierCounter] = Supplier(
            supplierCounter,
            _name,
            msg.sender,
            _location
        );
        supplierAddrToId[msg.sender] = supplierCounter;
        _grantRole(SUPPLIER_ROLE, msg.sender);
        supplierCounter++;
        emit AddedSupplier(_name, _location);
    }

    function getAllSuppliers() public view returns (Supplier[] memory) {
        uint256 totalSuppliers = supplierCounter;
        Supplier[] memory allSuppliers = new Supplier[](totalSuppliers);
        for (uint256 i = 0; i < totalSuppliers; i++) {
            Supplier memory supplier = suppliers[i];
            allSuppliers[i] = supplier;
        }
        return (allSuppliers);
    }

    function getAllRequestsForSupplier() public view returns (Request[] memory) {
        uint256 supplierId = supplierAddrToId[msg.sender];
        return (requests[supplierId]);
    }

    function reviewRequest(uint256 _requestId, string memory _action) public {
        Request storage request = idToRequest[_requestId];
        request.status = _action;
        if(keccak256(abi.encodePacked(_action)) == keccak256(abi.encodePacked("Accept"))){
            cartonNFT.mint(msg.sender, request.product, request.quantity, request.supplierAddress, request.customerAddress, request.supplierAddress);
        }
        emit RequestReviewed(_requestId, request.status);
    }

    // Get Role

    function getRole() public view returns (string memory) {
        address sender = msg.sender;
        if(hasRole(CUSTOMER_ROLE, sender))
            return "CUSTOMER";
        if(hasRole(TRANSPORTER_ROLE, sender))
            return "TRANSPORTER";
        return "SUPPLIER";
    }

    // Deploy

    function launch() public {
        status = "lift-off";
    }
}
