const handleSignin = (req, res, db, bcrypt) => {

    // bcrypt.compare('pleroma', '$2b$10$7D0HgBmHi0k.xNsBzSefHuIw74GytH2O2eVUpMh/w4BoBp3/t9E9.', function(err, res) {
    //     console.log(res)
    // });
    // bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    //     // res == false
    // });
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json('provide Username and Password');
    }
 

    db.select('hash', 'email').from('login')
    .where('email', '=', email)
    .then(data => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if(isValid){
            db.select('*').from('users')
            .where('email', '=', email)
            .then(user => {
                res.json(user[0]);
            })
            .catch(err => res.status(400).json('Unable to get user'));
        }else{
            res.status(400).json('Incorrect Username and Password');
        }
    })
    .catch(err => res.status(400).json('Incorrect Username and Password'));
     
}

module.exports = {
    handleSignin
};