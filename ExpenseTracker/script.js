document.addEventListener('DOMContentLoaded', () => {


    const expenseForm = document.getElementById('expense-form')
    const expenseNameInput = document.getElementById('expense-name')
    const expenseAmountInput = document.getElementById('expense-amount')
    const expenseBtn = document.getElementById('expense-btn')
    const expenseList = document.getElementById('expense-list')
    const totalAmountDisplay = document.getElementById('total-amount')

    let expenses = JSON.parse(localStorage.getItem('expense')) || []

    expenseForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const expenseName = expenseNameInput.value.trim()
        const expenseAmount = parseFloat(expenseAmountInput.value.trim())
        if (expenseName !== '' && !isNaN(expenseAmount) && expenseAmount > 0) {
            const newExpense = {
                id: Date.now(),
                name: expenseName,
                amount: expenseAmount
            }
            expenses.push(newExpense)
            saveToLocal()
            rendorExpense()
            displayTotal()
            console.log(expenses);

            expenseNameInput.value = ''
            expenseAmountInput.value = ''


        }

    })
    expenseList.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") {
            const expenseId = parseInt(e.target.getAttribute('data-id'))
            expenses = expenses.filter(expense => expense.id !== expenseId)
            saveToLocal()
            rendorExpense()
            displayTotal()
        }
    })

    function saveToLocal() {
        localStorage.setItem('expense', JSON.stringify(expenses))
    }
    function rendorExpense() {
        expenseList.innerHTML = ''
        expenses.forEach((expense) => {
            const li = document.createElement('li')
            li.innerHTML = `
            ${expense.name} - $${expense.amount}
            <button data-id="${expense.id}">Delete</button>
            `
            expenseList.appendChild(li)

        })
    }

    function calculateAmount(){
     return expenses.reduce((sum,expense)=> sum + expense.amount,0)
    }

    function displayTotal(){
        const totalAmount = calculateAmount()
        totalAmountDisplay.innerText = totalAmount
    }

    rendorExpense()
    displayTotal()

})