const transactionModel = require("../models/transaction.model")
const accountModel = require("../models/account.model")
const ledgerModel = require("../models/ledger.model")
const emailService = require("../services/email.service")
const mongoose = require("mongoose")



async function createTransaction(req,res) {
    

    /* Validate User Input */
    const {fromAccount, toAccount, amount, idempotencyKey } = req.body

    if(!fromAccount || !toAccount || !amount|| !idempotencyKey) {
        return res.status(400).json({
            message: "All elemnets are required"
        })
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    })

    const toUserAccount = await accountModel.findOne({
        _id : toAccount,
    })

    if(!fromUserAccount || !toUserAccount) {
        return res.status(404).json({
            message: "Content not found"
        })
    }



    /* Validate idempotency key */
    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })

    if(isTransactionAlreadyExists) {
        if(isTransactionAlreadyExists.status == "COMPLETED") {
            return res.status(200).json({
                message: "Transaction already processed",
                transaction: isTransactionAlreadyExists
            })
        }
    }

    if(isTransactionAlreadyExists) {
        if(isTransactionAlreadyExists.status == "PENDING") {
            return res.status(200).json({
                message: "Transaction is still is processing",
            })
        }
    }

    if(isTransactionAlreadyExists) {
        if(isTransactionAlreadyExists.status == "FAILED") {
            return res.status(200).json({
                message: "Transaction processing failed",
            })
        }
    }

    if(isTransactionAlreadyExists) {
        if(isTransactionAlreadyExists.status == "REVERSED") {
            return res.status(200).json({
                message: "Transaction was reversed, please retry again",
            })
        }
    }



    /* Check account status */
    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: "Both formAccount and toAccount must be ACTIVE to process transaction"
        })
    }




    /* Derive sender balance from ledger */
    const balance = await fromUserAccount.getBalance()

    if(balance < amount) {
        return res.status(400).json({
            message : `Insufficient balance.Current balance is ${balance}.Requested amount is ${amount}`
        })
    }


    /* Create transaction */
    const session = await mongoose.startSession()
    session.startTransaction()

    const transaction = await transactionModel.create({
        fromAccount,
        toAccount,
        amount,
        idempotencyKey,
        status:"PENDING"
    }, { session })

    const debitLedgerEntry = await ledgerModel.create({
        account: fromAccount,
        amount: amount,
        transaction: transaction._id,
        type: "DEBIT"
    }, { session })

    const creditLedgerEntry = await ledgerModel.create({
        account: toAccount,
        amount: amount,
        transaction: transaction._id,
        type: "CREDIT"
    }, { session })

    transaction.status = "COMPLETED"
    await transaction.save({ session })

    await session.commitTransaction()
    session.endSession()


    /* Send email notification */
    await emailService.sendTransactionEmail(req.user.email, req.user.name, amount, toAccount)

    return res.status(201).json({
        message : "Transaction completed",
        transaction: transaction
    })


}


module.exports = { createTransaction }