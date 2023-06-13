export const deleteValidation = (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).send({ message: 'Id is required'})
    }
    //  else {
        // alert('Sure you want to delete this Entry?');
    // }

    next()
}