import { moment_ungroup } from "@/types/statistics";
import { sumArray } from "./grouped";

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

export const calculateMomentUngroup = (data: number[], arr: number[], difference: number): moment_ungroup => {

    const result_moment: moment_ungroup = {
        x_a: [],
        x_a_2: [],
        x_a_3: [],
        x_a_4: [],
        mean_result: getMean(arr),
        median_result: getMedian(arr),
        mode_result: getMode(arr),
        standard_deviation: 0,
        first_moment: 0,
        second_moment: 0,
        third_moment: 0,
        fourt_moment: 0,
        skewness_using_median: 0,
        skewness_using_mode: 0,
        kurtosis_alpha: 0,
        kurtosis_beta: 0,
        kurtosis_result: "mesokurtic"
    }

    if (difference === -1) {
        difference = result_moment.mean_result
    }

    let temp = 0

    for (let row = 0; row < data.length; row++) {
        let x_a: number = Number.parseFloat((data[row] - difference).toFixed(4))

        temp = temp + Number.parseFloat(Math.pow(x_a, 2).toFixed(4))

        result_moment.x_a.push(x_a)
        result_moment.x_a_2.push(Number.parseFloat(Math.pow(x_a, 2).toFixed(4)))
        result_moment.x_a_3.push(Number.parseFloat(Math.pow(x_a, 3).toFixed(4)))
        result_moment.x_a_4.push(Number.parseFloat(Math.pow(x_a, 4).toFixed(4)))
    }

    const frequency_sum = data.length

    result_moment.standard_deviation = temp / frequency_sum

    result_moment.first_moment = sumArray(result_moment.x_a) / frequency_sum
    result_moment.second_moment = sumArray(result_moment.x_a_2) / frequency_sum
    result_moment.third_moment = sumArray(result_moment.x_a_3) / frequency_sum
    result_moment.fourt_moment = sumArray(result_moment.x_a_4) / frequency_sum

    result_moment.skewness_using_mode = (result_moment.mean_result - result_moment.mode_result) / result_moment.standard_deviation

    result_moment.skewness_using_median = 3 * (result_moment.mean_result - result_moment.median_result) / result_moment.standard_deviation

    result_moment.kurtosis_beta = result_moment.fourt_moment / Math.pow(result_moment.second_moment, 2)

    result_moment.kurtosis_alpha = result_moment.kurtosis_beta - 3

    result_moment.kurtosis_result = result_moment.kurtosis_alpha === 0 ? "mesokurtic" : result_moment.kurtosis_alpha < 0 ? "platykurtic" : "laptokurtic"

    return result_moment
}