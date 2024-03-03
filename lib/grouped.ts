import { mean_result, median_result, mode_result, moment_group } from "@/types/statistics";

export const sumArray = (arr: number[]): number => {
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export const calculateMean = (dataRow: number, data: number, range: number, frequency: number[]): mean_result => {
    const result_mean: mean_result = {
        class: [],
        frequency: [],
        x: [],
        x_f: [],
        x_x_f: [],
        x_mean_x: [],
        f_x_mean_x: [],
        mean: 0,
        mean_deviation: 0,
        standard_deviation: 0,
        coeff_mean_deviation: 0,
        coeff_standard_deviation: 0,
    }

    for (let row = 0; row < dataRow; row++) {
        result_mean.class.push([data, data + range])
        result_mean.frequency.push(frequency[row])
        result_mean.x.push((data + data + range) / 2)
        result_mean.x_f.push(((data + data + range) / 2) * frequency[row])
        result_mean.x_x_f.push(Math.pow((data + data + range) / 2, 2) * frequency[row])
        data = data + range
    }

    result_mean.mean = sumArray(result_mean.x_f) / sumArray(frequency)
    result_mean.standard_deviation = Math.sqrt((sumArray(result_mean.x_x_f) / sumArray(frequency)) - Math.pow(result_mean.mean, 2))

    for (let row = 0; row < dataRow; row++) {
        result_mean.x_mean_x.push(Math.abs(result_mean.x[row] - result_mean.mean))
        result_mean.f_x_mean_x.push(frequency[row] * Math.abs(result_mean.x[row] - result_mean.mean))
    }

    result_mean.mean_deviation = sumArray(result_mean.f_x_mean_x) / sumArray(frequency)

    result_mean.coeff_mean_deviation = result_mean.mean_deviation / result_mean.mean
    result_mean.coeff_standard_deviation = result_mean.standard_deviation / result_mean.mean

    return result_mean
}

export const calculateMedian = (dataRow: number, data: number, range: number, frequency: number[]): median_result => {

    let n = sumArray(frequency) / 2;
    let pre_c_frequency = frequency[0];
    let l1 = data
    let freq = frequency[0]

    const result_median: median_result = {
        class: [],
        frequency: [],
        x: [],
        marker: [],
        c_frequency: [],
        median: 0,
    }

    let frequency_sum = 0;

    for (let row = 0; row < dataRow; row++) {

        frequency_sum = frequency_sum + frequency[row]

        result_median.class.push([data, data + range])
        result_median.frequency.push(frequency[row])
        result_median.x.push((data + data + range) / 2)
        result_median.c_frequency.push(frequency_sum)

        if (n < frequency_sum) {
            pre_c_frequency = frequency_sum - frequency[row]
            freq = frequency[row]
            l1 = data
            result_median.marker.push("Q2")
            n = 1000000000000
        } else {
            result_median.marker.push("")
        }

        data = data + range
    }

    result_median.median = l1 + ((range / freq) * ((sumArray(frequency) / 2) - pre_c_frequency))

    return result_median
}

export const calculateMode = (dataRow: number, data: number, range: number, frequency: number[]): mode_result => {

    let max_freq = Math.max(...frequency)
    let prev_frequency = frequency[0];
    let next_frequency = frequency[0];
    let l1 = data
    let freq = frequency[0]

    const result_mode: mode_result = {
        class: [],
        frequency: [],
        x: [],
        marker: [],
        mode: 0,
    }

    for (let row = 0; row < dataRow; row++) {

        result_mode.class.push([data, data + range])
        result_mode.frequency.push(frequency[row])
        result_mode.x.push((data + data + range) / 2)

        if (frequency[row] === max_freq) {
            prev_frequency = frequency[row - 1]
            freq = frequency[row]
            next_frequency = frequency[row + 1]
            l1 = data
            result_mode.marker.pop()
            result_mode.marker.push("f0")
            result_mode.marker.push("f1")
            result_mode.marker.push("f2")
        } else {
            result_mode.marker.push("")
        }

        data = data + range
    }

    result_mode.mode = l1 + ((freq - prev_frequency) / (2 * freq - prev_frequency - next_frequency)) * range

    return result_mode
}

export const calculateMoment = (dataRow: number, data: number, range: number, frequency: number[], a: number): moment_group => {

    const result_moment: moment_group = {
        mean_result: calculateMean(dataRow, data, range, frequency),
        median_result: calculateMedian(dataRow, data, range, frequency),
        mode_result: calculateMode(dataRow, data, range, frequency),
        f_x_a: [],
        f_x_a_2: [],
        f_x_a_3: [],
        f_x_a_4: [],
        first_moment: 0,
        second_moment: 0,
        third_moment: 0,
        fourt_moment: 0,
        skewness_using_mode: 0,
        skewness_using_median: 0,
        kurtosis_alpha: 0,
        kurtosis_beta: 0,
        kurtosis_result: "mesokurtic",
    }

    if (a === -1) {
        a = result_moment.mean_result.mean
    }

    for (let row = 0; row < dataRow; row++) {

        let x_a = result_moment.mean_result.x[row] - a

        result_moment.f_x_a.push(frequency[row] * x_a)
        result_moment.f_x_a_2.push(frequency[row] * Math.pow(x_a, 2))
        result_moment.f_x_a_3.push(frequency[row] * Math.pow(x_a, 3))
        result_moment.f_x_a_4.push(frequency[row] * Math.pow(x_a, 4))
    }

    const frequency_sum = sumArray(frequency)

    result_moment.first_moment = sumArray(result_moment.f_x_a) / frequency_sum
    result_moment.second_moment = sumArray(result_moment.f_x_a_2) / frequency_sum
    result_moment.third_moment = sumArray(result_moment.f_x_a_3) / frequency_sum
    result_moment.fourt_moment = sumArray(result_moment.f_x_a_4) / frequency_sum

    result_moment.skewness_using_mode = (result_moment.mean_result.mean - result_moment.mode_result.mode) / result_moment.mean_result.standard_deviation

    result_moment.skewness_using_median = 3 * (result_moment.mean_result.mean - result_moment.median_result.median) / result_moment.mean_result.standard_deviation

    result_moment.kurtosis_beta = result_moment.fourt_moment / Math.pow(result_moment.second_moment, 2)

    result_moment.kurtosis_alpha = result_moment.kurtosis_beta - 3

    result_moment.kurtosis_result = result_moment.kurtosis_alpha === 0 ? "mesokurtic" : result_moment.kurtosis_alpha < 0 ? "platykurtic" : "laptokurtic"

    return result_moment
}


export const getMeanGroup = (arr: number[][]) => {
    let x_sum = 0;
    let f_sum = 0;
    let xf_sum = 0;

    for (let num of arr) {
        x_sum += num[0] || 0
        f_sum += num[1] || 0
        xf_sum += num[0] * num[1] || 0
    }

    let mean = xf_sum / f_sum

    return {
        mean,
        x_sum,
        f_sum,
        xf_sum
    }
}

export const getMeanGroupRange = (arr: number[][]) => {
    let x_sum = 0;
    let f_sum = 0;
    let cf_sum = 0;
    let xf_sum = 0;
    let fx2_sum = 0;

    // for Mean
    for (let num of arr) {
        x_sum += (num[0] + num[1]) / 2
        f_sum += num[2]
        xf_sum += ((num[0] + num[1]) / 2) * num[2]
        fx2_sum += ((num[0] + num[1]) / 2) * ((num[0] + num[1]) / 2) * num[2]
    }

    let n_2 = f_sum / 2


    let mean = xf_sum / f_sum
    let sd = Math.sqrt((fx2_sum / f_sum) - Math.pow(mean, 2))

    return [
        mean,
        fx2_sum,
        x_sum,
        f_sum,
        xf_sum,
        sd
    ]
}

export const getMissingFrequencyUsingMedianRange = (arr: number[][], median: number, h: number) => {

    let ans = 0;
    let c_freq = 0;
    let total = 0
    let x_in_pcf = false

    for (let i of arr) {
        if (i[2] !== -1) {
            total += i[2]
        } else {
            x_in_pcf = true
        }
    }

    for (let num of arr) {
        if (median >= num[0] && median <= num[1]) {
            if (num[2] === -1 && x_in_pcf) {
                ans = (total - 2 * c_freq) / (2 * ((median - num[0]) / h) + 1)
            }
            else if (num[2] === -1) {
                ans = ((total / 2) - c_freq) / (((median - num[0]) / h - (1 / 2)))
            }
            else if (x_in_pcf) {
                ans = total - (2 * c_freq) - (2 * ((median - num[0]) / h) * num[2])
            } else {
                ans = 2 * (((median - num[0]) * num[2]) / h + c_freq) - total
            }
            break;
        }
        if (num[2] !== -1) {
            c_freq += num[2]
        }
    }

    return ans
}