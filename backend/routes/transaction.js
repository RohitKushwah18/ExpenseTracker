const router = require('express').Router();
const { addIncome,getIncome,deleteIncome } = require('../controllers/Income');
const { addExpense,getExpense,deleteExpense } = require('../controllers/Expense');
const { registerControllers,loginControllers } = require('../controllers/auth');
 
router.post('/add-income', addIncome)
      .post('/get-income', getIncome)
      .delete('/delete-income/:id', deleteIncome)
      .post('/add-expense', addExpense)
      .post('/get-expense', getExpense)
      .delete('/delete-expense/:id', deleteExpense)
      .post('/signup', registerControllers)
      .post('/login', loginControllers)
      // .post('/logout', logout)

module.exports = router;