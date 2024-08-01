'use client';

import {useCallback, useState} from 'react';
import FetchComponent from '@/utils/fetch';
import styles from './login.module.css';

const LoginForm = () => {
    const [memberEmail, setEmail] = useState('');
    const [memberPassword, setPassword] = useState('');
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSuccess = useCallback((data) => {
        console.log('로그인 성공:', data);
        setLoginSuccess(true);
    }, []);

    const handleError = useCallback((error) => {
        console.error('로그인 실패:', error);
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
    }, []);

    const {loading, fetchData} = FetchComponent({
        url: 'https://api.aiapp.link/member/p_login',
        method: 'POST',
        body: {memberEmail, memberPassword},
        onSuccess: handleSuccess,
        onError: handleError,
    });

    return (
        <div className={styles.loginForm}>
            <div className={styles.logo}>
                <img src="/group.svg" alt="Church logo"/>
            </div>
            <div className={styles.emailInputGroup}>
                <label>냐미</label>
                {/*<label style={{color: 'blue'}}>바보바보</label>*/}
                <input
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    value={memberEmail}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className={styles.passwordInputGroup}>
                <label>비밀번호</label>
                <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    value={memberPassword}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.loginButton} onClick={fetchData} disabled={loading}>
                {loading ? '로그인중...' : '로그인'}
            </div>
            <div className={styles.links}>
                <a onClick={() => console.log('회원가입 클릭됨')}>회원가입</a>
                <a onClick={() => console.log('이메일 찾기 클릭됨')}>이메일 찾기</a>
                <a onClick={() => console.log('비밀번호 찾기 클릭됨')}>비밀번호 찾기</a>
            </div>
            <div className={styles.socialLogin}>
                <div className={styles.title}>간편로그인</div>
                <div className={styles.socialLoginIcons}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icon-google.svg"
                           // width={40}
                           // height={40}
                           // className={styles.socialLoginIcons}
                           alt="Google"/>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icon-naver.svg"
                           // width={40}
                           // height={40}
                           // className={styles.socialLoginIcons}
                           alt="Naver"/>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icon-kakao.svg"
                           // width={40}
                           // height={40}
                           // className={styles.socialLoginIcons}
                           alt="Kakao"/>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/icon-apple.svg"
                           // width={40}
                           // height={40}
                           // className={styles.socialLoginIcons}
                           alt="Apple"/>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;