export const getMean = (arr: number[]) => {
    let length = arr.length
    let sum = 0;
    for (let num of arr) {
        sum += num
    }
    return sum / length
}

export const HarmonicMean = (arr: number[]) => {
    let mean = 0;
    for (let num of arr) {
        mean += 1 / num
    }

    return arr.length / mean
}

export const GeometricMean = (arr: number[]) => {
    let mean = 0;
    for (let num of arr) {
        mean += Math.log(num)
    }

    const e = Math.exp(1)

    function antilog(n: number, base = e) {
        if (base === e) return Math.exp(n)

        return Math.pow(base, n)
    }

    return antilog(mean / length)
}

export const getMode = (arr: number[]) => {

    let val: number[] = []

    arr.map((e) => {
        let cnt = 0;
        arr.map((i) => { if (i == e) cnt++ })
        val.push(cnt)
    })

    let allSame = 0
    let values = val[0]
    for (let i of val) {
        if (i == values) allSame++
    }

    return allSame === arr.length ? -1 : arr[val.indexOf(getLargest(val))]
}

export const getMedian = (arr: number[]) => {
    arr = arr.sort(function (a, b) { return a - b });
    let length = arr.length

    if (length % 2 != 0) return arr[Math.floor(length / 2)]


    return (arr[Math.floor(length / 2)] + arr[Math.floor(length / 2) - 1]) / 2
}

export const getLargest = (arr: number[]) => {
    let maxi = arr[0] || 0

    for (let num of arr) {
        maxi = num > maxi ? num : maxi
    }

    return maxi
}

export const getSamllest = (arr: number[]) => {
    let mini = arr[0]

    for (let num of arr) {
        mini = num < mini ? num : mini
    }

    return mini
}