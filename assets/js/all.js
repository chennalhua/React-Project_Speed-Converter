/*
筆記
    參數.toFixed(2) 取小數點幾位
*/

const App = () => {

    //建立變數 inputNum
    let [inputNum, setInputNum] = React.useState(0);

    //監聽 換算 SET input value (雙向綁定)
    const handleChange = (e) => {
        let { value } = e.target;
        //更新 inputNum
        setInputNum(value);
    }

    return (
        <div className="col-6 speed-box p-3">
            <header className="bg-blue text-light py-2 text-center">Network Speed Converter</header>
            <main className="container py-4">
                <UnitTran />
                <NumTran handleChange={handleChange} inputNum={inputNum}/>
            </main>
            <footer>
                <StateCard inputNum={inputNum}/>
            </footer>
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
    const {handleChange} = props;
    const {inputNum} = props;

    return (
        <div className="row text-center mt-4 align-items-center">
            <div className="col-5">
                <label htmlFor="set" className="text-secondary fw-bolder mb-3">SET</label>
                <input type="number" id="set" className="form-control" min="0" max="100"
                onChange={handleChange} value={inputNum}/>
            </div>
            <div className="col-2">
                <i className="bi bi-arrow-right-short"></i>
            </div>
            <div className="col-5">
                <p className="text-secondary fw-bolder">SHOW</p>
                <p className="text-blue fw-bolder">{(inputNum / 8).toFixed(2)}</p> {/* Mbps換算MB/s要除8 */}
            </div>
        </div>
    )
}

//狀態卡
const StateCard = (props) => {
    //父層 App 傳進來的資料
    const {inputNum} = props;
    
    //狀態卡功能
    let state ;
    if(inputNum <= 0){
        state = {
            title:'---',
            backgroundColor:'#676767'
        }
    }else if(inputNum>0 && inputNum<=15){
        state = {
            title:'SLOW',
            backgroundColor:'#dc3545'
        }
    }else if(inputNum>15 && inputNum<=40){
        state = {
            title:'GOOD',
            backgroundColor:'#ffc107'
        }
    }else if(inputNum>40){
        state = {
            title:'FAST',
            backgroundColor:'#05b22a'
        }
    }

    return (
        <p className="showState text-center py-2 bg-blue text-light mb-0" 
        style={{backgroundColor:state.backgroundColor}}>{state.title}</p>
    )
}

ReactDOM.render(
    <App />, document.querySelector('#root')
)