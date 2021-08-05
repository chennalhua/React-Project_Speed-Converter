/*
筆記
    參數.toFixed(2) 取小數點幾位

    Math.floor(Math.random()*100)
     - Math.floor() 去浮點
     - Math.random() 產生隨機數 0 ~ 1
        Math.random()*30 會產生 1 ~ 30 之數值
        Math.random()*50 會產生 1 ~ 50 之數值
        以此類推
*/

const App = () => {

    //建立變數 inputNum //Math.floor 去除浮點、random 隨機產生數字
    let [inputNum, setInputNum] = React.useState(Math.floor(Math.random() * 100));
    let [alertText, setAlertText] = React.useState('請輸入數值')

    //監聽 換算 SET input value (雙向綁定)
    const handleChange = (e) => {
        let { value } = e.target;
        //更新 inputNum
        setInputNum(value);

        if (value < 0) {
            setInputNum(0);
            setAlertText('最小為 0 ,請重新輸入')
        } else if (value > 100) {
            setInputNum(100);
            setAlertText('最大為 100 ,請重新輸入')
        }

    }

    //主題切換 true 亮 、false 暗
    let [changeTheme, setChangeTheme] = React.useState(true)

    const handleThemeChange = () => {
        if (!changeTheme) {
            setChangeTheme(true)
        } else {
            setChangeTheme(false)
        }
    }

    const handleStyleTheme = () => {
        if (!changeTheme) {
            return {
                background: '#fff',
                color: '#0082be'
            }
        } else {
            return {
                background: '#212529',
                color: '#f8f9fa'
            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row justify-content-center align-items-center px-2">
                <div className="col-sm-10 col-md-6 col-lg-5 speed-box p-3 mt-4" style={handleStyleTheme()}>
                    <div className="form-check form-switch mb-3">
                        <label className="form-check-label d-line-block position-relative" htmlFor="styeTheme">
                            <i className="bi bi-brightness-high-fill position-absolute sunIcon" style={{ visibility: !changeTheme && 'hidden' }}></i>
                            <i className="bi bi-moon-fill position-absolute moonIcon" style={{ visibility: changeTheme && 'hidden' }}></i>
                            <input className="form-check-input me-2" type="checkbox" id="styeTheme" onChange={handleThemeChange} checked={changeTheme ? '' : 'checked'} />
                            {changeTheme ? '亮色模式' : '暗色模式'}
                        </label>
                    </div>
                    <header className="bg-blue text-light py-2 text-center">Network Speed Converter</header>
                    <main className="container py-4">
                        <UnitTran />
                        <NumTran handleChange={handleChange} inputNum={inputNum}
                            handleStyleTheme={handleStyleTheme} alertText={alertText} />
                    </main>
                    <footer>
                        <StateCard inputNum={inputNum} />
                    </footer>
                </div>
            </div>
        </div>
    )
}

//大駝峰命名
//單位轉換
const UnitTran = () => {
    return (
        <div className="row text-center">
            <div className="col-5">Mbps</div>
            <div className="col-2">
                <div className="tranIcon"><i className="bi bi-arrow-left-right"></i></div>
            </div>
            <div className="col-5">MB/s</div>
        </div>
    )
}

//換算
const NumTran = (props) => {
    //父層 App 傳進來的資料
    const { handleChange } = props;
    const { inputNum } = props;
    const { handleStyleTheme } = props;
    const { alertText } = props;

    return (
        <div className="row text-center mt-4 align-items-baseline">
            <div className="col-5">
                <label htmlFor="set" className="text-secondary fw-bolder mb-3">SET</label>
                <input type="number" id="set" className="form-control" min="0" max="100"
                    onChange={handleChange} value={inputNum} />
                <p className="mb-0 mt-1 text-danger alert-text">{alertText}</p>
            </div>
            <div className="col-2 my-auto">
                <i className="bi bi-arrow-right-short"></i>
            </div>
            <div className="col-5">
                <p className="text-secondary fw-bolder">SHOW</p>
                <p className="text-blue fw-bolder" style={handleStyleTheme()}>{(inputNum / 8).toFixed(2)}</p> {/* Mbps換算MB/s要除8 */}
            </div>
        </div>
    )
}

//狀態卡
const StateCard = (props) => {
    //父層 App 傳進來的資料
    const { inputNum } = props;

    //狀態卡功能
    let state;
    if (inputNum <= 0) {
        state = {
            title: '---',
            backgroundColor: '#676767'
        }
    } else if (inputNum > 0 && inputNum <= 15) {
        state = {
            title: 'SLOW',
            backgroundColor: '#dc3545'
        }
    } else if (inputNum > 15 && inputNum <= 40) {
        state = {
            title: 'GOOD',
            backgroundColor: '#ffc107'
        }
    } else if (inputNum > 40 && inputNum <= 60) {
        state = {
            title: 'FAST',
            backgroundColor: '#05b22a'
        }
    } else if (inputNum > 60) {
        state = {
            title: 'SUPER FAST',
            backgroundColor: '#b10ae9'
        }
    }

    return (
        <p className="showState text-center py-2 bg-blue text-light mb-0"
            style={{ backgroundColor: state.backgroundColor }}>{state.title}</p>
    )
}

ReactDOM.render(
    <App />, document.querySelector('#root')
)