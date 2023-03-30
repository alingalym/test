// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.0;

//мы можем выбрать камень (0), ножницы(1) и бумага(2)
//смарт-контракт случайно определяет победили ли мы если 0-1; 1-2; 2-0
//смарт-контракт случайно определяет проиграли ли мы если 0-2; 1-0; 2-1
//в остальных случаях ничья
const ethers = require("ethers");

contract Stone {
    uint8 option;

    //1 BNB = 10^9 gwei
    //1 BNB = 10^18 wei

    //0.0001 BNB = 100000
    constructor() payable {}

    function Play(uint8 _option) public payable returns (string memory) {
        require(_option < 3, "You can choose only 0 or 1 or 2");
        require(address(this).balance >= msg.value * 2,"Address do not have sufficient balance");
        
        option = _option; //камень - 0 ножницы - 1 бумага - 2

        uint256 result = Math.floor(Math.random() *3); //result = 0 или 1 или 2
        if (result == _option) {
            payable(msg.sender).transfer(msg.value); //ничья
            return "draw";
        } else {
            if (_option == 0 && result == 1) {
                payable(msg.sender).transfer(msg.value * 2); //вы выиграли
                return "win";
            } else {
                if (_option == 1 && result == 2) {
                    payable(msg.sender).transfer(msg.value * 2); //вы выиграли
                    return "win";
                } else {
                    if (_option == 2 && result == 0) {
                        payable(msg.sender).transfer(msg.value * 2); //вы выиграли
                        return "win";
                    } else {
                        return "lost"; //вы проиграли
                    }
                }
            }
        }
    }

    receive() external payable {}
}
