let currentPage = window.location.pathname


currentPage = currentPage.split('/')[1].split('.html')[0]





if (currentPage === 'index') {

    console.log('main page');

    const pickupDropoffFilter = document.querySelector('section.pickup-dropoff-filter')

    const inputs = pickupDropoffFilter.querySelectorAll('.filters-wrapper .filter input')

    inputs.forEach((input) => {
        if (input.type === 'date') {
            input.value = new Date().toISOString().split('T')[0]
        } else {
            input.value = new Date().toTimeString().slice(0, 5);
        }
    })

} else if (currentPage === 'filter') {
    console.log('filters page');
    const carsArr = document.querySelectorAll(".wrapper article.card")
    const counterElement = document.querySelector(".counter-wrapper .counter-value")

    counterElement.textContent = carsArr.length

}
