export async function login(req, res) {
    res.send('Login endpoint');
}

export async function signup(req, res) {
    try {
        const { email, fullname, password } = req.body;
         
    } catch (error) {
        console.error('Error during signup:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}