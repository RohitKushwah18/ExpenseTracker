const Transaction = require("../models/IncomeModel")
const User = require("../models/authmodel")

exports.addIncome = async (req, res) => {
    try {
        const {title, amount, category, description, date,userid}  = req.body
        // console.log(title, amount, description, date, category, userid);
        const income = Transaction({
          title,
          amount,
          category,
          description,
          date,
          userid
      })
      

        if(!title || !category || !description || !date){
            return res.status(200).json({message: 'All fields are required!'})
        }
        else if(amount <= 0 || !amount === 'number'){
            return res.status(200).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) { 
        res.status(500).json({message: 'Server Error'})
    }

}

exports.getIncome = async (req,res) => {
    try {
        // const userid = "64e7bfeb651fe8a5fcb1fd29";
        const transactions =  await Transaction.find({userid: req.body.userid});
        
        res.status(200).json(transactions);
    }catch (error) {
        res.status(500).json({message: 'server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    // console.log(id)
    Transaction.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}



