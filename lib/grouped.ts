import { mean_result } from "@/types/statistics";

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