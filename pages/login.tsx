import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import styles from '../styles/Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (email: any) => {
        if (!loading) {
            setLoading(true);
            try {
                const { error } = await supabase.auth.signIn({ email });
                if (error) throw error;
                setSuccess('Check your email for the login link!');
            } catch (error: any) {
                error.message ? setError(error.message) : setError(error.error_description)
            }
            setLoading(false);
        }
    };

    return (
        <main>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <p>Sign in via magic link with your email </p>
                    <p className={success ? styles.success : styles.error}>{success || error}</p>
                    <input
                        className={styles.inputText}
                        type='email'
                        placeholder='Your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        className={`${styles.button} ${loading ? styles.loadingBtn : ''}`}
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogin(email);
                        }}
                    >
                        <span>{loading ? 'Loading' : 'Send link'}</span>
                    </button>
                </div>
            </div>
        </main>
    );
}


export default Login;
