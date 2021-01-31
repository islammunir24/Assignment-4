/**
 * Common method for all actions to update calculations
 * all required inputs are targeted by a common class name 'change-item'
 * and unit prices are holding by a custom attribute 'data-unit-price'
 */
function updateCalculation(){
    let subTotal = document.getElementById('sub-total');
    let taxTotal = document.getElementById('tax-total');
    let grandTotal = document.getElementById('grand-total');

    const unitTax = parseFloat(taxTotal.getAttribute('data-unit-tax'));

    let subTotalValue = 0;

    document.querySelectorAll('.charge-item').forEach(function (item) {

        const unitPrice = parseFloat(item.getAttribute('data-unit-price'));
        let currentInput = 0;
        if(item.value !==""){
            currentInput = item.value;
        }

        subTotalValue = subTotalValue + (currentInput * unitPrice);
    })

    let taxTotalValue = (subTotalValue * unitTax / 100);
    let grandTotalValue = subTotalValue + taxTotalValue;

    subTotal.innerText = subTotalValue;
    taxTotal.innerText = taxTotalValue;
    grandTotal.innerText = grandTotalValue;
}

/**
 * update calculations on load
 */
updateCalculation();

/**
 * Handling onchange event of input fields
 */
document.querySelectorAll('.charge-item').forEach(function (item) {
        item.addEventListener('change', function () {
            updateCalculation();
        })
})

/**
 * Handling plus/minus buttion actions
 */
document.querySelectorAll('.plus-minus-btn span').forEach(function (item) {

    //defining plus/minus button
    let btnFactor = 1
    if(item.classList.contains('minus')){
        btnFactor = -1;
    }

    item.addEventListener('click', function () {

        //finding button related input by custom attribute 'data-input'
        let btnRelatedInputSectorId = item.getAttribute('data-input');
        let btnRelatedInput = document.getElementById(btnRelatedInputSectorId);

        //get current existing value in input field
        let currentInputValue = 0;
        if(btnRelatedInput.value !==""){
            currentInputValue = parseInt(btnRelatedInput.value);
        }

        //protecting input field from become negetive
        if(currentInputValue ===0 && btnFactor === -1){
            return;
        }

        //updating input field by button action
        btnRelatedInput.value = (currentInputValue + btnFactor);

        //update catculations from button action
        updateCalculation();
    })
})

/**
 *Handling book now button
 */

document.getElementById('book-now').addEventListener('click', function () {
    let firstClass = document.getElementById('first-class');
    let economyClass = document.getElementById('economy-class');
    let grandTotal = document.getElementById('grand-total');

    let counterFirstClass = firstClass.value==="" ? 0 : parseInt(firstClass.value);
    let counterEconomyClass = economyClass.value==="" ? 0 : parseInt(economyClass.value);
    let counterGrandTotal = grandTotal.innerText==="" ? 0 : parseInt(grandTotal.innerText);

    let alertBox = document.querySelector('.alert');
    alertBox.querySelector('#alert-first-class').innerText = counterFirstClass;
    alertBox.querySelector('#alert-economy-class').innerText = counterEconomyClass;
    alertBox.querySelector('#alert-grand-total').innerText = counterGrandTotal;

    alertBox.classList.add('active');
})

/**
 * Handling close button on alert-box
 */
document.querySelector('.alert .close').addEventListener('click', function () {
    document.querySelector('.alert').classList.remove('active');
})