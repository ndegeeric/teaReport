export const currencyFormatter = (amount) => {
    let ksh = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'KES'
    })
    return  ksh.format(amount).replace('KES', '')
}