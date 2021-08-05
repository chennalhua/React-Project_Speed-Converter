const App = () => {
    return (
        <div>
            <header>Network Speed Converter</header>
            <main>
                <UnitTran />
                <NumTran />
            </main>
            <footer>
                <StateCard />
            </footer>
        </div>
    )
}

//大駝峰命名
//單位轉換
const UnitTran = () => {
    return (
        <p>單位轉換</p>
    )
}

//換算
const NumTran = () => {
    return (
        <p>換算</p>
    )
}

//狀態卡
const StateCard = (props) => {
    // console.log(state)
    return (
        <p>狀態卡</p>
    )
}

ReactDOM.render(
    <App />, document.querySelector('#root')
)