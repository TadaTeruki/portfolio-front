// 参考: https://qiita.com/h53/items/05139982c6fd81212b08
const GetDateAndTime = (raw: string) => {
    const date = new Date(raw)
    const pad = function (str: string): string {
        return ('0' + str).slice(-2)
    }
    const year = date.getFullYear().toString()
    const month = pad((date.getMonth() + 1).toString())
    const day = pad(date.getDate().toString())
    const hour = pad(date.getHours().toString())
    const min = pad(date.getMinutes().toString())
    const sec = pad(date.getSeconds().toString())

    return {
        date: year + '年' + month + '月' + day + '日',
        time: hour + '時' + min + '分' + sec + '秒',
    }
}

export default GetDateAndTime
