const setIntervalPromisified = (interval) => {
    const callback = (res, rej) => {
        setInterval(()=> {
            res(`Fullfilled in ${interval} ms`)
        }, interval)
    }
    return new Promise(callback)
}

const initTimer = async (interval) => {
    const response = await setIntervalPromisified(interval)
    console.log(response)
}
initTimer(1000)
// welcome