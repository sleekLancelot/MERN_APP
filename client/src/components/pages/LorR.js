import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

const LorR = ({ word, logger, regger, ...rest }) => {
    const [showReg, setShowReg] = useState(regger);
    const [showLog, setShowLog] = useState(logger);

    const login = useRef('Login')
    const register = useRef('Register')
    const With = useRef('Register With')

    const log = (e) => {
        setShowLog(true);
        setShowReg(false);
        With.current = `${login.current.outerText} with:`;
        // console.log(With);
        e.preventDefault();
    }

    const reg = (e) => {
        setShowReg(true);
        setShowLog(false);
        With.current = `${register.current.outerText} with:`;
        // console.log(With, login, register.current.outerText);

        e.preventDefault();
    }

    // console.log(logger, regger);
    showLog ? logger = true : logger = false;
    showReg ? regger = true : regger = false;

    return (
        <div>
            <div className="formBox">
                <div className="btnBox">
                    <div style={{ left: showLog || logger ? '110px' : '0' }} className="btnColor"></div>
                    <Link to='/register' ref={register} id="register" className="lr-btn" onClick={reg}>Register</Link>
                    <Link to='/login' ref={login} id="login" className="lr-btn" onClick={log}>Login</Link>
                </div>
                <p reg={With} className="with">{word + ' with:' || With.current}</p>
                <div className="socials">
                    <i className="fab fa-facebook-f fa-2x"></i>
                    <i className="fab fa-twitter fa-2x"></i>
                    <i className="fab fa-google fa-2x"></i>
                </div>
                <div className="LorR">
                    <Register prop={{ ...rest }} showReg={showReg} regger={regger} />
                    <Login prop={{ ...rest }} showLog={showLog} logger={logger} />
                </div>
            </div>
        </div>
    )
}

export default LorR;
