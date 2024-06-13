import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import axios from 'axios';
import DynamicInput from '../components/common/DynamicInput';
import useInputValidator from '../hooks/useInputValidator';
import { isLoginAtom } from '../atoms/isLoginAtom';
import GoogleLogo from '../../src/assets/google.svg?react';
import DiscordLogo from '../../src/assets/discord.svg?react';
import AuthLogo from '../../src/assets/authlogo.svg?react';

function SigninPage() {
  const navigate = useNavigate();
  const [email, , handleEmailChange] = useInputValidator('', 'email');
  const [password, isPasswordValid, handlePasswordChange] = useInputValidator('', 'password');

  const setIsLogin = useSetAtom(isLoginAtom);
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/login', {
        email,
        password
      });
      setIsLogin(true);
      // navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  const handleSignupButtonClick = () => {
    navigate('/signup');
  };
  return (
    <div className="bg-auth-img relative flex h-screen items-center justify-center object-cover">
      <div className="absolute left-0 top-0 m-6">
        <AuthLogo />
      </div>
      <div className="flex w-[29rem] flex-col items-center">
        <h1 className="font-semiboldbold mb-10 text-4xl text-white text-opacity-85">로그인</h1>
        <div>
          <form className="flex flex-col gap-4">
            <DynamicInput
              label="이메일"
              value={email}
              type="text"
              placeholder="이메일을 입력해주세요"
              onChange={handleEmailChange}
            />
            <DynamicInput
              label="비밀번호"
              value={password}
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handlePasswordChange}
            />
            {password && !isPasswordValid && (
              <div className="text-yel ml-2 text-xs">
                숫자, 문자, 특수문자를 포함한 8자 이상이어야 합니다.
              </div>
            )}
            <button
              onClick={handleLogin}
              className="text-white' h-14 w-[20.625rem] rounded-lg bg-mainBlue text-white"
            >
              로그인
            </button>
          </form>
          <div className="mt-4 flex flex-row justify-center gap-6">
            <button aria-label="구글 로그인">
              <GoogleLogo w-88 h-88 />
            </button>
            <button aria-label="디스코드 로그인">
              <DiscordLogo />
            </button>
          </div>
          <div className="mt-4 flex items-center justify-center">
            <p className="mr-2 text-white">아직 회원이 아니시라면?</p>
            <button onClick={handleSignupButtonClick} className="text-yel font-semibold">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;
