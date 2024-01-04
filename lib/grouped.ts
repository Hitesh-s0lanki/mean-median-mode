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